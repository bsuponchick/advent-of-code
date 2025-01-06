export class TowelOrganizer {
    towels: string[] = [];

    constructor() {
        this.towels = [];
    }

    addTowel(towel: string) {
        this.towels.push(towel);
    }

    determineIfPatternIsPossible(pattern: string): boolean {
        if (pattern === '') {
            return true;
        }

        let patternsToTest = [];
        let possibleTowels = this.towels.filter(towel => pattern.indexOf(towel) !== -1);
        
        if (possibleTowels.length === 0) {
            return false;
        }

        for (let i = 0; i < possibleTowels.length; i++) {
            let towel = possibleTowels[i];
            let index = pattern.indexOf(towel);

            if (index === 0) {
                patternsToTest.push(pattern.slice(towel.length));
            }
        }

        if (patternsToTest.length === 0) {
            return false;
        } else {
            for (let i = 0; i < patternsToTest.length; i++) {
                if (this.determineIfPatternIsPossible(patternsToTest[i])) {
                    return true;
                }
            }
            return false;
        }
    }
}