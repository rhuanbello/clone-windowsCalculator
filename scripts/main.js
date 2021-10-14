const displayInput = document.querySelector('.display .input')
const operatingHistory = document.querySelector('.display .operating')
const numbers = document.querySelectorAll('.buttons .number')
const operators = document.querySelectorAll('.operator')

const equal = document.querySelector('.equal')
const backspace = document.querySelector('.backspace')
const clear = document.querySelector('.clearAll')
const clearLast = document.querySelector('.clearLast')

const defaultFontSize = parseInt(window.getComputedStyle(displayInput).fontSize)

let display1 = '';
let display2 = '';
let result = null;
let lastOperation = '';
let haveDot = false;

// Números
numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        if (e.target.innerText === '.' && !haveDot) {
            haveDot = true;
        } else if (e.target.innerText === '.' && haveDot) {
            return;
        }

        if (display2.length < 16) {
            display2 += e.target.innerText;
            displayInput.innerText = display2

        }

        checkDisplaySize()
        
    })
})

// Operadores
operators.forEach(operator => {
    operator.addEventListener('click', (e) => {
        if (!display2) return;

        haveDot = false

        const operationName = e.target.innerText;

        if (display1 && display2 && lastOperation) {
            mathOperation();

        } else {
            result = parseFloat(display2);
        }

        clearVar(operationName);
        lastOperation = operationName;

    })
})

// Move from Display Input to operatingHistory
const clearVar = (name = '') => {
    display1 += display2 + ' ' + name + ' ';
    operatingHistory.innerText = display1
    display2 = ''
    displayInput.innerText = result;

}

// Operações Matemáticas
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

equal.addEventListener('click', (e) => {
    if(!display1 || !display2) return;
    haveDot = false;

    mathOperation();
    clearVar();

    displayInput.innerText = result;

    display2 = result;
    display1 = '';

})

clear.addEventListener('click', (e) => {
    displayInput.innerText = '0';
    operatingHistory.innerText = '';
    display1 = '';
    display2 = '';
    result = '0';
    haveDot = false;
    displayInput.style = defaultFontSize;

})

clearLast.addEventListener('click', (e) => {
    displayInput.innerText = '0';
    display1 = '';
    display2 = '';
    result = '0';
    haveDot = false;
    displayInput.style = defaultFontSize;

})

backspace.addEventListener('click', (e) => {
    if (display2.length > 1) {
        display2 = display2.slice(0, - 1);
        displayInput.innerText = display2
        
    } else {
        clearLast.click()

    }

})

// Keyboard Buttons

window.addEventListener('keydown', (e) => {
    if (
        e.key === '0' || 
        e.key === '1' || 
        e.key === '2' || 
        e.key === '3' || 
        e.key === '4' || 
        e.key === '5' || 
        e.key === '6' || 
        e.key === '7' || 
        e.key === '8' || 
        e.key === '9' || 
        e.key === '.'
    ){ 
        clickButton(e.key);
    } else if (
        e.key === '+' ||
        e.key === '-' ||
        e.key === '%' ||
        e.key === '/'
    ) {
        clickOperation(e.key);
    } else if (e.key === '*') {
        clickOperation('x')
    } else if (e.key === 'Enter' || e.key === '=') {
        clickEqual();
    } else if (e.key === 'Backspace') {
        clickBackspace();
    } else if (e.key === 'Delete') {
        clickClearAll()
    }


})

const clickButton = (key) => {
    numbers.forEach(number => {
        if (number.innerText === key) {
            number.click()
        }
    })


}

const clickOperation = (key) => {
    operators.forEach(operator => {
        if (operator.innerText == key) {
            operator.click()
        }
    })

}

const clickEqual = () => {
    equal.click()

}

const clickClearAll = () => {
    clear.click()
}

const clickBackspace = () => {
    backspace.click()
}

// Animation Open/Close

const calculatorSimulator = () => {
    
    const shortcut = document.querySelector('.shortcut');
    const close = document.querySelector('.close')
    const minimize = document.querySelector('.minimize')
    const calculator = document.querySelector('section')

    const closeCalculator = () => {
        calculator.classList.add('hidden')
        setTimeout(() => clear.click(), 400)

    }

    const minimizeCalculator = () => {
        calculator.classList.add('hidden')

    }

    const openCalculator = () => {
        if (!calculator.classList.contains('hidden')) {
            calculator.classList.add('hidden')
            
        } else {
            calculator.classList.remove('hidden')
        }

    }

    close.addEventListener('click', closeCalculator)
    minimize.addEventListener('click', minimizeCalculator)
    shortcut.addEventListener('click', openCalculator)



}

calculatorSimulator()

// Display Responsive

const containerInput = document.querySelector('.display .container-input')


const checkDisplaySize = () => {
    const fontSizeInput = parseInt(window.getComputedStyle(displayInput).fontSize)

    if (displayInput.offsetWidth > containerInput.offsetWidth) {
        displayInput.style.fontSize = (fontSizeInput / 1.1) + 'px';

    } 
    


}
