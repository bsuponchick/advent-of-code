let moves = '';

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./input.txt')
});

lineReader.on('line', (line) => {
    moves = line;
}).on('close', () => {
    let floor = 0;

    for (let i = 0; i < moves.length; i++) {
        if (moves.charAt(i) === '(') {
            floor = floor + 1;
        } else if (moves.charAt(i) === ')') {
            floor = floor - 1;
        }
    }

    console.log(`Santa ends up on floor ${floor}`);
});
