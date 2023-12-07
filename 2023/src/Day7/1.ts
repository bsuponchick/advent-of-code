import { Hand, HandComparator } from "./1.logic";

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const hands: Hand[] = [];

const execute = () => {
    hands.sort(HandComparator);
    const bids = hands.map((hand) => hand.bid);

    const totalWinnings = bids.reduce((total, bid, currentIndex) => {
        return total + (bid * (currentIndex + 1));
    });

    console.log(`Total winnings: ${totalWinnings}`);
}

const parseLine = (line: string) => {
    const [cards, bid] = line.split(' ');
    hands.push(new Hand(cards, parseInt(bid, 10)));
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