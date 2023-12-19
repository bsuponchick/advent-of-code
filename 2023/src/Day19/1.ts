import { Workflow, Part } from "./1.logic";

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const workflows: { [id: string]: Workflow } = {};
const workflowInputs: string[] = [];
const parts: Part[] = [];
const acceptedParts: Part[] = [];
const rejectedParts: Part[] = [];

const execute = () => {
    workflowInputs.forEach((workflowInput) => {
        const workflow = new Workflow(workflowInput);
        workflows[workflow.id] = workflow;
    });

    parts.forEach((part, index) => {
        let currentWorkflow = workflows['in'];
        let nextStep = currentWorkflow.execute(part);

        if (debug) {
            console.log(`Part ${index} is ${nextStep}`);
        }
        
        while ((nextStep !== 'A') && (nextStep !== 'R')) {
            currentWorkflow = workflows[nextStep];

            if (!currentWorkflow) {
                throw new Error(`Workflow ${nextStep} does not exist!`);
            }

            nextStep = currentWorkflow.execute(part);
        }

        if (nextStep === 'A') {
            acceptedParts.push(part);
        } else {
            rejectedParts.push(part);
        }
    });

    console.log(`Accepted: ${acceptedParts.length}`);
    console.log(`Rejected: ${rejectedParts.length}`);

    const sumOfRatings = acceptedParts.reduce((sum, part) => {
        return sum + part.calculateRating();
    }, 0);

    console.log(`Sum of ratings: ${sumOfRatings}`);
};

const parseLine = (line: string) => {
    if (line.indexOf('{') === 0) {
        parts.push(new Part(line));
    } else if (line.indexOf('{') !== -1) {
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