export class Part {
    x: number = 0;
    m: number = 0;
    a: number = 0;
    s: number = 0;

    constructor(input: string) {
        const parts = input.replace('{', '').replace('}', '').split(',');
        parts.forEach(part => {
            const [key, value] = part.split('=');
            this[key] = parseInt(value, 10);
        });
    }

    calculateRating = (): number => {
        return this.x + this.m + this.a + this.s;
    }
}

export class WorkflowStage {
    attribute: string = '';
    comparator: string = '';
    value: number = 0;
    destination: string = '';

    constructor(input: string) {
        const [test, destination] = input.split(':');
        const attribute = test.substring(0, 1);
        const comparator = test.substring(1, 2);
        const value = parseInt(test.substring(2));

        this.attribute = attribute;
        this.comparator = comparator;
        this.value = value;
        this.destination = destination;
    }

    matches = (part: Part): boolean => {
        let matches = false;

        // Not sure if we'll need all these, but adding them for now just in case...
        switch (this.comparator) {
            case '>':
                matches = part[this.attribute] > this.value;
                break;
            case '<':
                matches = part[this.attribute] < this.value;
                break;
            case '>=':
                matches = part[this.attribute] >= this.value;
                break;
            case '<=':
                matches = part[this.attribute] <= this.value;
                break;
            case '==':
                matches = part[this.attribute] === this.value;
                break;
            case '!=':
                matches = part[this.attribute] !== this.value;
                break;
            default:
                break;
        }

        return matches;
    }
}

export class Workflow {
    id: string = '';
    stages: WorkflowStage[] = [];
    defaultDestination: string = '';
    
    constructor(input: string) {
        this.id = input.substring(0, input.indexOf('{')).trim();

        const stages = input.substring(input.indexOf('{') + 1, input.indexOf('}')).trim();
        const stageInputs = stages.split(',');

        stageInputs.forEach((stageInput, index) => {
            if (index < stageInputs.length - 1) {
                this.stages.push(new WorkflowStage(stageInput.trim()));
            } else {
                this.defaultDestination = stageInput.trim();
            }
        });
    }

    execute = (part: Part): string => {
        let destination = this.defaultDestination;

        for (let i = 0; i < this.stages.length; i++) {
            const stage = this.stages[i];
            if (stage.matches(part)) {
                destination = stage.destination;
                break;
            }
        }

        return destination;
    }
}