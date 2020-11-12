const numbers = document.querySelectorAll('.numbers button');
const operators = document.querySelectorAll('.operators button');

const display = document.querySelector('#display');
const displayResult = document.querySelector('#display-result');

numbers.forEach(number => {
    number.addEventListener('click', (event) => {
        if (display.value.length < 8) {
            const pressedBtn = event.target.innerText;
            
            // User can see a display showing the current number entered...
            display.value += pressedBtn;

            // User can click the 'C' button to clear the last number or the last operation. 
            // If the users last entry was an operation the display will be updated to the value that preceded it.

            const operation = display.value;

            calc(operation);
        };
    });
});

operators.forEach(operator => {
    operator.addEventListener('click', (event) => {
        const pressedBtn = event.target.innerText;

        //... 'C' button (for clear)
        if (pressedBtn == 'C') {
            display.value = display.value.slice(0, -1);

            const operation = display.value;

            calc(operation);
        };

        //  User can click the 'AC' button to clear all internal work areas and to set the display to 0.
        if (pressedBtn == 'AC') {
            display.value ='';
            displayResult.value ='';
        };

        if (pressedBtn == 'ANS') {
            display.value += displayResult.value;

            const operation = display.value;

            calc(operation);
        };

        if (pressedBtn == '=') {
            displayResult.classList.add('update');
            display.value = displayResult.value; 

            setTimeout(fadeoutResult, 1000);

            function fadeoutResult() {
                displayResult.value = '';
                displayResult.classList.remove('update');
            };
            
        };

        // User can enter numbers as sequences up to 8 digits long by clicking on
        // digits in the entry pad. Entry of any digits more than 8 will be ignored.
        if (display.value.length < 8) {
            if (pressedBtn != 'C' && pressedBtn != 'AC' && pressedBtn != '=' && pressedBtn != 'ANS') {
                display.value += pressedBtn;
            }
        };
    });
});


function calc(operation) {
    const results = operation.split(''); // ex: ["5", "x", "4", "x", "3", "/", "2"]

    let count ='';
    let expression1 = '1';
    let expression2 = 0;
    let lastNumber ='';
    let op ='';
    let final = '';

    let i = 0;

    // check each charactere
    results.map(each => {
        if (each == 'x' || each == '*') {
            i++

            i == 1 ? expression1 *= parseInt(count) : expression1 = final;

            count = '';
            op = each;
        } 
        else if (each == '/') {
            i++

            i == 1 ? expression1 = parseInt(count) / expression1 : expression1 = final;

            count = '';
            op = each;
        } 
        else if (each == '+') {
            i++

            i == 1 ? expression2 += parseInt(count) : expression2 = final;

            count = '';
            op = each;
        } 
        else if (each == '-') {
            i++

            i == 1 ? expression2 = parseInt(count) - expression2 : expression2 = final;
         
            count = '';
            op = each;
        }
        else {
            // receive each number of the string
            count += each; 

            // receive last number after the last operator
            lastNumber = parseInt(count); 
    
            // 'op' checks which operator was pressed last
            // calc the last operation
            if(op == 'x' || op =='*') {
                final = expression1 * lastNumber;
            };
            
            if(op == '/') {
                final = expression1 / lastNumber;
            };

            if(op == '+') {
                final = expression2 + lastNumber;
            };

            if(op == '-') {
                final = expression2 - lastNumber;
            };


            // 'ERR' displayed if any operation would exceed the 8 digit maximum
            if ( final.toString().length <= 8) {
                //...show the result of the last operation.
                displayResult.value = final ;
                
            }
            else {
                displayResult.value = ''
                display.value = 'ERR';
            };
        };
    });

};

