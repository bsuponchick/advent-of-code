const cardStrengths = ['J', '2', '3', '4', '5', '6','7', '8', '9', 'T', 'Q', 'K', 'A'];
export enum Type {
    FiveOfAKind = 7,
    FourOfAKind = 6,
    FullHouse = 5,
    ThreeOfAKind = 4,
    TwoPairs = 3,
    OnePair = 2,
    HighCard = 1
}

export class Hand {
    cards: string = '';
    bid: number = 0;
    type: Type = Type.HighCard;

    constructor(cards: string, bid: number) {
        this.cards = cards;
        this.bid = bid;
        this.type = determineType(cards);
    }
}

export const determineType = (cards: string): Type => {
    const individualCards: string[] = cards.split('');
    
    const matches: { [key: string]: number } = {};

    individualCards.forEach((card) => {
        if (matches[card]) {
            matches[card]++;
        } else {
            matches[card] = 1;
        }
    });

    const matchValues = Object.values(matches);

    let rawType = Type.HighCard;

    if (matchValues.includes(5)) {
        return Type.FiveOfAKind;
    } else if (matchValues.includes(4)) {
        rawType = Type.FourOfAKind;
    } else if (matchValues.includes(3) && matchValues.includes(2)) {
        rawType = Type.FullHouse;
    } else if (matchValues.includes(3)) {
        rawType = Type.ThreeOfAKind;
    } else if (matchValues.filter((value) => value === 2).length === 2) {
        rawType = Type.TwoPairs;
    } else if (matchValues.includes(2)) {
        rawType = Type.OnePair;
    } else {
        rawType = Type.HighCard;
    }

    if (matches['J'] && matches['J'] > 0) {
        if (rawType === Type.FourOfAKind) {
            return Type.FiveOfAKind;
        } else if (rawType === Type.ThreeOfAKind) {
            if (matches['J'] === 1) {
                return Type.FourOfAKind;
            } else {
                // I have 3 Jokers and 2 other cards                
                return Type.FourOfAKind;
            }
        } else if (rawType === Type.TwoPairs) {
            if (matches['J'] === 1) {
                return Type.FullHouse;
            } else {
                return Type.FourOfAKind;
            }
        } else if (rawType === Type.OnePair) {
            return Type.ThreeOfAKind
        } else if (rawType === Type.HighCard) {
            return Type.OnePair;
        } else if (rawType === Type.FullHouse) {
            return Type.FiveOfAKind;
        }
    }

    return rawType;
}

export const HandComparator = (a: Hand, b: Hand): number => {
    if (a.type > b.type) {
        return 1;
    } else if (a.type < b.type) {
        return -1;
    } else {
        const aCards = a.cards.split('');
        const bCards = b.cards.split('');

        const aCardStrengths = aCards.map((card) => cardStrengths.indexOf(card));
        const bCardStrengths = bCards.map((card) => cardStrengths.indexOf(card));

        let rval = 0;

        for (let i = 0; i < aCardStrengths.length; i++) {
            if (aCardStrengths[i] > bCardStrengths[i]) {
                rval = 1;
                break;
            } else if (aCardStrengths[i] < bCardStrengths[i]) {
                rval = -1;
                break;
            }
        }

        return rval;
    }
};