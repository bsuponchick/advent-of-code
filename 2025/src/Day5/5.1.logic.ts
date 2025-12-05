export interface Range {
    start: number;
    end: number;
}

export class FreshnessDetector {
    public static isFresh(value: number,ranges: Range[]): boolean {
        return ranges.some((range) => value >= range.start && value <= range.end);
    }
}