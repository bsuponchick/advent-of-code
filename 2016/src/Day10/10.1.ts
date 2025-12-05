import { Bot, Bin, Microchip } from './10.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let chipInstructions: string[] = [];

let bots: Map<number, Bot> = new Map();
let bins: Map<number, Bin> = new Map();
const lowGoalId = test ? 2 : 17;
const highGoalId = test ? 5 : 61;

const execute = () => {
    console.log(`Bots: ${bots.size}`);
    console.log(`Bins: ${bins.size}`);

    for (const instruction of chipInstructions) {
        const parts = instruction.split(' ');
        const value = Number(parts[1]);
        const botId = Number(parts[5]);
        bots.get(botId).addMicrochip(new Microchip(value));
    }
}

const parseLine = (line: string) => {
    if (line.startsWith('value')) {
        chipInstructions.push(line);
    } else {
        // This is a bot instruction, need to set up all bots and bins we can
        const parts = line.split(' ');
        const botId = Number(parts[1]);
        const lowTargetId = Number(parts[6]);
        const lowTargetType = parts[5];
        const highTargetId = Number(parts[11]);
        const highTargetType = parts[10];

        if (!bots.has(botId)) {
            bots.set(botId, new Bot(botId, lowGoalId, highGoalId));
        }

        if (lowTargetType === 'bot') {
            if (!bots.has(lowTargetId)) {
                bots.set(lowTargetId, new Bot(lowTargetId, lowGoalId, highGoalId));
            }
        } else {
            if (!bins.has(lowTargetId)) {
                bins.set(lowTargetId, new Bin(lowTargetId));
            }
        }

        if (highTargetType === 'bot') {
            if (!bots.has(highTargetId)) {
                bots.set(highTargetId, new Bot(highTargetId, lowGoalId, highGoalId));
            }
        } else {
            if (!bins.has(highTargetId)) {
                bins.set(highTargetId, new Bin(highTargetId));
            }
        }
        
        // Now we set the targets for the bot
        bots.get(botId).setLowTarget(lowTargetType === 'bot' ? bots.get(lowTargetId) : bins.get(lowTargetId));
        bots.get(botId).setHighTarget(highTargetType === 'bot' ? bots.get(highTargetId) : bins.get(highTargetId));
    }
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