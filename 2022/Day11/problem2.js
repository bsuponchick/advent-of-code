class Monkey {
    constructor (params) {
        this.items = params.items;
        this.operation = params.operation;
        this.test = params.test;
        this.inspections = 0;
        this.number = params.number;
    }

    inspectItems = () => {
        if (this.items.length > 0) {
            [...this.items].forEach((item) => {
                //console.log(`Monkey ${this.number} inspects an item with a worry level of ${item}`);
                this.inspections = this.inspections + 1;
                const recipient = this.test(item);
                const updatedWorryLevel = this.operation(item);
                this.throw(updatedWorryLevel, recipient);
            }, this);
        }
    }

    throw = (value, target) => {
        // console.log(`Item with worry level of ${value} is thrown to Monkey ${target} by Monkey ${this.number}`);
        this.items.shift();
        monkeys[target].catch(value);
    }

    catch = (value) => {
        // console.log(`Item with worry level of ${value} caught by Monkey ${this.number}`);
        this.items.push(value);
    }

    report = () => {
        console.log(`Monkey ${this.number}: ${JSON.stringify(this.items)}`);
    }

    reportInspections = () => {
        console.log(`Monkey ${this.number} inspected items ${this.inspections} times.`);
    }
}

const additiveModulo = (a, b, n) => {
    return ((a % n) + (b % n)) % n;
}

const multiplicativeModulo = (a, b, n) => {
    return ((a % n) * (b % n)) % n;
}

const exponentialModulo = (a) => {
    return a > 0 ? 0 : 1;
}

const monkeys = [
    new Monkey({
        items: [92,73,86,83,65,51,55,93],
        operation: (currentValue) => {
            const newValue = currentValue * 5;
            //console.log(`Worry level is multiplied by 5 to ${newValue}.`);
            return newValue;
        },
        test: (currentValue) => {
            return multiplicativeModulo(currentValue, 5, 11) === 0 ? 3 : 4;
            // if (currentValue % 11 === 0) {
            //     //console.log(`Current worry level is divisible by 11.`);
            //     return 3;
            // } else {
            //     //console.log(`Current worry level is not divisible by 11.`);
            //     return 4;
            // }
        },
        number: 0
    }),
    new Monkey({
        items: [99,67,62,61,59,98],
        operation: (currentValue) => {
            const newValue =  currentValue * currentValue;
            //console.log(`Worry level is multiplied by itself to ${newValue}.`);
            return newValue;
        },
        test: (currentValue) => {
            return exponentialModulo(currentValue) === 0 ? 6 : 7;
            // if (currentValue % 2 === 0) {
            //     //console.log(`Current worry level is divisible by 2.`);
            //     return 6;
            // } else {
            //     //console.log(`Current worry level is not divisible by 2.`);
            //     return 7;
            // }
        },
        number: 1
    }),
    new Monkey({
        items: [81,89,56,61,99],
        operation: (currentValue) => {
            const newValue = currentValue * 7;
            //console.log(`Worry level is multiplied by 7 to ${newValue}.`);
            return newValue;
        },
        test: (currentValue) => {
            if (currentValue % 5 === 0) {
                //console.log(`Current worry level is divisible by 5.`);
                return 1;
            } else {
                //console.log(`Current worry level is not divisible by 5.`);
                return 5;
            }
        },
        number: 2
    }),
    new Monkey({
        items: [97,74,68],
        operation: (currentValue) => {
            const newValue = currentValue + 1;
            //console.log(`Worry level is increased by 1 to ${newValue}.`);
            return newValue;
        },
        test: (currentValue) => {
            if (currentValue % 17 === 0) {
                //console.log(`Current worry level is divisible by 17.`);
                return 2;
            } else {
                //console.log(`Current worry level is not divisible by 17.`);
                return 5;
            }
        },
        number: 3
    }),
    new Monkey({
        items: [78,73],
        operation: (currentValue) => {
            const newValue = currentValue + 3;
            //console.log(`Worry level is increased by 3 to ${newValue}.`);
            return newValue;
        },
        test: (currentValue) => {
            if (currentValue % 19 === 0) {
                //console.log(`Current worry level is divisible by 19.`);
                return 2;
            } else {
                //console.log(`Current worry level is not divisible by 19.`);
                return 3;
            }
        },
        number: 4
    }),
    new Monkey({
        items: [50],
        operation: (currentValue) => {
            const newValue = currentValue + 5;
            //console.log(`Worry level is increased by 5 to ${newValue}.`);
            return newValue;
        },
        test: (currentValue) => {
            if (currentValue % 7 === 0) {
                //console.log(`Current worry level is divisible by 7.`);
                return 1;
            } else {
                //console.log(`Current worry level is not divisible by 7.`);
                return 6;
            }
        },
        number: 5
    }),
    new Monkey({
        items: [95,88,53,75],
        operation: (currentValue) => {
            const newValue = currentValue + 8;
            //console.log(`Worry level is increased by 8 to ${newValue}.`);
            return newValue;
        },
        test: (currentValue) => {
            if (currentValue % 3 === 0) {
                //console.log(`Current worry level is divisible by 3.`);
                return 0;
            } else {
                //console.log(`Current worry level is not divisible by 3.`);
                return 7;
            }
        },
        number: 6
    }),
    new Monkey({
        items: [50,77,98,85,94,56,89],
        operation: (currentValue) => {
            const newValue = currentValue + 2;
            //console.log(`Worry level is increased by 2 to ${newValue}.`);
            return newValue;
        },
        test: (currentValue) => {
            if (currentValue % 13 === 0) {
                //console.log(`Current worry level is divisible by 13.`);
                return 4;
            } else {
                //console.log(`Current worry level is not divisible by 13.`);
                return 0;
            }
        },
        number: 7
    }),
];

