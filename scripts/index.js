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

function isNum(str) {
    return !isNaN(str);
}

function isOperator(str) {
    return '+*-/'.includes(str);
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

function handleNum(newNum) {
    if (resultFound) {
        resetCalculator();
    }

    let calculator = document.querySelector('.calculator');
    let expression = calculator.querySelector('.expression');
    let currentExpression = expression.textContent;

    if (inExpression) {
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
    operator = newOperator;

    if (inExpression || !operand1) {
        displayError();
    } else {
        inExpression = true;
        currentExpression += ` ${newOperator} `;
        expression.textContent = currentExpression;
    }
}

function handleEqual() {
    let calculator = document.querySelector('.calculator');

    if (!operand1 || !operator || !operand2) {
        displayError();
    } else {
        try {
            let answer = _operate(operator, parseInt(operand1), parseInt(operand2));
            resultFound = true;
            calculator.querySelector('.result').textContent = answer;
        } catch (e) {
            if (e.name === "RangeError") {
                displayError('ERROR: Cannot Divide By Zero');
            }
        }
    }
}

let operand1 = '';
let operand2 = '';
let operator = '';
let inExpression = false;
let resultFound  = true;

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

// Keyboard support
document.addEventListener('keypress', function(e) {
    e.preventDefault();

    if(isNum(e.key)) {
        handleNum(e.key);
    } else if (isOperator(e.key)) {
        handleOperator(e.key);
    } else if (e.key === '=' || e.key === 'Enter') {
        handleEqual();
    }
});
