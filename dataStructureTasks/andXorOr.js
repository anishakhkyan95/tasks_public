/**
 * AND xor OR
 * https://www.hackerrank.com/challenges/and-xor-or/problem
 * 
 */


const readline = require('readline');

async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const length = parseInt(await getUserInput(rl, "Enter the length of the array: "));

    const arr = [];
    for (let i = 0; i < length; i++) {
        const el = parseInt(await getUserInput(rl, `Enter element ${i + 1}: `));
        arr.push(el);
    }

    console.log("Max of And xor Or: " + andXorOr(arr));
    rl.close()
}

/**
 * Returns max of And Xor Or 
 * @param {Array} arr array
 * @returns max
 */
function andXorOr(arr) {
    let max = 0;
    
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            const current = (arr[i] & arr[j]) ^ (arr[i] | arr[j]);
            if(current > max) {
                max = current
            }
        }
    }
    
    return max;
}

/**
 * Gets user input
 * @param {readline.Interface} rl read-line interface
 * @param {string} question question
 * @returns user input
 */
function getUserInput(rl, question) {
    return new Promise((resolve, reject) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

main();
