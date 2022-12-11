let count = 0;

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./input.txt')
});

lineReader.on('line', (line) => {
    const message = line;
    
    const characters = [];
    let index = 0;

    while ((index < message.length) && (characters.length < 14)) {
        const characterToEvaluate = message.charAt(index);
        const indexOfCharacter = characters.indexOf(characterToEvaluate);

        console.log(`Evaluating ${characterToEvaluate} against ${JSON.stringify(characters)}`);
        if (indexOfCharacter !== -1) {
            for (let i = 0; i <= indexOfCharacter; i++) {
                characters.shift();
            }
        }

        characters.push(characterToEvaluate);
        index++;
        count++;
        console.log(`Characters is ${JSON.stringify(characters)}`);
    }
}).on('close', () => {
    console.log(`There are ${count} characters before the first transmitted start-of-message market`);
});
