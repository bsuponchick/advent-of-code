const DEBUG = {
    ALL: 3,
    TRACE: 2,
    INFO: 1,
    NONE: 0
};

let debug = DEBUG.TRACE;
const monkies = [];

class EventBus {
    constructor () {
        this.subscribers = [];
        this.queuedMessages = [];
        this.ready = false;
    }

    subscribe = (monkey) => {
        this.subscribers.push(monkey);
    }

    publish = (message) => {
        if (this.ready) {
            this.subscribers.forEach((subscriber) => {
                subscriber.receive(message);
            });
        } else {
            this.queuedMessages.push(message);
        }
    }

    unsubscribe = (monkey) => {
        if (this.subscribers.indexOf(monkey) !== -1) {
            this.subscribers.splice(this.subscribers.indexOf(monkey), 1);
        }
    }

    markReady = () => {
        this.ready = true;
        this.queuedMessages.forEach((message) => {
            this.publish(message);
        });

        this.queuedMessages = [];
    }
}

class Monkey {
    constructor (params) {
        this.name = params.name;
        this.dependencies = params.dependencies;
        this.eventBus = params.eventBus;
        this.memory = {};
        this.operation = params.operation;
        this.value = params.value;

        this.eventBus.subscribe(this);

        if (this.operation === 'value') {
            this.yell();
        }
    }

    receive = (message) => {
        this.memory[message.name] = message.value;
        let shouldYell = true;

        this.dependencies.forEach((dependency) => {
            if (this.memory[dependency] === undefined) {
                shouldYell = false;
            }
        });

        if (shouldYell) {
            this.yell();
        }
    }

    calculate = () => {
        if (this.operation === 'value') {
            return this.value;
        } else {
            const leftMonkeyName = this.dependencies[0];
            const rightMonkeyName = this.dependencies[1];

            if (this.operation === '+') {
                // Monkey is doing addition
                return this.memory[leftMonkeyName] + this.memory[rightMonkeyName];
            } else if (this.operation === '-') {
                // Monkey is doing subtraction
                return this.memory[leftMonkeyName] - this.memory[rightMonkeyName];
            } else if (this.operation === '*') {
                // Monkey is doing multiplication
                return this.memory[leftMonkeyName] * this.memory[rightMonkeyName];
            } else if (this.operation === '/') {
                // Monkey is doing division
                return this.memory[leftMonkeyName] / this.memory[rightMonkeyName];
            }
        }
    }

    yell = () => {
        // Stop listening to the events, you're done
        this.eventBus.unsubscribe(this);

        // Publish your message based upon your callback
        if (this.name === 'root') {
            console.log(`Monkey named root yelled ${this.calculate()}`);
        } else {
            this.eventBus.publish({
                name: this.name,
                value: this.calculate()
            });
        }
    }
}

parseLine = (line) => {
    const parts = line.split(': ');
    const rightSide = parts[1].split(' ');

    const name = parts[0];

    if (rightSide.length === 1) {
        // Monkey is just yelling a number
        monkies.push(new Monkey({
            name,
            dependencies: [],
            value: Number.parseInt(rightSide[0], 10),
            operation: 'value',
            eventBus
        }));
    } else {
        const leftMonkeyName = rightSide[0];
        const operation = rightSide[1];
        const rightMonkeyName = rightSide[2];

        monkies.push(new Monkey({
            name,
            dependencies: [leftMonkeyName, rightMonkeyName],
            operation,
            eventBus
        }));
    }
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./sample.txt')
});

const eventBus = new EventBus();

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    eventBus.markReady();
});