import { describe, expect, test } from '@jest/globals';
import { PuzzlePiece } from './12.1.logic';

describe('Day 12 - Part 1', () => {
    describe(`PuzzlePiece`, () => {
        describe(`Constructor`, () => {
            test(`should set the id and shape`, () => {
                const puzzlePiece = new PuzzlePiece('1', ['#', '#', '#', '#']);
                expect(puzzlePiece.id).toBe('1');
                expect(puzzlePiece.shape).toEqual(['#', '#', '#', '#']);
            });
        });

        describe(`When getShape is called...`, () => {
            test(`should return the shape`, () => {
                const puzzlePiece = new PuzzlePiece('1', ['#', '#', '#', '#']);
                expect(puzzlePiece.getShape()).toEqual(['#', '#', '#', '#']);
            });
        });

        describe(`When setShape is called...`, () => {
            test(`should set the shape`, () => {
                const puzzlePiece = new PuzzlePiece('1', ['#', '#', '#', '#']);
                puzzlePiece.setShape(['#', '#', '#', '.']);
                expect(puzzlePiece.shape).toEqual(['#', '#', '#', '.']);
            });
        });

        describe(`When getID is called...`, () => {
            test(`should return the id`, () => {
                const puzzlePiece = new PuzzlePiece('1', ['#', '#', '#', '#']);
                expect(puzzlePiece.getID()).toBe('1');
            });
        });

        describe(`When area is called...`, () => {
            test(`should return the area`, () => {
                const puzzlePiece = new PuzzlePiece('1', ['#', '#', '#', '#']);
                expect(puzzlePiece.area()).toBe(4);
            });

            test(`should return the area of a shape with a hole`, () => {
                const puzzlePiece = new PuzzlePiece('1', ['#', '#', '#', '#', '.', '#', '#', '#', '#']);
                expect(puzzlePiece.area()).toBe(8);
            });
        });

        describe(`When rotate is called...`, () => {
            test(`should rotate the shape 90 degrees clockwise`, () => {
                const puzzlePiece = new PuzzlePiece('1', ['###', '#..', '###']);
                puzzlePiece.rotate();
                expect(puzzlePiece.shape).toEqual(['###', '#.#', '#.#']);
                puzzlePiece.rotate();
                expect(puzzlePiece.shape).toEqual(['###', '..#', '###']);
                puzzlePiece.rotate();
                expect(puzzlePiece.shape).toEqual(['#.#', '#.#', '###']);
                puzzlePiece.rotate();
                expect(puzzlePiece.shape).toEqual(['###', '#..', '###']);
            });
        });
    });
});