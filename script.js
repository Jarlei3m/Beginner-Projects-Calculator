const numbers = document.querySelectorAll('.numbers button');
const operators = document.querySelectorAll('.operators button');

const display = document.querySelector('#display');
const displayResult = document.querySelector('#display-result');

numbers.forEach(number => {
    number.addEventListener('click', (event) => {
        const pressedBtn = event.target.innerText;
        
        display.value += pressedBtn;
    })
})

operators.forEach(operator => {
    operator.addEventListener('click', (event) => {
        const pressedBtn = event.target.innerText;

        if (pressedBtn == 'C') {
            display.value = display.value.slice(0, -1);
        }

        if (pressedBtn == 'AC') {
            display.value ='';
            displayResult.value ='';
        }

        if (pressedBtn == 'ANS') {
            display.value += displayResult.value;
        }

        if (pressedBtn == '=') {
            const operation = display.value;

            calc(operation);
        }

        if (pressedBtn != 'C' && pressedBtn != 'AC' && pressedBtn != '=' && pressedBtn != 'ANS') {
            display.value += pressedBtn;
        }
        
        // pressedBtn.innerText == 'x'? display.value += '*' : display.value += pressedBtn.innerText;
        // pressedBtn.innerText == 'C'? display.value = display.value.slice(0, -1) : display.value += pressedBtn.innerText;
    })
})


function calc(operation) {
    const results = operation.split(''); // ["5", "x", "4", "x", "3", "/", "2"]

    let count ='';
    let expression1 = '1';
    let expression2 = 0;
    let lastNumber ='';
    let op =''
    let final = '';
    results.map(each => {
        if (each == 'x' || each == '*') {
            expression1 *= parseInt(count); // 5
            count = '';
            op = each;
        } else if (each == '/') {
            expression1 = parseInt(count) / expression1; 
            count = '';
            op = each;
        } else if (each == '+') {
            expression2 += parseInt(count); 
            count = '';
            op = each;
        } else if (each == '-') {
            expression2 = expression2 - parseInt(count); 
            console.log(count)
            console.log(expression2)
            count = '';
            op = each;
        }
        else {
            count += each; // 4

            lastNumber = parseInt(count);
            
            console.log(lastNumber)
            
            if(op == 'x' || op =='*') {
                final = expression1 * lastNumber;
            }
            if(op == '/') {
                final = expression1 / lastNumber;
            }
            if(op == '+') {
                final = expression2 + lastNumber;
            }
            if(op == '-') {
                final = expression2 - lastNumber;
            }

            displayResult.value = final;
            display.value = '';
        }
    })

}

