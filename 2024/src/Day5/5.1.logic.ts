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

    reorderPageNumbers(rules: Rule[]): void {
        let newPageNumbers: number[] = [];

        let rulesThatApplyToPages = rules.filter((rule) => {
            return this.pageNumbers.includes(rule.firstPageNumber) && this.pageNumbers.includes(rule.secondPageNumber);
        });

        let copyOfPageNumbers = [...this.pageNumbers];

        while (newPageNumbers.length < this.pageNumbers.length) {
            let nextPageNumber = this.findNextPageNumber(rulesThatApplyToPages, copyOfPageNumbers);
            newPageNumbers.push(nextPageNumber);
            copyOfPageNumbers = copyOfPageNumbers.filter((pageNumber) => pageNumber !== nextPageNumber);
            rulesThatApplyToPages = rulesThatApplyToPages.filter((rule) => rule.firstPageNumber !== nextPageNumber);
        }

        this.pageNumbers = newPageNumbers;

        console.log(`The proper order of this update is ${this.pageNumbers.join(',')}`);
    }

    findNextPageNumber(rules: Rule[], pageNumbers: number[]): number {
        for (let i = 0; i < pageNumbers.length; i++) {
            let countRulesWithPageNumberSecond = rules.filter((rule) => rule.secondPageNumber === pageNumbers[i]).length;
            if (countRulesWithPageNumberSecond === 0) {
                return pageNumbers[i];
            }
        }

        return -1;
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