import { Computer } from './17.1.logic';
import { describe, expect, test } from '@jest/globals';

describe('Day 17 - Part 1', () => {
    describe(`Computer`, () => {
        describe(`constructor`, () => {
            test(`should properly initialize the computer`, () => {
                const computer = new Computer();
                expect(computer.aRegister).toBe(0);
                expect(computer.bRegister).toBe(0);
                expect(computer.cRegister).toBe(0);
                expect(computer.instructionPointer).toBe(0);
                expect(computer.outputs).toEqual([]);
            });
        });

        describe(`When setARegister is called`, () => {
            test(`should set the aRegister`, () => {
                const computer = new Computer();
                computer.setARegister(1);
                expect(computer.aRegister).toBe(1);
            });
        });

        describe(`When setBRegister is called`, () => {
            test(`should set the bRegister`, () => {
                const computer = new Computer();
                computer.setBRegister(1);
                expect(computer.bRegister).toBe(1);
            });
        });

        describe(`When setCRegister is called`, () => {
            test(`should set the cRegister`, () => {
                const computer = new Computer();
                computer.setCRegister(1);
                expect(computer.cRegister).toBe(1);
            });
        });

        describe(`When getComboValue is called...`, () => {
            test(`should return the value if it is 0, 1, 2, or 3`, () => {
                const computer = new Computer();
                expect(computer.getComboValue(0)).toBe(0);
                expect(computer.getComboValue(1)).toBe(1);
                expect(computer.getComboValue(2)).toBe(2);
                expect(computer.getComboValue(3)).toBe(3);
            });

            test(`should return the value of the aRegister if it is 4`, () => {
                const computer = new Computer();
                computer.setARegister(1);
                expect(computer.getComboValue(4)).toBe(1);
            });

            test(`should return the value of the bRegister if it is 5`, () => {
                const computer = new Computer();
                computer.setBRegister(2);
                expect(computer.getComboValue(5)).toBe(2);
            });

            test(`should return the value of the cRegister if it is 6`, () => {
                const computer = new Computer();
                computer.setCRegister(3);
                expect(computer.getComboValue(6)).toBe(3);
            });

            test(`should throw an error if it is anything else`, () => {
                const computer = new Computer();
                expect(() => computer.getComboValue(7)).toThrow();
            });
        });

        describe(`When advInstruction is called...`, () => {
            test(`should set the value of the aRegister to 1 if the operand is 0 and the aRegsiter is 1`, () => {
                const computer = new Computer();
                computer.setARegister(1);
                computer.advInstruction(0);
                expect(computer.aRegister).toBe(1);
            });

            test(`should set the value of the aRegister to 5 if the aRegister is 10 and the operand is 1`, () => {
                const computer = new Computer();
                computer.setARegister(10);
                computer.advInstruction(1);
                expect(computer.aRegister).toBe(5);
            });

            test(`should increment the instruction pointer by 2`, () => {
                const computer = new Computer();
                computer.advInstruction(0);
                expect(computer.instructionPointer).toBe(2);
            });
        });

        describe(`When bxlInstruction is called...`, () => {
            test(`should set the value of the bRegister to 6 if the bRegister is 5 and the operand is 3`, () => {
                const computer = new Computer();
                computer.setBRegister(5);
                computer.bxlInstruction(3);
                expect(computer.bRegister).toBe(6);
            });

            test(`should increment the instruction pointer by 2`, () => {
                const computer = new Computer();
                computer.bxlInstruction(3);
                expect(computer.instructionPointer).toBe(2);
            });
        });

        describe(`When bstInstruction is called...`, () => {
            test(`Should set the value of the bRegister to 2 if the operand is 4 and the value of the aRegister is 10`, () => {
                const computer = new Computer();
                computer.setARegister(10);
                computer.bstInstruction(4);
                expect(computer.bRegister).toBe(2);    
            });

            test(`Should increment the instruction pointer by 2`, () => {
                const computer = new Computer();
                computer.bstInstruction(3);
                expect(computer.instructionPointer).toBe(2);
            });
        });

        describe(`When jnzInstruction is called...`, () => {
            test(`Should set the instruction pointer to 4 if the aRegister's value is not 0 and the operand is 4`, () => {
                const computer = new Computer();
                computer.setARegister(1);
                computer.jnzInstruction(4);
                expect(computer.instructionPointer).toBe(4);    
            });

            test(`Should increment the instruction pointer by 2 if the aRegister's value is 0`, () => {
                const computer = new Computer();
                computer.jnzInstruction(4);
                expect(computer.instructionPointer).toBe(2);
            });
        });

        describe(`When bxcInstruction is called...`, () => {
            test(`Should set the value of the bRegister to 6 when the bRegister is 5 and the cRegister is 3`, () => {
                const computer = new Computer();
                computer.setBRegister(5);
                computer.setCRegister(3);
                computer.bxcInstruction();
                expect(computer.bRegister).toBe(6);
            });

            test(`Should increment the instruction pointer by 2`, () => {
                const computer = new Computer();
                computer.bxcInstruction();
                expect(computer.instructionPointer).toBe(2);
            });
        });

        describe(`When outInstruction is called...`, () => {
            test(`Should add the value 2 to the outputs array if the operand is 4 and the value in the aRegister is 10`, () => {
                const computer = new Computer();
                computer.setARegister(10);
                computer.outInstruction(4);
                expect(computer.outputs).toEqual([2]);
            });

            test(`Should increment the instruction pointer by 2`, () => {
                const computer = new Computer();
                computer.outInstruction(4);
                expect(computer.instructionPointer).toBe(2);
            });
        });

        describe(`When bdvInstruction is called...`, () => {
            test(`should set the value of the bRegister to 1 if the operand is 0 and the aRegsiter is 1`, () => {
                const computer = new Computer();
                computer.setARegister(1);
                computer.bdvInstruction(0);
                expect(computer.bRegister).toBe(1);
            });

            test(`should set the value of the bRegister to 5 if the aRegister is 10 and the operand is 1`, () => {
                const computer = new Computer();
                computer.setARegister(10);
                computer.bdvInstruction(1);
                expect(computer.bRegister).toBe(5);
            });

            test(`should increment the instruction pointer by 2`, () => {
                const computer = new Computer();
                computer.bdvInstruction(0);
                expect(computer.instructionPointer).toBe(2);
            });
        });

        describe(`When cdvInstruction is called...`, () => {
            test(`should set the value of the cRegister to 1 if the operand is 0 and the aRegsiter is 1`, () => {
                const computer = new Computer();
                computer.setARegister(1);
                computer.cdvInstruction(0);
                expect(computer.cRegister).toBe(1);
            });

            test(`should set the value of the cRegister to 5 if the aRegister is 10 and the operand is 1`, () => {
                const computer = new Computer();
                computer.setARegister(10);
                computer.cdvInstruction(1);
                expect(computer.cRegister).toBe(5);
            });

            test(`should increment the instruction pointer by 2`, () => {
                const computer = new Computer();
                computer.cdvInstruction(0);
                expect(computer.instructionPointer).toBe(2);
            });
        });

        describe(`When executeProgram is called...`, () => {
            test(`Should set the value of the bRegister to 1 if the cRegister contains 9 and the program is 2,6`, () => {
                const computer = new Computer();
                computer.setCRegister(9);
                computer.executeProgram([2, 6]);
                expect(computer.bRegister).toBe(1);
            });

            test(`Should set the outputs 0, 1, 2 if the aRegister defaults to thh value of 10 and the program is 5,0,5,1,5,4`, () => {
                const computer = new Computer();
                computer.setARegister(10);
                computer.executeProgram([5, 0, 5, 1, 5, 4]);
                expect(computer.outputs).toEqual([0, 1, 2]);
            });

            test(`Should set the outputs of 4,2,5,6,7,7,7,7,3,1,0 if the aRegister defaults to the value of 2024 and th eprogram is 0,1,5,4,3,0`, () => {
                const computer = new Computer();
                computer.setARegister(2024);
                computer.executeProgram([0, 1, 5, 4, 3, 0]);
                expect(computer.outputs).toEqual([4, 2, 5, 6, 7, 7, 7, 7, 3, 1, 0]);
            });

            test(`Should set the value of the bRegister to 26 if the bRegister defaults to 29 and the program is 1,7`, () => {
                const computer = new Computer();
                computer.setBRegister(29);
                computer.executeProgram([1, 7]);
                expect(computer.bRegister).toBe(26);
            });

            test(`Should set the value of the bRegister to 44354 if the bRegister defaults to 2024 and the cRegister defaults to 43690 and the program is 4,0`, () => {
                const computer = new Computer();
                computer.setBRegister(2024);
                computer.setCRegister(43690);
                computer.executeProgram([4, 0]);
                expect(computer.bRegister).toBe(44354);
            });
        });
    });
});