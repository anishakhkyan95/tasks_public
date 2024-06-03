/**
 * Max Transform
 * https://www.hackerrank.com/challenges/max-transform/problem
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

    console.log(getSum(arr))
    rl.close()
}

/**
 * Returns sum of max transforms
 * @param {Array} arr array
 * @returns sum of max transforms
 */
function getSum(arr) {
    return (maxTransformOfMaxTransforms(arr).reduce((partialSum, a) => partialSum + a, 0))
}

/**
 * Returns max trasforms of max transforms of array
 * @param {Array} arr array
 * @returns max trasforms
 */
function maxTransformOfMaxTransforms(arr) {
    return (maxTransform(maxTransform(arr)))
}

/**
 * Returns max transforms of array
 * @param {Array} arr array
 * @returns max trasforms
 */
function maxTransform(arr) {
    let B = []

    for (let k = 0; k <= arr.length - 1; k++) {
        for (let i = 0; i <= arr.length - k - 1; i++) {
            const j = i + k;
            const maxSum = Math.max(arr[i], arr[j]);
            B.push(maxSum)
        }
    }

    return (B);
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
