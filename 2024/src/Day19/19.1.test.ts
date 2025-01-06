import { TowelOrganizer } from './19.1.logic';
import { describe, expect, test } from '@jest/globals';

describe('Day 19 - Part 1', () => {
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

        describe(`determineIfPatternIsPossible`, () => {
            test(`should return true when a simple pattern is possible`, () => {
                const organizer = new TowelOrganizer();
                organizer.addTowel('a');
                organizer.addTowel('b');
                organizer.addTowel('c');
                expect(organizer.determineIfPatternIsPossible('abc')).toBe(true);
            });

            test(`should return false when a simple pattern is not possible`, () => {
                const organizer = new TowelOrganizer();
                organizer.addTowel('a');
                organizer.addTowel('b');
                organizer.addTowel('c');
                expect(organizer.determineIfPatternIsPossible('def')).toBe(false);
            });

            test(`should return false when only the first part of a pattern is possible`, () => {
                const organizer = new TowelOrganizer();
                organizer.addTowel('a');
                organizer.addTowel('b');
                organizer.addTowel('c');
                expect(organizer.determineIfPatternIsPossible('abz')).toBe(false);
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

                expect(organizer.determineIfPatternIsPossible('brwrr')).toBe(true);
                expect(organizer.determineIfPatternIsPossible('bggr')).toBe(true);
                expect(organizer.determineIfPatternIsPossible('gbbr')).toBe(true);
                expect(organizer.determineIfPatternIsPossible('rrbgbr')).toBe(true);
                expect(organizer.determineIfPatternIsPossible('ubwu')).toBe(false);
                expect(organizer.determineIfPatternIsPossible('bwurrg')).toBe(true);
                expect(organizer.determineIfPatternIsPossible('brgr')).toBe(true);
                expect(organizer.determineIfPatternIsPossible('bbrgwb')).toBe(false);
            });
        });
    });
});