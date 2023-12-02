interface MinimumCounts {
    red: number;
    green: number;
    blue: number;
}

export const getMiniumCounts = (game: string): MinimumCounts => {
    let minCounts = {
        red: 0,
        green: 0,
        blue: 0
    };

    const noGameNumber = game.slice(game.indexOf(': ') + 2);
    const combos = noGameNumber.split('; ');

    combos.forEach((combo) => {
        let dice: string[] = [];

        if (combo.indexOf(', ') > -1) {
            dice = combo.split(', ');
        } else {
            dice = [combo];
        }

        dice.forEach((die) => {
            const [value, color] = die.split(' ');
            const intValue = parseInt(value, 10);

            if (intValue > minCounts[color]) {
                minCounts[color] = intValue;
            }
        });
    });

    return minCounts;
}

export const calculatePower = (counts: MinimumCounts): number => {
    return counts.red * counts.green * counts.blue;
}