/**
 * Median of Two Sorted Arrays
 * https://leetcode.com/problems/median-of-two-sorted-arrays/description/
 * 
 * Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.
 */

const readline = require('readline');

async function main() {
    console.log("\x1b[1mPlease enter sorted arrays of positive integers.\x1b[0m");

    const arr1 = await getSortedArrayFromUser("Enter sorted array 1 elements separated by space: ");
    const arr2 = await getSortedArrayFromUser("Enter sorted array 2 elements separated by space: ");

    console.log("\n=== Median of Two Sorted Arrays ===\n");
    console.log("Array 1: ", arr1);
    console.log("Array 2: ", arr2);

    console.log("\nMedian of arrays: ", getMedian(arr1, arr2));
}

/**
 * Merges the arrays
 * @param {number[]} arr1 array 1
 * @param {number[]} arr2 array 2
 * @returns 
 */
function getMergedArray(arr1, arr2) {
    let i = 0;
    let j = 0;
    let count = 0;
    const mergedArray = [];

    while (count < arr1.length + arr2.length) {
        if (i === arr1.length) {
            mergedArray.push(...arr2.slice(j));
            break;
        }

        if (j === arr2.length) {
            mergedArray.push(...arr1.slice(i));
            break;
        }

        if (arr1[i] === arr2[j]) {
            mergedArray.push(arr1[i], arr2[j]);
            i++;
            j++;
        } else if (arr1[i] < arr2[j]) {
            mergedArray.push(arr1[i]);
            i++;
        } else {
            mergedArray.push(arr2[j]);
            j++;
        }

        count++;
    }
    return mergedArray;
}

/**
 * Returns median of arrays
 * @param {number[]} arr1 array 1
 * @param {number[]} arr2 array 2
 * @returns median
 */
function getMedian(arr1, arr2) {
    const merged = getMergedArray(arr1, arr2);
    if (merged.length % 2 !== 0) {
        return merged[Math.floor(merged.length / 2)];
    } else {
        const mid = Math.floor(merged.length / 2);
        return (merged[mid] + merged[mid - 1]) / 2;
    }
}

/**
 * Checks if array is sorted and contains only digits
 * @param {number[]} arr array
 * @returns true or false
 */
function checkArrayIsValid(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            return false;
        }
    }
    return arr.every(num => typeof num === 'number' && num > 0 && Number.isInteger(num));
}

/**
 * Gets sorted array from user input
 * @param {string} message message
 * @returns array
 */
async function getSortedArrayFromUser(message) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve, reject) => {
        rl.question(message, (input) => {
            const elements = input.trim().split(/\s+/).map(Number);
            if (checkArrayIsValid(elements)) {
                rl.close();
                resolve(elements);
            } else {
                console.error("\x1b[31mPlease enter sorted array of positive integers.\x1b[0m");
                rl.close();
                resolve(getSortedArrayFromUser(message));
            }
        });
    });
}

main();
