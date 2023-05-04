//creates the readline to enable input and outputs
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//creates a function that generates a random whole number
function randomInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//intializes a secret number that will be defined in askRange
let secretNumber;

//intializes the number of attempts that will be defined in askLimit
let numAttempts;

//determines if the guessed number is higher than, lower than, or equal
//to the secret number
let checkGuess = function(num) {
    if (num > secretNumber) {
        console.log('Too high.');
        return false
    }
    else if (num < secretNumber) {
        console.log('Too low.')
        return false;
    }
    else if (num === secretNumber)  {
        console.log('Correct!')
        return true;
    } else { //in case someone puts a guess that is not a number
        console.log("That's not a number.");
        return false;
    }
}

function askGuess() {
    rl.question("Enter a guess: ", (answer) => {
        if (checkGuess(Number(answer))) {
        console.log('You win!');
        rl.close();
            }
        else {
            if(numAttempts > 1) {
                numAttempts--;
                console.log('You have ' + numAttempts + ' attempts left.')
                askGuess();
            } else {
                console.log("You lose")
                rl.close();
            }
    }
})
return '';
}

function askLimit() {
    rl.question('Pick the number of attempts: ', attempts => {
        numAttempts = attempts;
        console.log(askRange());
})
return '';
}

function askRange() {
    rl.question('Pick a minimum number: ', minNum => {
        rl.question('Pick a maximum number: ', maxNum => {
        console.log("Guess the secret number between " + minNum + ' and ' + maxNum + ':');
        secretNumber = randomInRange(Number(minNum), Number(maxNum));
        console.log(askGuess());
        })
})
return '';
}



;
console.log(askLimit());

// console.log(askGuess());
