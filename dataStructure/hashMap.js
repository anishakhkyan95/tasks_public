/**
 * Hash map implementation
 */

const readline = require('readline');

class HashMap {
    constructor(size = 21) {
        this.size = size;
        this.hashTable = this._createHashTable();
    }

    _getAsciiSum(str) {
        let sum = 0;
        for (let i = 0; i < str.length; i++) {
            sum += str.charCodeAt(i);
        }
        return sum;
    }

    _hash(value) {
        return this._getAsciiSum(value) % this.size;
    }

    _createHashTable() {
        let hashTable = {};
        for (let i = 0; i < this.size; i++) {
            hashTable[i] = [];
        }
        return hashTable;
    }

    _appendValue(dictObj, key, value) {
        if (key in dictObj) {
            if (!dictObj[key].includes(value)) {
                dictObj[key].push(value);
            }
        }
    }

    setValue(value) {
        const index = this._hash(value);
        this._appendValue(this.hashTable, index, value);
        return this.hashTable;
    }

    getValue(value) {
        const index = this._hash(value);
        for (let i = 0; i < this.hashTable[index].length; i++) {
            if (value === this.hashTable[index][i]) {
                return i;
            }
        }
        return -1; // Return -1 if the value is not found
    }

    delValue(value) {
        const index = this._hash(value);
        const bucket = this.hashTable[index];
        const itemIndex = bucket.indexOf(value);
        if (itemIndex !== -1) {
            bucket.splice(itemIndex, 1);
        }
    }

    print() {
        for (const [key, value] of Object.entries(this.hashTable)) {
            console.log(`${key}: ${value}`);
        }
    }
}

function main() {
    const hashmap = new HashMap();
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log('\x1b[1mOPTIONS:  "s" - set value, "g" - get value, "d" - delete value, "p" - print Hash map, "e" - end program\x1b[0m');

    function getUserInput() {
        rl.question("\nPlease, choose an action: ", (userChoice) => {
            userChoice = userChoice.toLowerCase();
            if (userChoice === "s") {
                rl.question("Set value: ", (value) => {
                    hashmap.setValue(value);
                    getUserInput();
                });
            } else if (userChoice === "d") {
                rl.question("Delete value: ", (value) => {
                    hashmap.delValue(value);
                    getUserInput();
                });
            } else if (userChoice === "g") {
                rl.question("Get value: ", (value) => {
                    const result = hashmap.getValue(value);
                    result !== -1
                        ? console.log(`Value '${value}' found at index ${result}`)
                        : console.log(`Value '${value}' not found`);
                    getUserInput();
                });
            } else if (userChoice === "p") {
                hashmap.print();
                getUserInput();
            } else if (userChoice === "e") {
                rl.close();
            } else {
                console.error('\x1b[31mWrong choice. Try again.\x1b[0m');
                getUserInput();
            }
        });
    }

    getUserInput();
}

main();
