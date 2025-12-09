import { JunctionBox, Circuit, JunctionBoxDistance } from './8.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let junctionBoxId = 0;
let circuitId = 0;
const iterations = test ? 10 : 1000;

const junctionBoxes: JunctionBox[] = [];
const circuits: Circuit[] = [];
const junctionBoxDistances: JunctionBoxDistance[] = [];

const execute = () => {
    console.log(`There are ${junctionBoxes.length} junction boxes`);

    // Calculate the distance between all junction boxes
    for (let i = 0; i < junctionBoxes.length; i++) {
        for (let j = i + 1; j < junctionBoxes.length; j++) {
            const distance = junctionBoxes[i].calculateDistance(junctionBoxes[j]);
            junctionBoxDistances.push({ a: junctionBoxes[i], b: junctionBoxes[j], distance });
        }
    }
    
    junctionBoxDistances.sort((a, b) => a.distance - b.distance);

    for (let i = 0; i < iterations; i++) {
        const smallestDistance = junctionBoxDistances[i];
        const circuitA = smallestDistance.a.getCircuit();
        const circuitB = smallestDistance.b.getCircuit();

        // console.log(`The shortest distance is ${smallestDistance.distance}, which is between ${smallestDistance.a.coordinate.x},${smallestDistance.a.coordinate.y},${smallestDistance.a.coordinate.z} and ${smallestDistance.b.coordinate.x},${smallestDistance.b.coordinate.y},${smallestDistance.b.coordinate.z}`);
        // console.log(`Circuit A is ${circuitA?.getId()}`);
        // console.log(`Circuit B is ${circuitB?.getId()}`);
        // console.log(`--------------------------------`);

        if (circuitA && circuitB) {
            circuitA.merge(circuitB);
            console.log(`Circuit A now has size ${circuitA.getSize()}`);
            console.log(`Circuit B now has size ${circuitB.getSize()}`);
        } else if (circuitA) {
            circuitA.addJunctionBox(smallestDistance.b);
        } else if (circuitB) {
            circuitB.addJunctionBox(smallestDistance.a);
        } else {
            console.log(`Shouldn't ever get here!`);
        }
    }

    console.log(`There are ${circuits.length} circuits`);
    circuits.forEach((circuit) => {
        console.log(`Circuit ${circuit.getId()} has size ${circuit.getSize()}`);
    });

    const productOfThreeLargestCircuits = circuits.sort((a, b) => b.getSize() - a.getSize()).slice(0, 3).reduce((product, circuit) => product * circuit.getSize(), 1);
    console.log(`The product of the three largest circuits is ${productOfThreeLargestCircuits}`);
}

const parseLine = (line: string) => {
    const [x, y, z] = line.split(',').map(Number);
    const junctionBox = new JunctionBox(junctionBoxId, { x, y, z });
    junctionBoxes.push(junctionBox);
    junctionBoxId++;

    const circuit = new Circuit(circuitId);
    circuit.addJunctionBox(junctionBox);
    circuits.push(circuit);
    circuitId++;
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test.txt' : './input.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export {};