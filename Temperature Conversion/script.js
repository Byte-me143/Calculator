function convertTemperature() {
    const value = parseFloat(document.getElementById('temp-input').value);
    const fromUnit = document.getElementById('from-unit').value;
    const toUnit = document.getElementById('to-unit').value;
    const outputElement = document.getElementById('output-result');
    
    if (isNaN(value)) {
        outputElement.textContent = "Error: Enter a number";
        return;
    }

    if (fromUnit === toUnit) {
        outputElement.textContent = value.toFixed(2);
        return;
    }

    // --- 3. Standardize to Celsius (The Bridge) ---
    let c_value; 
    
    if (fromUnit === 'F') {
        c_value = (value - 32) * (5/9); // F to C
    } else if (fromUnit === 'K') {
        c_value = value - 273.15; // K to C
    } else if (fromUnit === 'R') {
        c_value = (value - 491.67) * (5/9); // NEW: Rankine to C 
    } else { // It's already Celsius ('C')
        c_value = value;
    }

    // --- 4. Convert to Final Output ---
    let final_result;

    if (toUnit === 'F') {
        final_result = c_value * (9/5) + 32; // C to F
    } else if (toUnit === 'K') {
        final_result = c_value + 273.15; // C to K
    } else if (toUnit === 'R') {
        final_result = c_value * (9/5) + 491.67; // NEW: C to Rankine
    } else { // Convert to Celsius ('C' -> 'C')
        final_result = c_value;
    }

    // 5. Output the result, rounded to 2 decimal places
    outputElement.textContent = final_result.toFixed(2);
}
// Add this new function to your script.js file

function swapUnits() {
    const fromSelect = document.getElementById('from-unit');
    const toSelect = document.getElementById('to-unit');

    // 1. Store the current 'From' value temporarily
    const tempValue = fromSelect.value;

    // 2. Set 'From' to the current 'To' value
    fromSelect.value = toSelect.value;

    // 3. Set 'To' to the stored temporary value (the original 'From')
    toSelect.value = tempValue;

    // Optional: Immediately run the conversion after swapping,
    // so the result updates without the user needing to click 'Convert'.
    convertTemperature(); 
}
