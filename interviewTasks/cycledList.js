/**
 * Determine if the Linked List is cycled
 */

class Node {
    constructor(value = null, next = null) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList {
    constructor(head = null) {
        this.head = head;
        this.length = 0;
    }

    getList() {
        let nodes = [];
        let currentNode = this.head;
        let visited = new Set();

        while (currentNode !== null) {
            if (visited.has(currentNode)) {
                break;
            }
            visited.add(currentNode);
            nodes.push({ node: currentNode.value, next: currentNode.next ? currentNode.next.value : null });
            currentNode = currentNode.next;
        }
        return nodes;
    }

    addItem(value) {
        const newNode = new Node(value);

        if (!this.head) {
            this.head = newNode;
        } else {
            let currentNode = this.head;
            while (currentNode.next) {
                currentNode = currentNode.next;
            }
            currentNode.next = newNode;
        }
        this.length++;
    }
}

function __isListCycled(list) {
    const head = list.head
    if (!head || !head.next) {
        return false;
    }

    let slowIteration = head;
    let fastIteration = head.next;

    while (slowIteration !== fastIteration) {
        if (!fastIteration || !fastIteration.next) {
            return false;
        }
        slowIteration = slowIteration.next;
        fastIteration = fastIteration.next.next;
    }

    return true;
}

function isListCycled(list) {
    __isListCycled(list)
        ? console.log("\x1b[31m%s\x1b[0m", "List is cycled\n")
        : console.log("\x1b[32m%s\x1b[0m", "List is not cycled\n");
}

// Creating a list with cycle
let list1 = new LinkedList();
list1.addItem(1);
list1.addItem(2);
list1.addItem(3);
list1.addItem(4);

list1.head.next.next.next.next = list1.head.next;

// Creating a list with no cycle
let list2 = new LinkedList();
list2.addItem(1);
list2.addItem(2);
list2.addItem(3);
list2.addItem(4);

console.log("First List:\n", list1.getList());
isListCycled(list1);

console.log("Second List:\n", list2.getList());
isListCycled(list2);
