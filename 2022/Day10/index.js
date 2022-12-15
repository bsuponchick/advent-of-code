var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./input.txt')
});

let currentValue = 1;
let cycleValues = [1];

lineReader.on('line', (line) => {
    if (line === 'noop') {
        cycleValues.push(currentValue);
    } else {
        const parts = line.split(' ');
        const value = Number.parseInt(parts[1], 10);

        cycleValues.push(currentValue);
        cycleValues.push(currentValue + value);
        currentValue = currentValue + value;
    }
}).on('close', () => {
    console.log(`cycleValues are ${JSON.stringify(cycleValues)}`);

    const signalStrengths = [];
    signalStrengths.push(cycleValues[19] * 20);
    signalStrengths.push(cycleValues[59] * 60);
    signalStrengths.push(cycleValues[99] * 100);
    signalStrengths.push(cycleValues[139] * 140);
    signalStrengths.push(cycleValues[179] * 180);
    signalStrengths.push(cycleValues[219] * 220);

    console.log(`Signal strengths are ${JSON.stringify(signalStrengths)}`);
    
    const sum = signalStrengths.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    console.log(`The sum of the signal strengths is ${sum}`);
});
