document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));
    let currentInput = '';
    let previousInput = '';
    let operator = null;

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.dataset.value;

            if (!isNaN(value) || value === '.') {
                handleNumber(value);
            } else if (value === 'C') {
                clear();
            } else if (value === '=') {
                calculate();
            } else {
                handleOperator(value);
            }
        });
    });

    function handleNumber(value) {
        if (currentInput.includes('.') && value === '.') return;
        currentInput += value;
        display.innerText = currentInput;
    }

    function handleOperator(op) {
        if (currentInput === '') return;
        if (previousInput !== '') calculate();
        operator = op;
        previousInput = currentInput;
        currentInput = '';
    }

    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }

        currentInput = result;
        operator = null;
        previousInput = '';
        display.innerText = result;
    }

    function clear() {
        currentInput = '';
        previousInput = '';
        operator = null;
        display.innerText = '0';
    }
});