/**
 * Number of Digit One
 * https://leetcode.com/problems/number-of-digit-one/description/
 * 
 * Given an integer n, count the total number of digit 1 appearing in all non-negative integers less than or equal to n.
 */

function main() {
    const num = process.argv[2];

    try {
        if(!num) {
            throw new Error("Please, provide a number as commandline argument\n");
        }

        if (Number(num) < 0 || (num !== "0" && !Number(num)) ) {
            throw new Error("Please, enter only digits\n")
        }

        console.log(countOfOnes(num));

    } catch (e) {
        console.log("ERROR: " + e.message)
    }
}

/**
 * Returns count of ones
 * @param {number} num number
 * @returns count of ones
 */
function countOfOnes(num) {
    let count = 0;
    let position = 1;

    while (position <= num) {
        const divisor = Math.floor(num / (position * 10));
        const currentDigit = Math.floor(num / position) % 10;
        const reminder = num % position;

        count += divisor * position;
        count += (currentDigit > 1) ? position : (reminder + 1)

        position *= 10;
    }

    return count;
}

main()
