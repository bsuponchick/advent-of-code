const md5 = require('blueimp-md5');

const input = 'iwrupvqb';
let found = false;
let number = 0;

while (!found) {
    let test = `${input}${number}`;
    const hash = md5(test);

    if (hash.substring(0, 5) === '00000') {
        found = true;
    } else {
        number++;
    }
}

console.log(`Your secret key is ${input}${number}`);