const displayInput = document.querySelector('.display .input')
const operating = document.querySelector('.display .operating')
const numbers = document.querySelectorAll('.buttons .number')
const operators = document.querySelectorAll('.operator')

const equal = document.querySelector('.operator.equal')
const backspace = document.querySelector('.operator.backspace')
const clear = document.querySelector('.operator.clearAll')

let display1 = '';
let display2 = '';
let result = null;
let lastOperation = '';
let haveDot = false;

numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        if (e.target.innerText === ',' && !haveDot) {
            haveDot = true;
        } else if (e.target.innerText === ',' && haveDot) {
            return;
        }

        display2 += e.target.innerText;
        displayInput.innerText = display2
        
    })
})


operators.forEach(operator => {
    operator.addEventListener('click', (e) => {
        if (!display2) result;

        haveDot = false

        const operationName = e.target.innerText;

        if (display1 && display2 && lastOperation) {
            mathOperation();

        } else {
            result = parseFloat(display2);
        }

        clearVar(operationName);
        lastOperation = operationName;
        console.log(result);

    })
})

const clearVar = (name = '') => {
    display1 += display2 + ' ' + name + ' ';
    operating.innerText = display1
    display2 = ''
    displayInput.innerText = result;

}

const mathOperation = () => {
    if (lastOperation === 'x') {
        result = parseFloat(result) * parseFloat(display2);

    } else if (lastOperation === '+') {
        result = parseFloat(result) + parseFloat(display2);

    } else if (lastOperation === '-') {
        result = parseFloat(result) - parseFloat(display2);

    } else if (lastOperation === '/') {
        result = parseFloat(result) / parseFloat(display2);

    } else if (lastOperation === '%') {
        result = parseFloat(result) % parseFloat(display2);

    }


}