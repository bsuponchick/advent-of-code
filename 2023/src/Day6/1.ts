import { determineWaysToWin } from "./1.logic";

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

interface Race {
    time: number;
    distance: number;
}

// Time:        53     91     67     68
// Distance:   250   1330   1081   1025

let races: Race[] = [
    { time: 53, distance: 250 },
    { time: 91, distance: 1330 },
    { time: 67, distance: 1081 },
    { time: 68, distance: 1025 }
];


const execute = () => {
    const waysToWin: number[] = [];

    races.forEach((race) => {
        waysToWin.push(determineWaysToWin(race.time, race.distance));
    });

    const product = waysToWin.reduce((acc, cur) => acc * cur);

    console.log(`The product of the ways to win is ${product}`);
}

execute();

export {};