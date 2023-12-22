export class WorkflowStage {
    attribute: string = '';
    comparator: string = '';
    value: number = 0;
    destination: string = '';

    constructor(input: string) {
        if (input.indexOf('!!') === 0) {
            const attribute = input.substring(2, 3);
            const comparator = input.substring(3, 5);
            const value = parseInt(input.substring(5));

            this.attribute = attribute;
            this.comparator = comparator;
            this.value = value;
            this.destination = '';
        } else {
            const [test, destination] = input.split(':');
            const attribute = test.substring(0, 1);
            const comparator = test.substring(1, 2);
            const value = parseInt(test.substring(2));

            this.attribute = attribute;
            this.comparator = comparator;
            this.value = value;
            this.destination = destination;
        }
    }

    generateInverted = (): WorkflowStage => {
        return new WorkflowStage(`!!${this.attribute}${this.comparator === '>' ? '<=' : '>='}${this.value}`);
    }

    isDestinationAccepted = (): boolean => {
        return this.destination === 'A';
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

    generatePathsToAccepted = (workflows: { [id: string]: Workflow }): WorkflowStage[][] => {
        let paths: WorkflowStage[][] = [];
        
        console.log(`Generating paths for workflow ${this.id}`);

        this.stages.forEach((stage, index) => {
            if (stage.destination === 'R') {
                // Do nothing
            } else if (index === 0 && stage.destination === 'A') {
                paths.push([stage]);
            } else if (index < this.stages.length) {
                if (stage.destination === 'A') {
                    // Add a fully inverted path
                    let invertedPath: WorkflowStage[] = [];
                    for (let i = 0; i < index; i++) {
                        invertedPath.push(this.stages[i].generateInverted());
                    }
                    paths.push([...invertedPath, stage]);
                } else {
                    // Continue down the path looking for accepted routes
                    const childPaths = workflows[stage.destination].generatePathsToAccepted(workflows);
                    childPaths.forEach((childPath) => {
                        paths.push([stage, ...childPath]);                        
                    });
                }
            }
        });

        // Evaluate the default path
        if (this.defaultDestination === 'R') {
            // Do nothing
        } else if (this.defaultDestination === 'A') {
            // Add a fully inverted path
            let invertedPath: WorkflowStage[] = [];
            for (let i = 0; i < this.stages.length; i++) {
                invertedPath.push(this.stages[i].generateInverted());
            }
            paths.push([...invertedPath]);
        } else {
            // Add a fully inverted path and keep going
            const childPaths = workflows[this.defaultDestination].generatePathsToAccepted(workflows);
            childPaths.forEach((childPath) => {
                // Add inverted paths
                let invertedPath: WorkflowStage[] = [];
                for (let i = 0; i < this.stages.length; i++) {
                    invertedPath.push(this.stages[i].generateInverted());
                }
                paths.push([...invertedPath, ...childPath]);
            });
        }

        return paths;
    }
}

interface ValidChunks {
    x: number[];
    m: number[];
    a: number[];
    s: number[];
    count: number;
}

export const countValidPartsForPaths = (paths: WorkflowStage[][]): ValidChunks[] => {
    const rval: ValidChunks[] = [];

    paths.forEach((path, index) => {
        const validChunks: ValidChunks = {
            x: [],
            m: [],
            a: [],
            s: [],
            count: 0
        };

        for (let i = 1; i <= 4000; i++) {
            validChunks.x.push(i);
            validChunks.m.push(i);
            validChunks.a.push(i);
            validChunks.s.push(i);
        }

        path.forEach((stage) => {
            const attribute = stage.attribute;
            const comparator = stage.comparator;
            const value = stage.value;

            switch (comparator) {
                case '>':
                    validChunks[attribute] = validChunks[attribute].filter((chunk) => chunk > value);
                    break;
                case '<':
                    validChunks[attribute] = validChunks[attribute].filter((chunk) => chunk < value);
                    break;
                case '>=':
                    validChunks[attribute] = validChunks[attribute].filter((chunk) => chunk >= value);
                    break;
                case '<=':
                    validChunks[attribute] = validChunks[attribute].filter((chunk) => chunk <= value);
                    break;
                case '==':
                    validChunks[attribute] = validChunks[attribute].filter((chunk) => chunk === value);
                    break;
                case '!=':
                    validChunks[attribute] = validChunks[attribute].filter((chunk) => chunk !== value);                
                    break;
                default:
                    break;
            }
        });

        validChunks.count = validChunks.x.length * validChunks.m.length * validChunks.a.length * validChunks.s.length;
        console.log(`Valid chunks for path ${index}: x: ${validChunks.x.length}  m:${validChunks.m.length}  a:${validChunks.a.length}  s:${validChunks.s.length}  count:${validChunks.count}`);

        rval.push(validChunks);        
    });

    return rval;
}