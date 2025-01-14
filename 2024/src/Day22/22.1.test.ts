import { mix, prune, evolve, getXthEvolution } from './22.1.logic';
import { describe, expect, test } from '@jest/globals';

describe('Day 22 - Part 1', () => {
    describe(`mix()`, () => {
        test(`Should return 37 when the secret is 42 and the value is 15`, () => {
            expect(mix(15n, 42n)).toBe(37n);
        });
    });

    describe(`prune()`, () => {
        test(`Should return 16113920 when the secret is 100000000`, () => {
            expect(prune(100000000n)).toBe(16113920n);
        });
    });

    describe(`evolve()`, () => {
        test(`Should return the proper values for the sample input`, () => {
            expect(evolve(123n)).toBe(15887950n);
            expect(evolve(15887950n)).toBe(16495136n);
            expect(evolve(16495136n)).toBe(527345n);
            expect(evolve(527345n)).toBe(704524n);
            expect(evolve(704524n)).toBe(1553684n);
            expect(evolve(1553684n)).toBe(12683156n);
            expect(evolve(12683156n)).toBe(11100544n);
            expect(evolve(11100544n)).toBe(12249484n);
            expect(evolve(12249484n)).toBe(7753432n);
            expect(evolve(7753432n)).toBe(5908254n);
        });
    });

    describe(`getXthEvolution()`, () => {
        test(`Should return the proper values for the sample input`, () => {
            let evolutionCache: Map<bigint, bigint> = new Map();
            expect(getXthEvolution(1n, 2000, evolutionCache)).toBe(8685429n);
            expect(getXthEvolution(10n, 2000, evolutionCache)).toBe(4700978n);
            expect(getXthEvolution(100n, 2000, evolutionCache)).toBe(15273692n);
            expect(getXthEvolution(2024n, 2000, evolutionCache)).toBe(8667524n);
        });
    });
});