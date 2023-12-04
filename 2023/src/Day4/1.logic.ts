export class Scratchcard {
    winningNumbers: number[] = [];
    scratchcardNumbers: number[] = [];
    copies: number = 0;

    constructor(winningNumbers: number[], scratchcardNumbers: number[]) {
        this.winningNumbers = winningNumbers;
        this.scratchcardNumbers = scratchcardNumbers;
        this.copies = 1;
    }

    getMatchingNumbers(): number[] {
        return this.scratchcardNumbers.filter((number) => this.winningNumbers.includes(number));
    }

    calculatePoints(): number {
        const matchingNumbers = this.getMatchingNumbers();

        if (matchingNumbers.length === 0) {
            return 0;
        } else {
            return Math.pow(2, matchingNumbers.length - 1);
        }
    }

    addNumberOfCopies(numberOfCopies: number): void {
        this.copies += numberOfCopies;
    }
}