import { determineWaysToWin } from "./2.logic";

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
    { time: 53916768, distance: 250133010811025 }
];

const execute = () => {
    const waysToWin = determineWaysToWin(races[0].time, races[0].distance);

    console.log(`There are ${waysToWin} ways to win.`);
}

execute();

export {};