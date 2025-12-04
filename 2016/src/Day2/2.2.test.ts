import { describe, expect, test } from '@jest/globals';
import { Button, Keypad } from './2.2.logic';

describe('Day 2 - Part 2', () => {
    describe(`Button...`, () => {
        describe(`constructor`, () => {
            test(`should create a button with the correct value`, () => {
                const button = new Button('1');
                expect(button.value).toBe('1');
                expect(button.up).toBeNull();
                expect(button.down).toBeNull();
                expect(button.left).toBeNull();
                expect(button.right).toBeNull();
            });
        });

        describe(`setUp`, () => {
            test(`should set the up button`, () => {
                const button = new Button('1');
                const upButton = new Button('2');
                button.setUp(upButton);
                expect(button.up).toBe(upButton);
            });
        });
        
        describe(`setDown`, () => {
            test(`should set the down button`, () => {
                const button = new Button('1');
                const downButton = new Button('2');
                button.setDown(downButton);
                expect(button.down).toBe(downButton);
            });
        });
        
        describe(`setLeft`, () => {
            test(`should set the left button`, () => {
                const button = new Button('1');
                const leftButton = new Button('2');
                button.setLeft(leftButton);
                expect(button.left).toBe(leftButton);
            });
        });
        
        describe(`setRight`, () => {
            test(`should set the right button`, () => {
                const button = new Button('1');
                const rightButton = new Button('2');
                button.setRight(rightButton);
                expect(button.right).toBe(rightButton);
            });
        });
        
        describe(`getValue`, () => {
            test(`should return the value of the button`, () => {
                const button = new Button('1');
                expect(button.getValue()).toBe('1');
            });
        });
    });

    describe(`Keypad...`, () => {
        describe(`constructor`, () => {
            test(`should create a keypad with the correct buttons`, () => {
                const keypad = new Keypad();
                expect(keypad.buttons.length).toBe(5);
                expect(keypad.currentButton.getValue()).toBe('5');
            });
        });

        describe(`When the setCurrentButton method is called...`, () => {
            test(`should set the current button`, () => {
                const keypad = new Keypad();
                keypad.setCurrentButton(keypad.buttons[0][0]);
                expect(keypad.currentButton).toBe(keypad.buttons[0][0]);
            });
        });

        describe(`When the getCurrentButton method is called...`, () => {
            test(`should return the current button`, () => {
                const keypad = new Keypad();
                expect(keypad.getCurrentButton().value).toBe('5');
            });
        });

        describe(`When the move method is called...`, () => {
            test(`should move the current button up if the direction is U`, () => {
                const keypad = new Keypad();
                keypad.setCurrentButton(keypad.buttons[2][2]);
                keypad.move('U');
                expect(keypad.currentButton).toBe(keypad.buttons[1][2]);
            });

            test(`should move the current button down if the direction is D`, () => {
                const keypad = new Keypad();
                keypad.setCurrentButton(keypad.buttons[2][2]);
                keypad.move('D');
                expect(keypad.currentButton).toBe(keypad.buttons[3][2]);
            });

            test(`should move the current button left if the direction is L`, () => {
                const keypad = new Keypad();
                keypad.setCurrentButton(keypad.buttons[2][2]);
                keypad.move('L');
                expect(keypad.currentButton).toBe(keypad.buttons[2][1]);
            });

            test(`should move the current button right if the direction is R`, () => {
                const keypad = new Keypad();
                keypad.setCurrentButton(keypad.buttons[2][2]);
                keypad.move('R');
                expect(keypad.currentButton).toBe(keypad.buttons[2][3]);
            });

            test(`should not move the current button if the direction is invalid`, () => {
                const keypad = new Keypad();
                expect(() => keypad.move('X')).toThrow('Invalid direction');
            });

            test(`should not move the current button up if the direction is out of bounds`, () => {
                const keypad = new Keypad();
                keypad.setCurrentButton(keypad.buttons[0][2]);
                keypad.move('U');
                expect(keypad.currentButton).toBe(keypad.buttons[0][2]);
            });

            test(`should not move the current button down if the direction is out of bounds`, () => {
                const keypad = new Keypad();
                keypad.setCurrentButton(keypad.buttons[4][2]);
                keypad.move('D');
                expect(keypad.currentButton).toBe(keypad.buttons[4][2]);
            });
            
            test(`should not move the current button left if the direction is out of bounds`, () => {
                const keypad = new Keypad();
                keypad.setCurrentButton(keypad.buttons[2][0]);
                keypad.move('L');
                expect(keypad.currentButton).toBe(keypad.buttons[2][0]);
            });
            
            test(`should not move the current button right if the direction is out of bounds`, () => {
                const keypad = new Keypad();
                keypad.setCurrentButton(keypad.buttons[2][4]);
                keypad.move('R');
                expect(keypad.currentButton).toBe(keypad.buttons[2][4]);
            });
        });

        describe(`When the followDirectionsAndReturnCode method is called...`, () => {
            test(`should return the code for the directions`, () => {
                const keypad = new Keypad();
                const code = keypad.followDirectionsAndReturnCode('UDLR');
                expect(code).toBe('6');
            });
        });
    });
});