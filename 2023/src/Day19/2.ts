import { Workflow, countValidPartsForPaths } from "./2.logic";

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const workflows: { [id: string]: Workflow } = {};
const workflowInputs: string[] = [];

const execute = () => {
    workflowInputs.forEach((workflowInput) => {
        const workflow = new Workflow(workflowInput);
        workflows[workflow.id] = workflow;
    });

    console.log(`There are ${Object.keys(workflows).length} workflows`);

    const entry = workflows['in'];
    const paths = entry.generatePathsToAccepted(workflows);

    console.log(`There are ${paths.length} paths`);
    paths.forEach((path, index) => {
        let pathString = '';

        path.forEach((stage) => {
            pathString += `${stage.attribute}${stage.comparator}${stage.value} `; 
        });

        console.log(`Path ${index}: ${pathString}`);
    });

    const validParts = countValidPartsForPaths(paths);
    
    let countValidParts = validParts.reduce((sum, validPart) => {
        return sum + (validPart.x.length * validPart.m.length * validPart.a.length * validPart.s.length);
    }, 0);

    let countOverlaps = 0;

    validParts.forEach((validPart, index) => {
        console.log(`Checking for duplicates parts on path ${index}`);
        for (let i = index + 1; i < validParts.length; i++) {
            const otherValidPart = validParts[i];
            const xOverlaps = validPart.x.filter((x) => otherValidPart.x.includes(x));
            const mOverlaps = validPart.m.filter((m) => otherValidPart.m.includes(m));
            const aOverlaps = validPart.a.filter((a) => otherValidPart.a.includes(a));
            const sOverlaps = validPart.s.filter((s) => otherValidPart.s.includes(s));

            if ((xOverlaps.length > 0) && (mOverlaps.length > 0) && (aOverlaps.length > 0) && (sOverlaps.length > 0)) {
                countOverlaps += (xOverlaps.length * mOverlaps.length * aOverlaps.length * sOverlaps.length);
            }
        }
    });

    console.log(`There are ${countValidParts} valid parts`);
    console.log(`There are ${countOverlaps} overlaps`);

    console.log(`There are ${countValidParts - countOverlaps} unique valid parts`);
};

const parseLine = (line: string) => {
    if (line.indexOf('{') !== 0) {
        workflowInputs.push(line);
    }
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test.txt' : './input.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export {};