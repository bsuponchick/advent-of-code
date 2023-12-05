export class Range {
    sourceRangeStart: number = 0;
    destinationRangeStart: number = 0;
    rangeLength: number = 0;

    constructor(sourceRangeStart: number, destinationRangeStart: number, rangeLength: number) {
        this.sourceRangeStart = sourceRangeStart;
        this.destinationRangeStart = destinationRangeStart;
        this.rangeLength = rangeLength;
    }

    getDestinationRangeEnd(): number {
        return this.destinationRangeStart + this.rangeLength - 1;
    }

    getSourceRangeEnd(): number {
        return this.sourceRangeStart + this.rangeLength - 1;
    }

    getDestinationForSource(source: number): number {
        if (this.isSourceInRange(source) === false) {
            throw new Error(`Source ${source} is not in range ${this.sourceRangeStart}-${this.getSourceRangeEnd()}`);
        } else {
            return source - this.sourceRangeStart + this.destinationRangeStart;
        }
    }

    isSourceInRange(number: number): boolean {
        return number >= this.sourceRangeStart && number <= this.getSourceRangeEnd();
    }
}

export const getDestinationForSource = (ranges: Range[], source: number): number => {
    const range = ranges.find(range => range.isSourceInRange(source));

    if (range === undefined) {
        return source;
    } else {
        return range.getDestinationForSource(source);
    }
}