const colors = require("colors/safe");

const myError = new Error('You input not number');

let count = 1;
let check_number = 0;

const from = process.argv[2];
const to = process.argv[3];

const isPrime = (number) => {
    if (number < 2) return false;
  
    for (let i = 2; i <= number / 2; i++) {
      if (number % i === 0) return false;
    }
  
    return true;
  };

if ( !isNaN(from) && !isNaN(to) ) {

    for (let number = from; number <= to; number++) {
        let colorer = colors.green;
      
        if (isPrime(number)) {
          if (count % 2 === 0) {
            colorer = colors.yellow;
            count += 1;
          } else if (count % 3 === 0) {
            colorer = colors.red;
            count = 1;
          } else {
            count += 1;
          }
      
          console.log(colorer(number));
          check_number += 1;
        }
      }
      if (check_number === 0) {
          console.log(colors.red("There are is no simple numbers"))
      }
} else {
    console.log(myError.message);
}

