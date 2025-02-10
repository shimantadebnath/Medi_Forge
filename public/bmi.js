function calculateBMI() {
    var heightInput = document.getElementById("height");
    var weightInput = document.getElementById("weight");
    var resultDiv = document.getElementById("result");
  
    var height = parseFloat(heightInput.value);
    var weight = parseFloat(weightInput.value);
  
    if (isNaN(height) || isNaN(weight)) {
      resultDiv.innerHTML = "Please enter valid height and weight.";
      return;
    }
  
    var bmi = weight / ((height / 100) ** 2);
    var category = "";
  
    if (bmi < 18.5) {
      category = "Underweight";
    } else if (bmi < 25) {
      category = "Normal weight";
    } else if (bmi < 30) {
      category = "Overweight";
    } else {
      category = "Obese";
    }
  
    resultDiv.innerHTML = "Your BMI is " + bmi.toFixed(2) + " (" + category + ")";
  }
  //@codewithcurious.com
  
  function calculateBMI() {
    var heightInput = document.getElementById("height");
    var weightInput = document.getElementById("weight");
    var resultDiv = document.getElementById("result");
    var categoryDiv = document.getElementById("bmiCategory");

    var height = parseFloat(heightInput.value);
    var weight = parseFloat(weightInput.value);

    if (isNaN(height) || isNaN(weight)) {
      resultDiv.innerHTML = "Please enter valid height and weight.";
      categoryDiv.innerHTML = "Your BMI category will appear here.";
      return;
    }

    var bmi = weight / ((height / 100) ** 2);
  


    if (bmi < 18.5) {
      category = `<strong style="color: red;">Underweight</strong>
      <p style="margin-top: 10px;"></p>
      <ul>
        <li><strong style="color: yellow;">Increase Caloric Intake:</strong> Eat more nutrient-dense foods like nuts, avocados, dairy, and lean proteins.</li>
        <li><strong style="color: yellow;">Eat More Frequently:</strong> Have 5-6 small meals throughout the day instead of 2-3 large ones.</li>
      </ul>`;
    } else if (bmi < 25) {
      category = `<strong style="color: #3ED715;">Normal weight</strong>
      <p style="margin-top: 10px;"></p>
      <ul>
        <li><strong style="color: yellow;">Maintain a Balanced Diet:</strong> Ensure you get enough vitamins and minerals through a balanced diet of fruits, vegetables, whole grains, and proteins.</li>
        <li><strong style="color: yellow;">Stay Active:</strong> Regular physical activity, such as walking or jogging, helps to maintain a healthy weight and boost metabolism.</li>
      </ul>`;
    } else if (bmi < 30) {
      category = `<strong style="color: orange;">Overweight</strong>
      <p style="margin-top: 10px;"></p>
      <ul>
        <li><strong style="color: yellow;">Focus on Portion Control:</strong> Reducing portion sizes and being mindful of caloric intake can help with weight management.</li>
        <li><strong style="color: yellow;">Increase Physical Activity:</strong> Incorporate aerobic exercises and strength training into your routine to burn more calories.</li>
      </ul>`;
    } else {
      category = `<strong style="color: red;">Obese</strong>
      <p style="margin-top: 10px;"></p>
      <ul>
        <li><strong style="color: yellow;">Consult a Healthcare Professional:</strong> It’s important to discuss weight loss strategies with a doctor or nutritionist.</li>
        <li><strong style="color: yellow;">Increase Physical Activity:</strong> Focus on regular exercise, such as walking, swimming, or cycling, combined with strength training.</li>
      </ul>`;
    }
    
  
    

    resultDiv.innerHTML = "Your BMI is " + bmi.toFixed(2);
    categoryDiv.innerHTML = "You are classified as: <strong>" + category + "</strong>";
  }