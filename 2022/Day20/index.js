const DEBUG = {
    ALL: 3,
    TRACE: 2,
    INFO: 1,
    NONE: 0
};

let debug = DEBUG.TRACE;

class CircularList {
    constructor () {
        this.head = null;
    }

    append = (value) => {
        let newNode = new Node(value);

        if (this.head === null) {
            newNode.next = newNode;
            newNode.previous = newNode;
            this.head = newNode;
        } else {
            newNode.previous = this.head.previous;
            newNode.next = this.head;
            this.head.previous.next = newNode;
            this.head.previous = newNode;
        }

        return newNode;
    }
}

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.previous = null;
    }

    print = () => {
        if (debug >= DEBUG.INFO) {
            console.log(`>>> Node ${this.value} <<<`);
            console.log(`Next: ${this.next.value}`);
            console.log(`Previous: ${this.previous.value}`);
        }
    }

    findNodeAfter = (count) => {
        let target = this;
        while (count-- >= 0) {
            target = target.next;
        }

        return target;
    }

    findNodeBefore = (count) => {
        let target = this;

        while (count++ <= 0) {
            target = target.previous;
        }

        return target;
    }

    shift = () => {
        let targetNextNode = this;
        let shiftAmount = this.value % (originalOrder.length - 1);

        if (this.value === 0) {
            if (debug >= DEBUG.INFO) {
                console.log(`${this.value} does not move`);
            }
            return;
        } else if (this.value > 0) {
            targetNextNode = this.findNodeAfter(shiftAmount);
        } else {
            targetNextNode = this.findNodeBefore(shiftAmount);
        }

        if (debug >= DEBUG.INFO) {
            console.log(`${this.value} moves between ${targetNextNode.previous.value} and ${targetNextNode.value}`);
        }

        // Connect previous neighbors
        this.previous.next = this.next;
        this.next.previous = this.previous;
        
        // Connect this node
        this.next = targetNextNode;
        this.previous = targetNextNode.previous;

        // Change target node and previous neighbor's next
        targetNextNode.previous.next = this;
        targetNextNode.previous = this;
    }

    getValueAt = (shift) => {
        let counter = 0;
        let node = this;

        while (counter < shift) {
            node = node.next;
            counter++;
        }

        return node.value;
    }
}

const list = new CircularList();
const originalOrder = [];
let zeroNode = null;

parseLine = (line) => {
    const value = Number.parseInt(line, 10); 
    let node = list.append(value);
    originalOrder.push(node);

    if ((value === 0) && (zeroNode === null)) {
        zeroNode = node;
    }
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./input.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    if (debug >= DEBUG.TRACE) {
        originalOrder.forEach((node) => {
            node.print();
        });
        console.log(`================================`);
    }

    originalOrder.forEach((node) => {
        node.shift();
    });

    const value1000 = zeroNode.getValueAt(1000);
    const value2000 = zeroNode.getValueAt(2000);
    const value3000 = zeroNode.getValueAt(3000);

    console.log(`Value shifted 1000 from 0 is ${value1000}`);
    console.log(`Value shifted 2000 from 0 is ${value2000}`);
    console.log(`Value shifted 3000 from 0 is ${value3000}`);

    console.log(`The sum of the 3 numbers is ${value1000 + value2000 + value3000}`);
});