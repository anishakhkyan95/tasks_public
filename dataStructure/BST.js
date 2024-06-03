/**
 * Binary Search Tree implementation
 */

class Node {
    constructor(value = null, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

class BST {
    constructor(root = null) {
        this.root = root;
    }

    getRoot() {
        this.root ? console.log(`Root: ${this.root.value}`) : console.log(`Binary Search Tree hasn't any node.`);
    }

    search(value) {
        !this.root
            ? console.log(`Binary Search Tree hasn't any node.`)
            : this.__search(value)
                ? console.log(`${value} is in the BS tree.`)
                : console.log(`${value} is not in the BS tree.`)
    }

    __search(node, parent = this.root) {
        return !parent
            ? false
            : (node === parent.value)
                ? parent
                : (node < parent.value)
                    ? this.__search(node, parent.left)
                    : this.__search(node, parent.right);
    }

    insert(value) {
        if (typeof (value) === 'number') {
            const node = new Node(value);
            !this.root ? this.root = node : this.__insert(this.root, node);
        }
    }

    __insert(parent, child) {
        if (child.value < parent.value) {
            (!parent.left) ? parent.left = child : this.__insert(parent.left, child);

        } else {
            (!parent.right) ? parent.right = child : this.__insert(parent.right, child);
        }
    }

    remove(node) {
        const del_node = this.__search(node, this.root);
        del_node ? this.__remove(del_node) : console.log(`Node by value ${node} doesn't exist in the Tree.`)
    }

    __remove(del_node) {
        if (del_node.left) {
            if (del_node.left.right) {
                if (del_node.left.right.left || del_node.left.right.right) {
                    del_node.value = del_node.left.right.value;
                    this.__remove(del_node.left.right);

                } else {
                    del_node.value = del_node.left.right.value;
                    del_node.left.right = null;
                }

            } else if (del_node.left.left) {
                if (del_node.left.left.left || del_node.left.left.right) {
                    del_node.value = del_node.left.left.value;
                    this.__remove(del_node.left.left);

                } else {
                    del_node.value = del_node.left.left.value;
                    del_node.left.left.value = null;
                }

            } else {
                del_node.value = del_node.left.value;
                del_node.left = null;
            }

        } else if (del_node.right) {
            if (del_node.right.left) {
                if (del_node.right.left.left || del_node.right.left.right) {
                    del_node.value = del_node.right.left.value;
                    this.__remove(del_node.right.left);

                } else {
                    del_node.value = del_node.right.right.value;
                    del_node.right.left = null;
                }

            } else if (del_node.right.right) {
                if (del_node.right.right.left || del_node.right.right.right) {
                    del_node.value = del_node.right.right.value;
                    this.__remove(del_node.right.right);

                } else {
                    del_node.value = del_node.right.right.value;
                    del_node.right.right = null;
                }

            } else {
                del_node.value = del_node.right.right.value;
                del_node.right.right = null;
            }

        } else if (del_node === this.root) {
            this.root = null;

        } else {
            let parent = this.__getParent(del_node.value, this.root);
            (del_node.value === parent.left.value) ? parent.left = null : parent.right = null
        }
    }

    __getParent(node, parent = this.root) {
        return !parent
            ? false
            : (node === parent.value || node === parent.left.value || node === parent.right.value)
                ? parent
                : node < parent.value
                    ? this.__getParent(node, parent.left)
                    : this.__getParent(node, parent.right);
    }

    print() {
        if (this.root) {
            console.log(`\nInorder traversal:`);
            this.__inorder(this.root);

            console.log(`\nPreorder traversal:`);
            this.__preorder(this.root);

            console.log(`\nPostorder traversal:`);
            this.__postorder(this.root);

        } else {
            console.log(`Binary Search tree hasn't any node.`)
        }
    }

    __inorder(parent) {
        if (parent) {
            this.__inorder(parent.left);
            console.log(parent.value);
            this.__inorder(parent.right);
        }
    }

    __preorder(parent) {
        if (parent) {
            console.log(parent.value);
            this.__preorder(parent.left);
            this.__preorder(parent.right);
        }
    }

    __postorder(parent) {
        if (parent) {
            this.__postorder(parent.left);
            this.__postorder(parent.right);
            console.log(parent.value);
        }
    }
}

let bst = new BST()

console.log(`\nInsert nodes in the Tree.`)
bst.insert(7);
bst.insert(4);
bst.insert(10);
bst.insert(2);
bst.insert(6);
bst.insert(8);
bst.insert(12);
bst.insert(5);

bst.print();

console.log(`\nGet root`)
bst.getRoot()

console.log(`\nSearch nodes in the Tree.`)
bst.search(7);
bst.search(5);
bst.search(15);

console.log(`\nRemove nodes from the Tree.`)
bst.remove(12);
bst.remove(7);
bst.remove(2);
bst.remove(20);

bst.print();

console.log(`\nGet root`)
bst.getRoot()
