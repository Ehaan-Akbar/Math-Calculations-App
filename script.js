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

function calculateStats(operation) {
    // Get the data from the text area
    let arr = splitFunction();

    // Convert the data into numbers
    let numbers = arr.map(Number);

    // Remove any invalid or empty values
    numbers = numbers.filter(num => !isNaN(num) && isFinite(num));

    let result = 0;

    switch(operation) {

        case 'mean':
            // add all numbers and divide by total count
            let sum = numbers.reduce((total, num) => total + num, 0);
            result = sum / numbers.length;
            break;

        case 'median':
            // sorts nums from smallest to largest
            numbers.sort((a, b) => a - b);

            let middle = Math.floor(numbers.length / 2);

            if (numbers.length % 2 === 0) {
                // average the two middle numbers
                result = (numbers[middle - 1] + numbers[middle]) / 2;
            } else {
                // get middle number
                result = numbers[middle];
            }
            break;

        
case 'mode':
    // Count how many times each number appears
    let counts = {};

    numbers.forEach(num => {
        if (counts[num] === undefined) {
            counts[num] = 1;
        } else {
            counts[num]++;
        }
    });

    // find highest frequency
    let maxCount = Math.max(...Object.values(counts));

    // find all numbers with the highest frequency
    let modes = [];

    for (let num in counts) {
        if (counts[num] === maxCount) {
            modes.push(num);
        }
    }

    // Check if there is a mode
    if (maxCount === 1) {
        result = "No mode";
    } else {
        result = modes.join(", ");
    }

    break;

 case 'summary':
    let min = Math.min(...numbers);
    let max = Math.max(...numbers);

    result = "Minimum: " + min + " | Maximum: " + max;
    break;
    }

    // Display the result
    document.getElementById("statResult").innerText =
        "Stat: " + result;
}
