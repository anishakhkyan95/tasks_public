/**
 * Find the Closest Palindrome
 * https://leetcode.com/problems/find-the-closest-palindrome/description/
 * 
 * Given a string n representing an integer, return the closest integer (not including itself),
 * which is a palindrome. If there is a tie, return the smaller one.
 */

let length;

function main() {
    const num = process.argv[2];

    try {

        if(!num) {
            throw new Error("Please, provide a number as commandline argument\n");
        }

        if (Number(num) < 0 || (num !== "0" && !Number(num)) ) {
            throw new Error("Please, enter only digits\n")
        }

        length = num.length;

        if (isSingleDigitNumber()) {
            console.log(`Closest polindrom number of ${num} is: ${num}`)
        } else {
            const leftPart = Math.trunc(num / Math.pow(10, length - Math.floor((length + 1) / 2)));
            const min = formatPolindrom(leftPart - 1)
            const max = formatPolindrom(leftPart + 1)
            const mid = formatPolindrom(leftPart)

            let minDif = Math.abs(num - mid);
            let closestPolindrom = mid;

            if (Math.abs(num - min) < minDif) {
                minDif = Math.abs(num - min);
                closestPolindrom = min;
            } else if (Math.abs(num - max) < minDif) {
                minDif = Math.abs(num - max);
                closestPolindrom = max;
            }

            console.log(`Closest polindrom number of ${num} is: ${closestPolindrom}\n`)
        }
    } catch (e) {
        console.log("ERROR: " + e.message)
    }
}

/**
 * Checks if number if single digit
 * @returns true or false
 */
function isSingleDigitNumber() {
    return (1 === length) ? true : false;
}

/**
 * Returns polindrom number
 * @param {number} prefix prefix of number
 * @returns formatted polindrom number
 */
function formatPolindrom(prefix) {
    return Number(prefix.toString() + reverse((length % 2 !== 0) ? prefix.toString().slice(0, -1) : prefix.toString()));
}

/**
 * Reverse the string
 * @param {string} text string to reverce 
 * @returns reverced text
 */
function reverse(text) {
    return [...text].reverse().join("");
}

main()
