import { Module, PulseQueue, ModuleType, PulseType } from "./1.logic";
import { calculateLCM } from "../utils/math/lcm";

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');
const test2 = args.includes('--test2');

const modules: Module[] = [];
const moduleMap: { [id: string]: Module } = {};
const moduleConnections: { [id: string]: string[] } = {};
const pulseQueue = new PulseQueue();

const execute = () => {
    const buttonModule = new Module('button', ModuleType.Button, pulseQueue);
    modules.push(buttonModule);
    moduleMap[buttonModule.id] = buttonModule;
    moduleConnections[buttonModule.id] = ['broadcaster'];

    Object.keys(moduleConnections).forEach((moduleId) => {
        const module = moduleMap[moduleId];
        const destinations = moduleConnections[moduleId];

        destinations.forEach((destinationId) => {
            const destination = moduleMap[destinationId];
            if (destination) {
                if (debug) {
                    console.log(`Adding destination ${destinationId} to module ${moduleId}`);
                }
                module.addDestination(destination);
            } else {
                if (debug) {
                    console.log(`Destination ${destinationId} not found for module ${moduleId}`);
                }
                const deadEndModule = new Module(destinationId, ModuleType.DeadEnd, pulseQueue);
                modules.push(deadEndModule);
                moduleMap[destinationId] = deadEndModule;
                module.addDestination(deadEndModule);
            }
        });
    });

    if (debug) {
        modules.forEach((module) => {
            console.log(`Module ${module.id} has ${module.destinations.length} destinations:`);
            module.destinations.forEach((destination) => {
                console.log(`${destination.id}`);
            });
        });
    }

    let buttonPressCount = 0;
    const firstHighPulses: { [id: string]: number } = {};

    const moduleThatCanPulseRx = modules.find((module) => {
        return module.destinations.find((destination) => {
            return destination.id === 'rx';
        });
    });

    if (moduleThatCanPulseRx) {
        moduleThatCanPulseRx.inputs.forEach((input) => {
            firstHighPulses[input.id] = -1;
        });
    }

    console.log(`firstHighPulses: ${JSON.stringify(firstHighPulses)}`);

    while (true) {
        if (buttonPressCount % 1000 === 0) {
            console.log(`======== Still going...pressing the button for the ${buttonPressCount + 1} time. ========`);
        }
        // Press the button
        buttonModule.sendPulse(PulseType.Low);
        buttonPressCount++;

        // Process the pulse queue
        while (!pulseQueue.isEmpty()) {
            const executedPulse = pulseQueue.execute();

            if (executedPulse && (firstHighPulses[executedPulse.source.id] !== undefined) && (executedPulse.type === PulseType.High)) {
                if (debug) {
                    console.log(`The button was pressed ${buttonPressCount} times.`);
                }

                if (firstHighPulses[executedPulse.source.id] === -1) {
                    firstHighPulses[executedPulse.source.id] = buttonPressCount;
                }
            }
        }

        if (Object.values(firstHighPulses).every((value) => value !== -1)) {
            console.log(`All modules have been in a good state, ready for LCM.`);
            break;
        }
    }

    const lcm = calculateLCM(Object.values(firstHighPulses));
    
    console.log(`The button was pressed ${lcm} times.`);
};

const parseLine = (line: string) => {
    const [source, destinationParts] = line.split(' -> ');
    const destinations = destinationParts.split(', ');
    let module: Module;

    if (source === 'broadcaster') {
        // Broadcaster module
        module = new Module(source, ModuleType.Broadcast, pulseQueue);
    } else if (source.indexOf('%') === 0) {
        // Flip Flop module
        module = new Module(source.substring(1), ModuleType.FlipFlop, pulseQueue);
    } else {
        // Conjunction module
        module = new Module(source.substring(1), ModuleType.Conjunction, pulseQueue);
    }

    modules.push(module);
    moduleMap[module.id] = module;
    moduleConnections[module.id] = destinations;
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test.txt' : test2 ? './test2.txt' : './input.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export {};