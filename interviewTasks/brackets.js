/**
 * Determine if the close bracket has a corresponding open bracket of the same type
 */

const readline = require('readline');

async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const input = await getUserInput(rl, "Enter a string containg brackets: ");
    console.log(verifyBrackets(input) ? "\nInputted string is valid" : "\nInputted string is NOT valid");
    rl.close();
}

/**
 * Verifies if the close bracket has a corresponding open bracket of the same type
 * @param {string} input inputted string
 * @returns boolean value
 */
function verifyBrackets(input) {
    const brackets = {
        ')': '(',
        '}': '{',
        ']': '['
    };

    let containBrackets = false;
    let openingBrackets = [];

    for (let char of input) {
        if (brackets[char]) {
            containBrackets = true;
            let topElement = openingBrackets.length === 0 ? null : openingBrackets.pop();

            if (topElement !== brackets[char]) {
                return false;
            }
        }
        if (Object.values(brackets).includes(char)) {
            openingBrackets.push(char);
        }
    }

    return (0 === openingBrackets.length && containBrackets);
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

main()
