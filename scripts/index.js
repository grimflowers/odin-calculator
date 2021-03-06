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

    return (x / y).toPrecision(4);
}

function _pow(x, y) {
    return Math.pow(x, y).toPrecision(4);
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
        case '^':
            return _pow(operand1, operand2);
        default:
            console.log(`Unknown Operator: ${operator}`);
    }
}

function isNum(str) {
    return !isNaN(str);
}

function isFloat(str) {
    return (isNum(str) && str.indexOf('.') !== -1);
}

function isOperator(str) {
    return '+*-/^'.includes(str);
}

function getNum(str) {
    if (isFloat(str)) {
        return parseFloat(str);
    } else {
        return parseInt(str);
    }
}

function resetCalculator() {
    operand1 = '';
    operand2 = '';
    operator = '';
    resultFound  = false;

    let calculator = document.querySelector('.calculator');

    calculator.querySelector('.expression').textContent = '';
    calculator.querySelector('.result').textContent = '';
}

function displayError() {
    resetCalculator();
    let calculator = document.querySelector('.calculator');
    let result = calculator.querySelector('.result')
    result.textContent = 'ERROR';
}

function handleNum(newNum) {
    if (resultFound) {
        resetCalculator();
    }

    let calculator = document.querySelector('.calculator');
    let expression = calculator.querySelector('.expression');
    let currentExpression = expression.textContent;

    if (operator) {
        operand2 += newNum;
    } else {
        operand1 += newNum;
    }

    currentExpression += newNum;
    expression.textContent = currentExpression;
}

function handleOperator(newOperator) {
    let calculator = document.querySelector('.calculator');
    let expression = calculator.querySelector('.expression');

    if (resultFound) {
        let result = calculator.querySelector('.result').textContent;
        resetCalculator();
        operand1 = result;
        expression.textContent = operand1;
    }

    let currentExpression = expression.textContent;

    if ((operator && !operand2) || !operand1) {
        displayError();
    // Handle user entering multi-operator expression
    } else if (operand2) {
        if (operand1.length > 8 || operand2.length > 8) {
            resetCalculator();
            displayError();
        } else {
            let answer = _operate(operator, getNum(operand1), getNum(operand2));

            if (answer.toString().length > 8) {
                resetCalculator();
                displayError();
            } else {
                let resultDiv = calculator.querySelector('.result');

                resetCalculator();

                expression.textContent = `${answer} ${newOperator} `;
                resultDiv.textContent = answer;
                operand1 = answer;
                operator = newOperator;
            }
        }
    } else {
        currentExpression += ` ${newOperator} `;
        expression.textContent = currentExpression;
        operator = newOperator;
    }
}

function handleEqual() {
    let calculator = document.querySelector('.calculator');

    if (!operand1 || !operator || !operand2) {
        displayError();
    } else {
        try {
            if (operand1.length > 8 || operand2.length > 8) {
                resetCalculator();
                displayError();
            } else {
                let answer = _operate(operator, getNum(operand1), getNum(operand2));

                if (answer.toString().length > 8) {
                    resetCalculator();
                    displayError();
                } else {
                    resultFound = true;
                    calculator.querySelector('.result').textContent = answer;
                }
            }
        } catch (e) {
            if (e.name === "RangeError") {
                displayError();
            }
        }
    }
}

// Allow user to delete accidental input
function handleBackspace() {
    let expression = document.querySelector('.expression');
    let currentExpression = expression.textContent;

    if (!document.querySelector('.result').textContent) {
        if (operand2) {
            operand2 = operand2.slice(0, operand2.length - 1);
            expression.textContent = currentExpression.slice(0, currentExpression.length - 1);
        } else if (operator) {
            operator = '';
            expression.textContent = currentExpression.slice(0, currentExpression.length - 3);
        } else if (operand1) {
            operand1 = operand1.slice(0, operand1.length - 1);
            expression.textContent = currentExpression.slice(0, currentExpression.length - 1);
        }
    }
}

function handlePeriod() {
    let expression = document.querySelector('.expression');

    if (operand2 || operator) {
        if(isFloat(operand2)) {
            resetCalculator();
            displayError();
        } else {
            operand2 += '.';
            expression.textContent = expression.textContent + '.';
        }
    } else if (operand1) {
        if (isFloat(operand1)) {
            resetCalculator();
            displayError();
        } else {
            operand1 += '.';
            expression.textContent = expression.textContent + '.';
        }
    } else {
        resetCalculator();
        displayError();
    }
}

function handlePi() {
    handleNum('3.14159');
}

// Globals =(
let operand1 = '';
let operand2 = '';
let operator = '';
let resultFound  = false;

// Add listeners to calculator
let calculator = document.querySelector('.calculator');

// Add number button handlers
calculator.querySelectorAll('.num').forEach(function(numBtn) {
    numBtn.addEventListener('click', function(e) {
        handleNum(e.target.getAttribute('data-key'));
    });
});

// Add operator button handlers
calculator.querySelectorAll('.operator').forEach(function(opBtn) {
    opBtn.addEventListener('click', function(e) {
        handleOperator(e.target.getAttribute('data-key'));
    });
});

// Add clear button handler
calculator.querySelector('.clear').addEventListener('click', resetCalculator);

// Add equal button handler
calculator.querySelector('.equal').addEventListener('click', handleEqual);

// Add period button handler
calculator.querySelector('.period').addEventListener('click', handlePeriod);

calculator.querySelector('.constant').addEventListener('click', handlePi);

// Keyboard support
document.addEventListener('keydown', function(e) {
    let validKey = false;

    if(isNum(e.key)) {
        handleNum(e.key);
        validKey = true;
    } else if (isOperator(e.key)) {
        handleOperator(e.key);
        validKey = true;
    } else if (e.key === '=' || e.key === 'Enter') {
        handleEqual();
        validKey = true;
    } else if (e.key.toLowerCase() === 'c') {
        validKey = true;
        resetCalculator();
    } else if (e.key === 'Backspace') {
        validKey = true;
        handleBackspace();
    } else if (e.key === '.') {
        validKey = true;
        handlePeriod();
    } else if (e.key === '^') {
        validKey = true;
        handleOperator();
    } else if (e.key === 'p') {
        validKey = true;
        handlePi();
    }

    if (validKey) {
        e.preventDefault();
    }
});
