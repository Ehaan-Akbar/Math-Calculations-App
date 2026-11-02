const display = document.getElementById('display');

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function calculate() {
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = 'Error';
    }
}
function runMathOperation(operation) {
    let inputVal = document.getElementById("mathInput").value;
    let parts = inputVal.split(',').map(Number);
    let res = 0;

    switch(operation) {
        case 'round':
            res = Math.round(parts[0]);
            break;
        case 'pow':
            res = Math.pow(parts[0], parts[1] || 2);
            break;
        case 'sqrt':
            res = Math.sqrt(parts[0]);
            break;
        case 'pi':
            res = (parts[0] || 1) * Math.PI;
            break;
    }
    document.getElementById("mathResult").innerText = "Result: " + res;
}