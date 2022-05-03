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

function operate(operator, operand1, operand2) {
    try {
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
    } catch (e) {
        if (e.name === "RangeError") {
            console.log(e.message);
        }
    }
}
