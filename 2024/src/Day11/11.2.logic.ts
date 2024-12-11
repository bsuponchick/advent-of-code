export class Stone {
    engraving: number;
    cache: Map<number, Map<number, number>>;

    constructor(engraving: number, cache: Map<number, Map<number, number>>) {
        this.engraving = engraving;
        this.cache = cache;
    }

    transformXTimes(times: number): number {
        // If this is the last time, return 1 for the current stone
        if (times === 0) {
            console.log(`Returning 1 for ${this.engraving}`);
            return 1;
        }

        if (this.cache.has(this.engraving) === false) {
            this.cache.set(this.engraving, new Map());
        }

        // Check the cache to see if we've already transformed a matching stone X number of times.  If so, return the cached value
        if (this.cache.has(this.engraving) && this.cache.get(this.engraving).has(times)) {
            console.log(`Returning ${this.cache.get(this.engraving).get(times)} for ${this.engraving}`);
            return this.cache.get(this.engraving).get(times);
        } else {
            let newStones = this.transform();
            let total = 0;

            newStones.forEach((stone) => {
                total += stone.transformXTimes(times - 1);
            });

            this.cache.get(this.engraving).set(times, total);
            return total;
        }
    }

    transform(): Stone[] {
        if (this.engraving === 0) {
            return [new Stone(1, this.cache)];
        } else if (`${this.engraving}`.length % 2 === 0) {
            let half = `${this.engraving}`.length / 2;
            let left = parseInt(`${this.engraving}`.slice(0, half), 10);
            let right = parseInt(`${this.engraving}`.slice(half), 10);

            return [new Stone(left, this.cache), new Stone(right, this.cache)];
        } else {
            return [new Stone(this.engraving * 2024, this.cache)];
        }
    }
}