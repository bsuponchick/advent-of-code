var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./input.txt')
});

const two = [[2]];
const six = [[6]];
const packets = [two, six];

const compare = (left, right) => {
    console.log(`Compare ${JSON.stringify(left)} and ${JSON.stringify(right)}`);
    if (typeof(left) === 'number') {
        if (typeof(right) === 'number') {
            if (left < right) {
                console.log(`Left is smaller, order is correct`);
                return -1;
            } else if (left > right) {
                console.log(`Right is smaller, order is incorrect`)
                return 1;
            } else {
                console.log(`Numbers are identical, order is correct`);
                return 0;
            }
        } else if (right instanceof Array) {
            console.log(`Mixed types; convert left to [${left}] and retry comparison`);
            return compare([left], right);
        }
    } else if (left instanceof Array) {
        if (typeof(right) === 'number') {
            console.log(`Mixed types; convert right to [${right}] and retry comparison`);
            return compare(left, [right]);
        } else if (right instanceof Array) {
            let smallerLength = left.length < right.length ? left.length : right.length;

            for (let i = 0; i < smallerLength; i++) {
                const check = compare(left[i], right[i]);
                if (check < 0) {
                    return -1;
                } else if (check > 0) {
                    return 1;
                }
            }

            console.log(`Arrays are of different lengths...`);
            if (left.length < right.length) {
                console.log(`Left is shorter, order is correct`);
                return -1;
            } else if (left.length === right.length) {
                console.log(`Arrays are identical, order is correct`);
                return 0;
            } else {
                console.log(`Right is shorter, order is incorrect`);
                return 1;
            }
        }
    }
}

lineReader.on('line', (line) => {
    if (line.length > 0) {
        packets.push(JSON.parse(line));
    }
}).on('close', () => {
    packets.sort(compare);
    console.log(`=================`);
    console.log(`The final order is:\n`);
    packets.forEach((packet) => {
        console.log(`${JSON.stringify(packet)}\n`);
    });
    
    const indexOfTwo = packets.indexOf(two) + 1;
    const indexOfSix = packets.indexOf(six) + 1;
    
    console.log(`The decoder key is ${indexOfTwo * indexOfSix}`);
});