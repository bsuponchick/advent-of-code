export const calculateDistance = (timeCharging: number, maxTime: number): number => {
    let velocity = timeCharging;

    if (maxTime === 0) {
        return 0;
    }

    return velocity * (maxTime - timeCharging);
}

export const determineWaysToWin = (time: number, distanceNeeded: number) => {
    let waysToWin = 0;

    for (let i = 0; i <= time; i++) {
        const distance = calculateDistance(i, time);

        if (distance > distanceNeeded) {
            waysToWin++;
        }
    }

    return waysToWin;
}