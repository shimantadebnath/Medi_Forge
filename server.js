const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static("public")); // Serve static files from "public" directory

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
});

const User = mongoose.model("User", userSchema);

// Root Route
app.get("/", (req, res) => {
  res.redirect("/login.html"); // Redirect root to login page
});

// Signup Route
app.post("/signup", async (req, res) => {
  const { name, email, password, dob } = req.body;

  try {
    // Validate input
    if (!name || !email || !password || !dob) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      dob: new Date(dob),
    });

    const user = await newUser.save();

    // Respond with user data and redirect info
    res.status(201).json({
      user: user.toObject(),
      message: "Signup successful",
      redirect: "/index.html", // Redirect to home page after successful signup
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Respond with user data and redirect info
    res.json({
      user: user.toObject(),
      message: "Login successful",
      redirect: "/index.html", // Redirect to home page after successful login
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
