function toggleBMIUnits() {
    const system = document.getElementById('bmi-unit-system').value;
    const weightInput = document.getElementById('weight-input');
    const weightLabel = document.getElementById('weight-unit-label');
    const heightMetric = document.getElementById('height-metric');
    const heightImperial = document.getElementById('height-imperial');

    if (system === 'metric') {
        weightInput.placeholder = "Enter weight in kg";
        weightLabel.textContent = "kg";
        heightMetric.style.display = 'flex'; 
        heightImperial.style.display = 'none';
    } else { 
        weightInput.placeholder = "Enter weight in lbs";
        weightLabel.textContent = "lbs";
        heightMetric.style.display = 'none';
        heightImperial.style.display = 'block'; 
    }
    document.getElementById('final-result').textContent = "Enter your details and calculate.";
}

function getBMICategory(bmi) {
    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        return "Normal weight";
    } else if (bmi >= 25 && bmi < 29.9) {
        return "Overweight";
    } else {
        return "Obese";
    }
}

function calculateBMI() {
    const resultElement = document.getElementById('final-result');
    const system = document.getElementById('bmi-unit-system').value;
    let weight = parseFloat(document.getElementById('weight-input').value);
    
    let height; 
    let finalWeight = weight; 
    let bmi;

    try {
        if (isNaN(weight) || weight <= 0) {
            throw new Error("Please enter a valid positive weight.");
        }

        if (system === 'metric') {
            const heightCm = parseFloat(document.getElementById('height-cm-input').value);
            if (isNaN(heightCm) || heightCm <= 0) throw new Error("Please enter a valid height in cm.");
            
            height = heightCm / 100; 
        } else { 
            const feet = parseFloat(document.getElementById('height-ft-input').value) || 0;
            const inches = parseFloat(document.getElementById('height-in-input').value) || 0;
            
            if (feet <= 0 && inches <= 0) {
                 throw new Error("Please enter a valid height in feet and inches.");
            }

            const totalInches = (feet * 12) + inches;
            height = totalInches * 0.0254; 
            
            finalWeight = weight * 0.453592;
        }

        if (height <= 0) throw new Error("Height cannot be zero.");
        
        bmi = finalWeight / (height * height);

        const category = getBMICategory(bmi);
        
        resultElement.innerHTML = `BMI: <b>${bmi.toFixed(2)}</b><br>Category: <b>${category}</b>`;
        
    } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    toggleBMIUnits(); 
});
