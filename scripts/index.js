function _add(x, y) {
    return x + y;
}

function _subtract(x, y) {
    return x - y;
}

function _multiply(x, y) {
    return x * y;
}

function _divide(x, y) {
    if(y === 0) {
        throw new RangeError("Cannot divide by zero");
    }

    return x / y;
}

function _operate(operator, operand1, operand2) {
    switch (operator) {
        case '+':
            return _add(operand1, operand2);
        case '-':
            return _subtract(operand1, operand2);
        case '*':
            return _multiply(operand1, operand2);
        case '/':
            return _divide(operand1, operand2);
        default:
            console.log(`Unknown Operator: ${operator}`);
    }
}

function resetCalculator() {
    operand1 = '';
    operand2 = '';
    operator = '';
    inExpression = false;
    resultFound  = false;

    let calculator = document.querySelector('.calculator');

    calculator.querySelector('.expression').textContent = '';
    calculator.querySelector('.result').textContent = '';
}

function displayError(str='ERROR') {
    resetCalculator();
    let calculator = document.querySelector('.calculator');
    let result = calculator.querySelector('.result')
    result.textContent = str;
}

let operand1 = '';
let operand2 = '';
let operator = '';
let inExpression = false;
let resultFound  = true;

// Add listeners to control panel
let calc = document.querySelector('.calculator');

// Add number button handlers
calc.querySelectorAll('.num').forEach(function(numBtn) {
    numBtn.addEventListener('click', function(e) {
        if (resultFound) {
            resetCalculator();
        }

        let expression = calc.querySelector('.expression');
        let num = e.target.getAttribute('data-key');
        let currentExpression = expression.textContent;

        if (inExpression) {
            operand2 += num;
        } else {
            operand1 += num;
        }

        currentExpression += num;
        expression.textContent = currentExpression;
    });
});

// Add operator button handlers
calc.querySelectorAll('.operator').forEach(function(opBtn) {
    opBtn.addEventListener('click', function(e) {
        let expression = calc.querySelector('.expression');
        
        if (resultFound) {
            let result = calc.querySelector('.result').textContent;
            resetCalculator();
            operand1 = result;
            expression.textContent = operand1;
        }

        let currentExpression = expression.textContent;
        operator = e.target.getAttribute('data-key');

        if (inExpression || !operand1) {
            displayError();
        } else {
            inExpression = true;
            currentExpression += ` ${operator} `;
            expression.textContent = currentExpression;
        }
    });
});

// Add clear button handler
calc.querySelector('.clear').addEventListener('click', resetCalculator);

// Add equal button handler
calc.querySelector('.equal').addEventListener('click', function(e) {
    if (!operand1 || !operator || !operand2) {
        displayError();
    } else {
        try {
            let answer = _operate(operator, parseInt(operand1), parseInt(operand2));
            resultFound = true;
            calc.querySelector('.result').textContent = answer;
        } catch (e) {
            if (e.name === "RangeError") {
                displayError('ERROR: Cannot Divide By Zero');
            }
        }
    }
});
