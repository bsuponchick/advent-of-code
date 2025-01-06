export class TowelOrganizer {
    towels: string[] = [];
    cache: { [key: string]: number } = {};

    constructor() {
        this.towels = [];
    }

    addTowel(towel: string) {
        this.towels.push(towel);
    }

    countPossiblePathsToPattern(pattern: string): number {
        let countOfPossiblePatterns = 0;

        if (pattern === '') {
            return 1;
        } else if (this.cache[pattern] !== undefined) {
            return this.cache[pattern];
        }

        let patternsToTest = [];
        let possibleTowels = this.towels.filter(towel => pattern.indexOf(towel) !== -1);
        
        if (possibleTowels.length === 0) {
            this.cache[pattern] = 0;
            return 0;
        }

        for (let i = 0; i < possibleTowels.length; i++) {
            let towel = possibleTowels[i];
            let index = pattern.indexOf(towel);

            if (index === 0) {
                patternsToTest.push(pattern.slice(towel.length));
            }
        }

        if (patternsToTest.length === 0) {
            this.cache[pattern] = 0;
            return 0;
        } else {
            for (let i = 0; i < patternsToTest.length; i++) {
                const result = this.countPossiblePathsToPattern(patternsToTest[i]);
                this.cache[patternsToTest[i]] = result;
                countOfPossiblePatterns += result;
            }
            return countOfPossiblePatterns;
        }
    }
}