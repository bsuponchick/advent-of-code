var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./input.txt')
    //input: require('fs').createReadStream('./sample.txt')
});

const pairs = [[]];
const results = [];
let sum = 0;

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
    if (line.length === 0) {
        // End of pair
        pairs.push([]);
    } else {
        pairs[pairs.length - 1].push(JSON.parse(line));
    }
}).on('close', () => {
    pairs.forEach((pair, index) => {
        console.log(`== Pair ${index + 1} ==`);
        console.log(`Compare ${JSON.stringify(pair[0])} vs ${JSON.stringify(pair[1])}`);
        
        results.push(compare(pair[0], pair[1]));
    });

    console.log(`Results is ${JSON.stringify(results)}`);

    results.forEach((result, index) => {
        if (result < 1) {
            sum = sum + index + 1;
        }
    })

    console.log(`Sum of indices of packets in the right order is ${sum}`);
});