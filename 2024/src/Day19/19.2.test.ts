import { TowelOrganizer } from './19.2.logic';
import { describe, expect, test } from '@jest/globals';

describe('Day 19 - Part 2', () => {
    describe(`TowelOrganizer`, () => {
        describe(`constructor`, () => {
            test(`it should initialize the towels array`, () => {
                const organizer = new TowelOrganizer();
                expect(organizer.towels).toEqual([]);
            });
        });

        describe(`addTowel`, () => {
            test(`it should add a towel to the towels array`, () => {
                const organizer = new TowelOrganizer();
                organizer.addTowel('a');
                expect(organizer.towels).toEqual(['a']);
            });
        });

        describe(`countPossiblePathsToPattern`, () => {
            test(`should return 1 when a simple pattern is possible`, () => {
                const organizer = new TowelOrganizer();
                organizer.addTowel('a');
                organizer.addTowel('b');
                organizer.addTowel('c');
                expect(organizer.countPossiblePathsToPattern('abc')).toBe(1);
            });

            test(`should return 0 when a simple pattern is not possible`, () => {
                const organizer = new TowelOrganizer();
                organizer.addTowel('a');
                organizer.addTowel('b');
                organizer.addTowel('c');
                expect(organizer.countPossiblePathsToPattern('def')).toBe(0);
            });

            test(`should return 0 when only the first part of a pattern is possible`, () => {
                const organizer = new TowelOrganizer();
                organizer.addTowel('a');
                organizer.addTowel('b');
                organizer.addTowel('c');
                expect(organizer.countPossiblePathsToPattern('abz')).toBe(0);
            });

            test(`should properly evaluate the samples`, () => {
                const organizer = new TowelOrganizer();
                organizer.addTowel('r');
                organizer.addTowel('wr');
                organizer.addTowel('b');
                organizer.addTowel('g');
                organizer.addTowel('bwu');
                organizer.addTowel('rb');
                organizer.addTowel('gb');
                organizer.addTowel('br');

                expect(organizer.countPossiblePathsToPattern('brwrr')).toBe(2);
                expect(organizer.countPossiblePathsToPattern('bggr')).toBe(1);
                expect(organizer.countPossiblePathsToPattern('gbbr')).toBe(4);
                expect(organizer.countPossiblePathsToPattern('rrbgbr')).toBe(6);
                expect(organizer.countPossiblePathsToPattern('ubwu')).toBe(0);
                expect(organizer.countPossiblePathsToPattern('bwurrg')).toBe(1);
                expect(organizer.countPossiblePathsToPattern('brgr')).toBe(2);
                expect(organizer.countPossiblePathsToPattern('bbrgwb')).toBe(0);
            });
        });
    });
});