// const monkeys = [
//     new Monkey({
//         items: [79,98],
//         operation: (currentValue) => {
//             const newValue = currentValue * 19;
//             //console.log(`Worry level is multiplied by 5 to ${newValue}.`);
//             return newValue;
//         },
//         test: (currentValue) => {
//             if (currentValue % 23 === 0) {
//                 //console.log(`Current worry level is divisible by 11.`);
//                 return 2;
//             } else {
//                 //console.log(`Current worry level is not divisible by 11.`);
//                 return 3;
//             }
//         },
//         number: 0
//     }),
//     new Monkey({
//         items: [54,65,75,74],
//         operation: (currentValue) => {
//             const newValue =  currentValue + 6;
//             //console.log(`Worry level is multiplied by itself to ${newValue}.`);
//             return newValue;
//         },
//         test: (currentValue) => {
//             if (currentValue % 19 === 0) {
//                 //console.log(`Current worry level is divisible by 2.`);
//                 return 2;
//             } else {
//                 //console.log(`Current worry level is not divisible by 2.`);
//                 return 0;
//             }
//         },
//         number: 1
//     }),
//     new Monkey({
//         items: [79,60,97],
//         operation: (currentValue) => {
//             const newValue = currentValue * currentValue;
//             //console.log(`Worry level is multiplied by 7 to ${newValue}.`);
//             return newValue;
//         },
//         test: (currentValue) => {
//             if (currentValue % 13 === 0) {
//                 //console.log(`Current worry level is divisible by 5.`);
//                 return 1;
//             } else {
//                 //console.log(`Current worry level is not divisible by 5.`);
//                 return 3;
//             }
//         },
//         number: 2
//     }),
//     new Monkey({
//         items: [74],
//         operation: (currentValue) => {
//             const newValue = currentValue + 3;
//             //console.log(`Worry level is increased by 1 to ${newValue}.`);
//             return newValue;
//         },
//         test: (currentValue) => {
//             if (currentValue % 17 === 0) {
//                 //console.log(`Current worry level is divisible by 17.`);
//                 return 0;
//             } else {
//                 //console.log(`Current worry level is not divisible by 17.`);
//                 return 1;
//             }
//         },
//         number: 3
//     }),
// ];

for (let round = 0; round < 20; round++) {
    monkeys.forEach((monkey) => {
        monkey.inspectItems();
    });
}

console.log(`Inspection Report:`);
const inspectionCounts = [];
monkeys.forEach((monkey) => {
    monkey.report();
    monkey.reportInspections();
    inspectionCounts.push(monkey.inspections);
});

inspectionCounts.sort((a, b) => {
    if (a < b) {
        return 1;
    } else if (a > b) {
        return -1;
    } else {
        return 0;
    }
});

console.log(`Inspections were ${JSON.stringify(inspectionCounts)}`);

const monkeyBusiness = inspectionCounts[0] * inspectionCounts[1];

console.log(`Calculated Monkey Business: ${monkeyBusiness}`);