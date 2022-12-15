var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./input.txt')
});

let currentValue = 1;
let cycleValues = [1];
let stream = '';

lineReader.on('line', (line) => {
    if (line === 'noop') {
        cycleValues.push(currentValue);
    } else {
        const parts = line.split(' ');
        const value = Number.parseInt(parts[1], 10);

        cycleValues.push(currentValue);

        currentValue = currentValue + value;
        cycleValues.push(currentValue);
    }
}).on('close', () => {
    const crt = [];
    
    for (let line = 0; line < 6; line++) {
        let output = '';
        let cyclesToEval = cycleValues.slice(line * 40, (line + 1) * 40);

        for (let index = 0; index < 40; index++) {
            let value = cyclesToEval[index];
            if ((index >= (value - 1)) && (index <= (value + 1))) {
                output = output + '#';
            } else {
                output = output + '.';
            }
        }

        console.log(output);
    }
});
