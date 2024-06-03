/**
 * Maximal Rectangle
 * https://leetcode.com/problems/maximal-rectangle/description/
 * 
 * Given a rows x cols binary matrix filled with 0's and 1's,
 * find the largest rectangle containing only 1's and return its area.
 */

const readline = require('readline');

function main() {
    getSourceMatrix().then(matrix => {
        console.log("\n== Matrix ==");
        matrix.forEach(row => {
            console.log(row.join(' '));
        });
        console.log("\nMaximal Rectangle Area: ", getMaxArea(matrix));
    });
}

/**
 * Returns max area
 * @param {number[][]} matrix matrix 
 * @returns max area
 */
function getMaxArea(matrix) {
    if (!matrix || !matrix.length) {
        return 0;
    }

    const histogram = getHistogram(matrix);

    let maxArea = 0;
    for (let i = 0; i < matrix.length; i++) {
        maxArea = Math.max(maxArea, getLargestArea(histogram[i]));
    }

    return maxArea;
}

/**
 * Returns histogram
 * @param {number[][]} matrix matrix 
 * @returns histogram
 */
function getHistogram(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;

    const histogram = Array.from({ length: rows }, () => Array(cols).fill(0));
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (matrix[i][j] === '1') {
                histogram[i][j] = (i === 0) ? 1 : (histogram[i - 1][j] + 1);
            }
        }
    }

    return histogram;
}

/**
 * Returns largest area 
 * @param {number[]} histogramRow histogram row
 * @returns largest area
 */
function getLargestArea(histogramRow) {
    if (!histogramRow || !histogramRow.length) {
        return 0;
    }

    const indexes = [];
    let maxArea = 0;

    for (let i = 0; i <= histogramRow.length; i++) {
        const h = (i < histogramRow.length) ? histogramRow[i] : 0;

        if (indexes.length === 0 || h >= histogramRow[indexes[indexes.length - 1]]) {
            indexes.push(i);

        } else {
            const lastIndex = indexes.pop();
            maxArea = Math.max(maxArea, histogramRow[lastIndex] * (!indexes.length ? i : (i - indexes[indexes.length - 1] - 1)));
            i--;
        }
    }

    return maxArea;
}

/**
 * Returns source matrix
 * @returns matrix
 */
function getSourceMatrix() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    return new Promise((resolve, reject) => {
        rl.question("Do you want to use the default matrix? (yes/no): ", (answer) => {
            if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
                rl.close();
                resolve([
                    ['1', '0', '1', '0', '0'],
                    ['1', '0', '1', '1', '1'],
                    ['1', '1', '1', '1', '1'],
                    ['1', '0', '0', '1', '0']
                ]);
            } else {
                validateInput(rl, "Enter the number of Rows: ", rows => {
                    validateInput(rl, "Enter the number of Columns: ", cols => {
                        const matrix = [];
                        function getRows(row) {
                            if (row >= rows) {
                                rl.close();
                                resolve(matrix);
                                return;
                            }
                            rl.question(`Enter elements for row ${row + 1} separated by space: `, (input) => {
                                const elements = input.trim().split(/\s+/);
                                if (elements.length !== cols) {
                                    console.error(`\x1b[31mInvalid number of elements. Expected ${cols} elements.\x1b[0m`);
                                    getRows(row);
                                } else if (elements.some(el => el !== '1' && el !== '0')) {
                                    console.log(`\x1b[31mInvalid input. Only 0 and 1 are allowed.\x1b[0m`);
                                    getRows(row);
                                } else {
                                    matrix.push(elements);
                                    getRows(row + 1);
                                }
                            });
                        }
                        getRows(0);
                    });
                });
            }
        });
    });
}

/**
 * Validates input
 * @param {readline.Interface} rl readline
 * @param {string} question question
 * @param {any} callback callback
 */
function validateInput(rl, question, callback) {
    rl.question(question, input => {
        const number = parseInt(input, 10);
        if (isNaN(number) || number <= 0) {
            console.error('\x1b[31mInvalid input. Please enter a positive number.\x1b[0m');
            validateInput(rl, question, callback);
        } else {
            callback(number);
        }
    });
}

main();
