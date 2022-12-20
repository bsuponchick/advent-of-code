const OPEN = 'open';
const CLOSED = 'closed';

const STARTING_TIME = 30;

class Valve {
    constructor(id, flowRate, connectingValueIds) {
        this.id = id;
        this.flowRate = flowRate;
        this.connectingValueIds = connectingValueIds;
        this.status = CLOSED;
        this.connections = [];
    }

    print = () => {
        console.log(`<<<<< Valve ${this.id} >>>>>>>>`);
        console.log(`Flow Rate: ${this.flowRate}`);
        console.log(`Connections: ${JSON.stringify(this.connections.map((connection) => {
            return connection.id;
        }))}`);
        console.log(`Status is ${this.status}`);
    }

    calculateRangeToClosedValves = (valveRanges, currentRange, path) => {
        // key = id, value = {range, path}
        if (currentRange < 5) {
            if ((this.status === CLOSED) && ((valveRanges[this.id] === undefined) || (valveRanges[this.id].range > currentRange))) {
                valveRanges[this.id] = {
                    range: currentRange,
                    path
                };
            }

            this.connections.forEach((connection) => {
                connection.calculateRangeToClosedValves(valveRanges, currentRange + 1, [...path, connection.id]);
            });
        }

        return valveRanges;
    }

    getMostEffectiveNextStep = (path, remainingTime) => {
        let valveRanges = this.calculateRangeToClosedValves({}, 0, path);
        let potentialPressureGains = Object.keys(valveRanges).map((id) => {
            let maxFlowPotential = id === this.id ? (this.flowRate * remainingTime) : (valves[id].flowRate * (remainingTime - valveRanges[id].range));
            return {
                id,
                maxFlowPotential,
                path: valveRanges[id].path
            };
        });

        potentialPressureGains.sort((a, b) => {
            if (a.maxFlowPotential > b.maxFlowPotential) {
                return -1;
            } else if (a.maxFlowPotential < b.maxFlowPotential) {
                return 1;
            } else {
                return 0;
            }
        });

        console.log(`Potential pressure gains are ${JSON.stringify(potentialPressureGains)}`);
        if (this.id === potentialPressureGains[0].id) {
            return this;
        } else {
            return valves[potentialPressureGains[0].path[0]];
        }
    }

    open = () => {
        if (this.status === CLOSED) {
            this.status = OPEN;
        } else {
            this.print();
            throw new Error(`You cannot open an already open valve`);
        }
    }
}

const valves = {};

parseLine = (line) => {
    const parts = line.split(';');
    const id = parts[0].substring(6).substring(0, 2);
    const flowRate = Number.parseInt(parts[0].split('=')[1], 10);

    const connections = parts[1].split(',').map((part, index) => {
        if (index === 0) {
            return part.substring(part.length - 2);
        } else {
            return part.trim();
        }
    });

    valves[id] = new Valve(id, flowRate, connections);
};

createConnections = () => {
    Object.keys(valves).forEach((id) => {
        valves[id].connections = valves[id].connectingValueIds.map((valveId) => {
            return valves[valveId];
        }).sort((a, b) => {
            if (a.flowRate < b.flowRate) {
                return -1;
            } else if (a.flowRate > b.flowRate) {
                return 1;
            } else {
                return 0;
            }
        });
        // valves[id].print();
    });
}

calculatePressureReleased = () => {
    let pressure = 0;

    Object.keys(valves).forEach((id) => {
        if (valves[id].status === OPEN) {
            pressure = pressure + valves[id].flowRate;
        }
    });

    return pressure;
}

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./sample.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    let timer = 1;
    let totalPressure = 0;

    let currentNode = valves['AA'];
    let openValveIds = [];
    let closedValveIds = [...Object.keys(valves)];

    createConnections();

    while (timer <= STARTING_TIME) {
        console.log(`== Minute ${timer} ==`);
        console.log(`Current node is ${currentNode.id}`);
        
        const pressureReleased = calculatePressureReleased();
        totalPressure = totalPressure + pressureReleased;
        
        console.log(`Valves ${JSON.stringify(openValveIds)} are open, releasing ${pressureReleased} pressure`);

        const nextStep = currentNode.getMostEffectiveNextStep([], STARTING_TIME - timer);
        console.log(`The most effective next step is ${nextStep.id}.`);

        if (currentNode === nextStep) {
            // Open the current valve
            console.log(`You open valve ${currentNode.id}`);
            currentNode.open();
            openValveIds.push(currentNode.id);
            closedValveIds.splice(closedValveIds.indexOf(currentNode.id), 1);
        } else {
            // Move to the next step
            console.log(`You move to valve ${nextStep.id}`);            
        }

        currentNode = nextStep;
        timer++
        console.log(``);        
    }

    console.log(`You released ${totalPressure} total pressure.`);
});