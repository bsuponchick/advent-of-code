import { describe, expect, test } from '@jest/globals';
import { Bot, Bin, Microchip } from './10.1.logic';

describe('Day 10 - Part 1', () => {
    describe(`Microchip...`, () => {
        describe(`Constructor`, () => {
            test(`should initialize the microchip correctly`, () => {
                const microchip = new Microchip(5);
                expect(microchip.value).toBe(5);
            });
        });
    });

    describe(`Bot...`, () => {
        describe(`Constructor`, () => {
            test(`should initialize the bot correctly`, () => {
                const bot = new Bot(1);
                expect(bot.id).toBe(1);
            });
        });

        describe(`When addMicrochip is called...`, () => {
            test(`should add the first microchip to the bot as its low`, () => {
                const bot = new Bot(1);
                const microchip = new Microchip(5);
                bot.addMicrochip(microchip);
                expect(bot.low).toBe(microchip);
            });

            test(`should add the second microchip to the bot as its high when its value is higher than its low chip`, () => {
                const bot = new Bot(1);
                const microchip1 = new Microchip(5);
                const microchip2 = new Microchip(10);
                bot.addMicrochip(microchip1);
                bot.addMicrochip(microchip2);
                expect(bot.high).toBe(microchip2);
            });
            
            test(`should add the second microchip to the bot as its low and move its low to its high when the second microchip is lower`, () => {
                const bot = new Bot(1);
                const microchip1 = new Microchip(10);
                const microchip2 = new Microchip(5);
                bot.addMicrochip(microchip1);
                bot.addMicrochip(microchip2);
                expect(bot.low).toBe(microchip2);
                expect(bot.high).toBe(microchip1);
            });

            test(`should add the microchips to the targets when the bot has targets and is full`, () => {
                const bot = new Bot(1);
                const lowTarget = new Bin(2);
                const highTarget = new Bin(3);

                bot.setLowTarget(lowTarget);
                bot.setHighTarget(highTarget);

                const microchip1 = new Microchip(10);
                const microchip2 = new Microchip(5);

                bot.addMicrochip(microchip1);
                bot.addMicrochip(microchip2);

                expect(lowTarget.microchips).toEqual([microchip2]);
                expect(highTarget.microchips).toEqual([microchip1]);

                expect(bot.low).toBeNull();
                expect(bot.high).toBeNull();
            });
        });

        describe(`When setLowTarget is called...`, () => {
            test(`should set the low target`, () => {
                const bot = new Bot(1);
                const target = new Bin(2);
                bot.setLowTarget(target);
                expect(bot.lowTarget).toBe(target);
            });
        });
        
        describe(`When setHighTarget is called...`, () => {
            test(`should set the high target`, () => {
                const bot = new Bot(1);
                const target = new Bin(2);
                bot.setHighTarget(target);
                expect(bot.highTarget).toBe(target);
            });
        });
        
        describe(`When getLowTarget is called...`, () => {
            test(`should return the low target`, () => {
                const bot = new Bot(1);
                const target = new Bin(2);
                bot.setLowTarget(target);
                expect(bot.getLowTarget()).toBe(target);
            });
        });
        
        describe(`When getHighTarget is called...`, () => {
            test(`should return the high target`, () => {
                const bot = new Bot(1);
                const target = new Bin(2);
                bot.setHighTarget(target);
                expect(bot.getHighTarget()).toBe(target);
            });
        });
    });

    describe(`Bin...`, () => {
        describe(`Constructor`, () => {
            test(`should initialize the bin correctly`, () => {
                const bin = new Bin(1);
                expect(bin.id).toBe(1);
            });
        });
    });

    describe(`When addMicrochip is called...`, () => {
        test(`should add the microchip to the bin`, () => {
            const bin = new Bin(1);
            const microchip = new Microchip(5);
            bin.addMicrochip(microchip);
            expect(bin.microchips).toEqual([microchip]);
        });
    });

    describe(`When getMicrochips is called...`, () => {
        test(`should return the microchips in the bin`, () => {
            const bin = new Bin(1);
            const microchip1 = new Microchip(5);
            const microchip2 = new Microchip(10);
            bin.addMicrochip(microchip1);
            bin.addMicrochip(microchip2);
            expect(bin.getMicrochips()).toEqual([microchip1, microchip2]);
        });
    });
});