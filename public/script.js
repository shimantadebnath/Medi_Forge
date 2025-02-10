const API_BASE_URL = "http://localhost:5500"; // Define API base URL

// Login function
async function login(event) {
  event.preventDefault();

  const email = document.querySelector('input[name="email"]').value.trim();
  const password = document
    .querySelector('input[name="password"]')
    .value.trim();

  // Basic validation
  if (!email || !password) {
    alert("Please fill in all fields");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Login failed");
    }
    if (result.user) {
      localStorage.setItem("user", JSON.stringify(result.user));
    }

    alert(result.message);
    window.location.href = result.redirect; // Redirect on successful login
  } catch (error) {
    console.error("Error:", error.message);
    alert(error.message || "An error occurred. Please try again.");
  }
}

// Signup function
async function signup(event) {
  event.preventDefault();

  const name = document.querySelector('input[name="name"]').value.trim();
  const email = document.querySelector('input[name="email"]').value.trim();
  const password = document
    .querySelector('input[name="password"]')
    .value.trim();
  const dob = document.querySelector('input[name="dob"]').value;

  // Basic validation
  if (!name || !email || !password || !dob) {
    alert("Please fill in all fields");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, dob }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Signup failed");
    }
    if (result.user) {
      localStorage.setItem("user", JSON.stringify(result.user));
    }

    alert(result.message);
    window.location.href = "login.html"; // Redirect to login page after signup
  } catch (error) {
    console.error("Error:", error.message);
    alert(error.message || "An error occurred. Please try again.");
  }
}

const logout = () => {
  localStorage.removeItem("user");
  window.location.href = "/"; // Redirect to login page after logout
};
