/**
 * Doubly Linked List implementation
 */

class Node {
    constructor(value = null, next = null, prev = null) {
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}

class DLL {
    static isEmptyMessage = "List is empty";

    constructor(head = null) {
        this.head = head;
        this.tail = null;
        this.__length = 0;
    }

    isEmpty() {
        !this.__length ? console.log(DLL.isEmptyMessage) : console.log("List is not empty.");
    }

    getLength() {
        console.log(`List length: ${this.__length}`);
    }

    getHead() {
        this.head ? console.log(`Head: ${this.head.value}.`) : console.log(DLL.isEmptyMessage);
    }

    getTail() {
        this.tail ? console.log(`Tail: ${this.tail.value}.`) : console.log(DLL.isEmptyMessage);
    }

    getByIndex(index) {
        if (typeof(index) != `number` || index < 0 || index >= this.__length) {
            console.log(`Invalid index.`);

        } else {
            if (index === 0) {
                console.log(`Element by index ${index} is ${this.head.value}`);

            } else {
                let tmp = this.head;
                for (let i = 0; i < index; i++) {
                    tmp = tmp.next;
                }
                console.log(`Element by index ${index} is ${tmp.value}`);
            }
        }
    }

    push(value) {
        if (value || value === 0) {
            let node = new Node(value);
            if (!this.head) {
                this.head = node;
                this.tail = node;
                this.__length += 1;
            } else {
                this.tail.next = node;
                node.prev = this.tail;
                this.tail = node;
                this.__length += 1;
            }
        } else {
            console.log(`${value} is invalid value.`)
        }
    }

    pop() {
        if (!this.__length) {
            console.log(DLL.isEmptyMessage)
        } else if (this.tail === this.head && this.tail) {
            this.head = null;
            this.tail = null;
            this.__length -= 1;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
            this.__length -= 1;
        }
    }

    insert(value, index) {
        let node = new Node(value);

        if (typeof(index) != `number` || index < 0 || index > this.__length) {
            console.log(`Invalid index.`);
        } else {

            if (index === 0 && !this.head) {
                this.head = node;
                this.tail = node;
                this.__length += 1;

            } else if (index === 0) {
                this.head.prev = node;
                node.next = this.head;
                this.head = node;
                this.__length += 1;

            } else {
                let tmp = this.head;
                for (let i = 0; i < index - 1; i++) {
                    tmp = tmp.next;
                }

                node.prev = tmp;
                node.next = tmp.next;

                if (tmp.next) {
                    tmp.next.prev = node;
                }

                tmp.next = node;
                this.__length += 1;

                if (index === this.__length - 1) {
                    this.tail = this.tail.next;
                }
            }
        }
    }

    remove(index) {
        if (typeof(index) != `number` || index < 0 || index >= this.__length) {
            console.log(`Invalid index.`);
        } else {

            if (index === 0 && this.__length === 1) {
                this.head = null;
                this.tail = null;
                this.__length -= 1;
            } else if (index === 0) {
                this.head = this.head.next;
                this.head.prev = null;
                this.__length -= 1;
            } else {
                let del_node = this.head;

                for (let i = 0; i < index; i++) {
                    del_node = del_node.next;
                }

                if (del_node.next) {
                    del_node.next.prev = del_node.prev;
                }

                del_node.prev ? del_node.prev.next = del_node.next : del_node.next = null;

                if (index === this.__length - 1) {
                    this.tail = this.tail.prev;
                }

                this.__length -= 1;
            }
        }
    }

    print() {
        if (!this.head) {
            console.log(DLL.isEmptyMessage);
        } else {
            let tmp = this.head;
            let result = "";
            while (tmp) {
                result += tmp.value;
                if (tmp.next) {
                    result += " -> ";
                }
                tmp = tmp.next;
            }
            console.log(result);
        }
    }
}

let dll = new DLL();

console.log('Check if list is empty?');
dll.isEmpty();

console.log("\nInsert new elements:");
dll.push(10);
dll.push(20);
dll.insert(1, 0);
dll.insert(2, 1);
dll.insert(3, 2);
dll.insert(4, 2);
dll.insert(5, 4);
dll.push(30);

console.log('\nPrint list');
dll.print();

dll.insert(2, -1);
dll.insert(2, 15);

console.log('\nGet list size:');
dll.getLength();

console.log('\nPrint list');
dll.print();

console.log('\nRemove elements:');
dll.pop()
dll.remove(2);
dll.remove(0);
dll.remove(10);
dll.remove(-1);

console.log('\nPrint list');
dll.print();

console.log('\nGet list size:');
dll.getLength();

console.log('\nGet list element by index:');
dll.getByIndex(1);
dll.getByIndex(-5);
dll.getByIndex(15);

console.log('\nGet list head value:');
dll.getHead();

console.log('\nGet list tail value:');
dll.getTail();

console.log('\nCheck if list is empty?');
dll.isEmpty();

console.log('\nPrint list');
dll.print();
