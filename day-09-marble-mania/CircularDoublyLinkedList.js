const Node = require("./Node");

const CircularDoublyLinkedList = class {
    constructor() {
        this.head = null;
    }

    insert(currentNode, data) {
        const newNode = new Node(data);

        if (this.head === null) {
            this.head = newNode;
            newNode.next = newNode;
            newNode.previous = newNode;
        }
        else {
            let previous = currentNode.next;
            let next = currentNode.next.next;

            newNode.next = next;
            newNode.previous = previous;

            previous.next = newNode;
            next.previous = newNode;
        }
    }

    remove(currentNode) {
        if (this.head === null) {
            throw new RangeError(`List is empty.`);
        }

        let current = currentNode;
        let i = 0;

        while (i < 7) {
            current = current.previous;
            i++;
        }

        current.previous.next = current.next;
        current.next.previous = current.previous;

        return [current.data, current.next];                     
    }
};

module.exports = CircularDoublyLinkedList;