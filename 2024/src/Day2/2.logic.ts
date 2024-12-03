export class Report {
    id: number;
    levels: number[] = [];
    retried: boolean = false;

    public constructor(id: number, levels: number[]) {
        this.id = id;
        this.levels = levels;
    }

    public determineIfSafe(): boolean {
        console.log(`Testing id (${this.id}) with ${JSON.stringify(this.levels)}`);
        const firstUnsafeIndex = this.determineFirstUnsafeIndex(this.levels);
        
        if (firstUnsafeIndex > -1) {
            console.log(`Testing permutations to find any safe combination.`);

            for (let i = 0; i < this.levels.length; i++) {
                const splicedLevels = [...this.levels];
                splicedLevels.splice(i, 1);

                console.log(`Re-testing with ${JSON.stringify(splicedLevels)}`);
                const nextUnsafeIndex = this.determineFirstUnsafeIndex(splicedLevels);

                if (nextUnsafeIndex > -1) {
                    console.log(`Testing with ${JSON.stringify(splicedLevels)} failed.`);
                } else {
                    console.log(`Testing with ${JSON.stringify(splicedLevels)} passed.`);
                    return true;
                }
            }

            return false;
        } else {
            return true;
        }
    }

    private determineFirstUnsafeIndex(levels: number[]): number {
        if (levels[0] < levels[1]) {
            // All levels should be decreasing
            for (let i = 0; i < levels.length - 1; i++) {
                if (levels[i] >= levels[i + 1]) {
                    return i + 1;
                } else if (Math.abs(levels[i] - levels[i + 1]) > 3) {
                    return i + 1;
                }
            }
        } else {
            // All levels should be increasing
            for (let i = 0; i < levels.length - 1; i++) {
                if (levels[i] <= levels[i + 1]) {
                    return i + 1;
                } else if (Math.abs(levels[i] - levels[i + 1]) > 3) {
                    return i + 1;
                }
            }
        }

        return -1;
    }

    public retry(indexToRemove: number): boolean {
        this.retried = true;
        this.levels = this.levels.splice(indexToRemove, 1);
        return this.determineIfSafe();
    }
}