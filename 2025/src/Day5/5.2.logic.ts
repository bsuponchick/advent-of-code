export interface Range {
    start: number;
    end: number;
}

export class SetUnionizer {
    public static reduceRanges(ranges: Range[]): Range[] {
        const reducedRanges: Range[] = [];

        ranges.forEach((range) => {
            if (this.areOverlapsInRanges([...reducedRanges, range])) {
                // There are overlaps, find them and expand the first range to include the overlaps
                const overlappingRange = this.getFirstOverlappingRange(reducedRanges, range);
                
                if (overlappingRange) {
                    console.log(`Overlaps detected, expanding range ${reducedRanges.indexOf(overlappingRange) + 1}: ${JSON.stringify(overlappingRange)} to include range ${reducedRanges.length + 1}: ${JSON.stringify(range)}`);
                    overlappingRange.start = Math.min(overlappingRange.start, range.start);
                    overlappingRange.end = Math.max(overlappingRange.end, range.end);
                }
            } else {
                // There are no overlaps, so add the range to the reduced ranges
                console.log(`No overlaps detected, adding range ${reducedRanges.length + 1}: ${JSON.stringify(range)} to reduced ranges`);
                reducedRanges.push(range);
            }
        });

        console.log(`==============================================`);
        console.log(`Reduced ranges: ${JSON.stringify(reducedRanges)}`);
        console.log(`==============================================`);

        // If there are still overlaps, reduce the ranges again
        if (this.areOverlapsInRanges(reducedRanges)) {
            console.log(`Overlaps still detected in ranges, reducing again...`);
            return this.reduceRanges(reducedRanges);
        }

        return reducedRanges;
    }

    public static areOverlapsInRanges(ranges: Range[]): boolean {
        return ranges.some((r) => {
            return ranges.some((r2) => {
                if (r === r2) {
                    return false;
                } else if (r.start <= r2.end && r.start >= r2.start) {
                    console.log(`Overlap Option 1 detected between ${JSON.stringify(r)} and ${JSON.stringify(r2)}`);
                    return true;
                } else if (r.end >= r2.start && r.end <= r2.end) {
                    console.log(`Overlap Option 2 detected between ${JSON.stringify(r)} and ${JSON.stringify(r2)}`);
                    return true;
                } else {
                    return false;
                }
            })
        });
    }

    public static getFirstOverlappingRange(ranges: Range[], targetRange: Range): Range | undefined {
        return ranges.find((r) => {
            return (r.start <= targetRange.end && r.start >= targetRange.start) || (r.end >= targetRange.start && r.end <= targetRange.end);
        });
    }

    public static countUniqueItemsInRanges(ranges: Range[]): number {
        const reducedRanges = this.reduceRanges(ranges);
        let count = 0;
        reducedRanges.forEach((r) => {
            count += (r.end - r.start + 1);
        });
        return count;
    }
}