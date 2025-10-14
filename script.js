function appendValue(val) {
    document.getElementById('result').value += val;
}

function clearResult() {
    document.getElementById('result').value = '';
}

function calculate() {
    try {
        let res = eval(document.getElementById('result').value);
        document.getElementById('result').value = res;
    } catch {
        document.getElementById('result').value = 'Error';
    }
}
