/**
 * Matrix Layer Rotation
 * https://www.hackerrank.com/challenges/matrix-rotation-algo/problem
 * 
 * You are given a 2D matrix of dimension m x n and a positive integer r. 
 * You have to rotate the matrix  times and print the resultant matrix.
 * Rotation should be in anti-clockwise direction.
 * Note that in one rotation, you have to shift elements by one step only.
 */

const readline = require('readline');

function main() {
    getSourceMatrix().then(matrix => {
        const rotatedMatrix = rotateMatrix(matrix, 2);

        for (let i = 0; i < rotatedMatrix.length; i++) {
            console.log(rotatedMatrix[i].join(' '));
        }
    }).catch(err => {
        console.error("ERROR: ", err);
    });

}

/**
 * Rotates matrix
 * @param {number[][]} matrix matrix
 * @param {number} rotations rotations count
 * @returns rotated matrix
 */
function rotateMatrix(matrix, rotations) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const rotatedMatrix = new Array(rows).fill(null).map(() => new Array(cols).fill(null));

    const rotatableCirclesCount = Math.trunc(cols < rows ? cols / 2 : rows / 2);
    for (let circleIndex = 0; circleIndex < rotatableCirclesCount; circleIndex++) {
        const rowsCount = rows - 2 * circleIndex;
        const colsCount = cols - 2 * circleIndex;
        const circleLength = 2 * (rowsCount + colsCount) - 4;
        for (let step = 1; step <= circleLength; step++) {
            const [ii, jj] = rotateCell(circleIndex, step, rowsCount, colsCount, circleLength);
            const [i, j] = rotateCell(circleIndex, step + rotations, rowsCount, colsCount, circleLength);
            rotatedMatrix[i][j] = matrix[ii][jj];
        }
    }

    return rotatedMatrix;
}

/**
 * Rotates the cell
 * @param {*} circleIndex circle index
 * @param {*} steps steps
 * @param {*} rowsCount row count
 * @param {*} colsCount columns count
 * @param {*} totalSteps total steps
 * @returns rotated cell coordinates
 */
function rotateCell(circleIndex, steps, rowsCount, colsCount, totalSteps) {
    steps = steps > totalSteps ? steps % totalSteps : steps;

    let row = circleIndex;
    let col = circleIndex;
    for (let step = 1; step <= steps; step++) {
        if (step <= rowsCount - 1) {
            row++;
        } else if (step > rowsCount + colsCount - 2 && step <= 2 * rowsCount + colsCount - 3) {
            row--;
        } else if (step > rowsCount - 1 && step <= rowsCount + colsCount - 2) {
            col++;
        } else {
            col--;
        }
    }
    return [row, col];
};


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
        rl.question("Enter the number of Rows: ", (rows) => {
            rows = parseInt(rows);
            rl.question("Enter the number of Columns: ", (cols) => {
                cols = parseInt(cols);
                const matrix = [];

                function getRows(row) {
                    if (row >= rows) {
                        rl.close();
                        resolve(matrix);
                        return;
                    }
                    rl.question(`Enter elements for row ${row + 1} separated by space: `, (input) => {
                        const elements = input.trim().split(/\s+/).map(Number);
                        if (elements.length !== cols) {
                            console.log(`Invalid number of elements. Expected ${cols} elements.`);
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
    });
}

main()
