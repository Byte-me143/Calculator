// Function to append value
function appendValue(val) {
    document.getElementById('result').value += val;
}

function clearResult() {
    document.getElementById('result').value = '';
}

// Function to calculate square root
function squareRoot() {
    let display = document.getElementById('result');
    let currentValue = display.value;

    try {
        let number = parseFloat(currentValue);

        if (isNaN(number)) {
            display.value = 'Error';
            return;
        }

        if (number < 0) {
            display.value = 'Error (i)'; 
            return;
        }
    
        let result = Math.sqrt(number);

        display.value = result;

    } catch (e) {
        display.value = 'Error';
    }
}


function calculate() {
    try {
        let res = eval(document.getElementById('result').value);
        document.getElementById('result').value = res;
    }
    catch {
        document.getElementById('result').value = 'Error';
    }
}
