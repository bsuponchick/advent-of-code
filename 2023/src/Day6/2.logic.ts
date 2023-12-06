import { calculateDistance } from "./1.logic";

export const determineWaysToWin = (time: number, distanceNeeded: number) => {
    const minimumTimeCharging = determineMinumumTime(distanceNeeded, time);
    const maximumTimeCharging = determineMaximumTime(distanceNeeded, time);

    const countWaysToWin = maximumTimeCharging - minimumTimeCharging + 1;
    return countWaysToWin;
}

export const determineMinumumTime = (distanceNeeded: number, limit: number) => {
    let minTime = 0;

    if (distanceNeeded === 0) {
        return 0;
    }

    for (let i = 0; i <= limit; i++) {
        const distance = calculateDistance(i, limit);

        if (distance > distanceNeeded) {
            minTime = i;
            break;
        }
    }

    return minTime;
}

export const determineMaximumTime = (distanceNeeded: number, limit: number) => {
    let maxTime = 0;

    if (distanceNeeded === 0) {
        return limit;
    }

    for (let i = limit; i >= 0; i--) {
        const distance = calculateDistance(i, limit);

        if (distance > distanceNeeded) {
            maxTime = i;
            break;
        }
    }

    return maxTime;
}