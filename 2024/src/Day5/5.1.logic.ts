export class Rule {
    firstPageNumber: number;
    secondPageNumber: number;

    constructor(firstPageNumber: number, secondPageNumber: number) {
        this.firstPageNumber = firstPageNumber;
        this.secondPageNumber = secondPageNumber;
    }
}

export class PotentialUpdate {
    pageNumbers: number[];

    constructor(pageNumbers: number[]) {
        this.pageNumbers = pageNumbers;
    }

    determineIfValid(rules: Rule[]): boolean {
        let valid = true;
        
        rules.forEach((rule) => {
            let indexOfFirstPageNumber = this.pageNumbers.indexOf(rule.firstPageNumber);
            let indexOfSecondPageNumber = this.pageNumbers.indexOf(rule.secondPageNumber);

            if (indexOfFirstPageNumber === -1 || indexOfSecondPageNumber === -1) {
                // Ignore this rule
            } else {
                if (indexOfFirstPageNumber > indexOfSecondPageNumber) {
                    valid = false;
                }
            }
        });

        return valid;
    }

    getMiddlePageNumber(): number {
        const middleIndex = Math.floor(this.pageNumbers.length / 2);
        return this.pageNumbers[middleIndex];
    }
}

export const parseRule = (rule: string): Rule => {
    const [firstPageNumber, secondPageNumber] = rule.split('|').map(Number);
    return new Rule(firstPageNumber, secondPageNumber);
}

export const parsePotentialUpdate = (potentialUpdate: string): PotentialUpdate => {
    const pageNumbers = potentialUpdate.split(',').map(Number);
    return new PotentialUpdate(pageNumbers);
}