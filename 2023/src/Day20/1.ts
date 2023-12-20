import { Module, PulseQueue, ModuleType, PulseType } from "./1.logic";

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const modules: Module[] = [];
const moduleMap: { [id: string]: Module } = {};
const moduleConnections: { [id: string]: string[] } = {};
const pulseQueue = new PulseQueue();
const MAX_BUTTON_PRESSES = 1000;

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
                console.log(`Adding destination ${destinationId} to module ${moduleId}`);
                module.addDestination(destination);
            } else {
                console.log(`Destination ${destinationId} not found for module ${moduleId}`);
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
    let backInDefaultState = false;

    while ((buttonPressCount < MAX_BUTTON_PRESSES) && (backInDefaultState === false)) {
        // Press the button
        buttonModule.sendPulse(PulseType.Low);
        buttonPressCount++;

        // Process the pulse queue
        while (!pulseQueue.isEmpty()) {
            pulseQueue.execute();
        }

        // Check if all modules are back in their default state
        backInDefaultState = true;
        for (const module of modules) {
            if (module.isInDefaultState() === false) {
                backInDefaultState = false;
                break;
            }
        }
    }

    let productOfLowAndHighPulses = 0;

    if (backInDefaultState) {
        console.log(`All modules are back in their default state after ${buttonPressCount} button presses.`);

        if (buttonPressCount === 1) { 
            productOfLowAndHighPulses = (pulseQueue.getLowPulseCount() * MAX_BUTTON_PRESSES) * (pulseQueue.getHighPulseCount() * MAX_BUTTON_PRESSES);
        } else {
            // There was a repeat so we need to calculate the pulses based upon how many times the pattern will repeat
            const remainingCircuits = Math.floor(MAX_BUTTON_PRESSES / buttonPressCount);
            const additionalButtonPresses = MAX_BUTTON_PRESSES % buttonPressCount;
            const additionalPulses = pulseQueue.countHistory[additionalButtonPresses];

            // Calculate the number of pulses that will be sent in the remaining button presses
            let totalHigh = pulseQueue.getHighPulseCount() * (remainingCircuits);
            let totalLow = pulseQueue.getLowPulseCount() * remainingCircuits;

            // Add the additional pulses
            totalHigh += additionalPulses.high;
            totalLow += additionalPulses.low;

            productOfLowAndHighPulses = totalHigh * totalLow;
        }
    } else {
        console.log(`Had to press the button all ${MAX_BUTTON_PRESSES} times.`);
        productOfLowAndHighPulses = pulseQueue.getLowPulseCount() * pulseQueue.getHighPulseCount();
    }

    console.log(`There were ${pulseQueue.getTotalPulseCount()} pulses sent, ${pulseQueue.getHighPulseCount()} high and ${pulseQueue.getLowPulseCount()} low.`);
    console.log(`The product of the number of low and high pulses is ${productOfLowAndHighPulses}.`);
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
    input: require('fs').createReadStream(test ? './test.txt' : './input.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export {};