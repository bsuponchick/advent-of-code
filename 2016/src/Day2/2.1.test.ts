import { describe, expect, test } from '@jest/globals';
import { Button, Keypad } from './2.1.logic';

describe('Day 2 - Part 1', () => {
    describe(`Button...`, () => {
        describe(`constructor`, () => {
            test(`should create a button with the correct value`, () => {
                const button = new Button(1);
                expect(button.value).toBe(1);
                expect(button.up).toBeNull();
                expect(button.down).toBeNull();
                expect(button.left).toBeNull();
                expect(button.right).toBeNull();
            });
        });

        describe(`setUp`, () => {
            test(`should set the up button`, () => {
                const button = new Button(1);
                const upButton = new Button(2);
                button.setUp(upButton);
                expect(button.up).toBe(upButton);
            });
        });
        
        describe(`setDown`, () => {
            test(`should set the down button`, () => {
                const button = new Button(1);
                const downButton = new Button(2);
                button.setDown(downButton);
                expect(button.down).toBe(downButton);
            });
        });
        
        describe(`setLeft`, () => {
            test(`should set the left button`, () => {
                const button = new Button(1);
                const leftButton = new Button(2);
                button.setLeft(leftButton);
                expect(button.left).toBe(leftButton);
            });
        });
        
        describe(`setRight`, () => {
            test(`should set the right button`, () => {
                const button = new Button(1);
                const rightButton = new Button(2);
                button.setRight(rightButton);
                expect(button.right).toBe(rightButton);
            });
        });
        
        describe(`getValue`, () => {
            test(`should return the value of the button`, () => {
                const button = new Button(1);
                expect(button.getValue()).toBe(1);
            });
        });
    });

    describe(`Keypad...`, () => {
        describe(`constructor`, () => {
            test(`should create a keypad with the correct buttons`, () => {
                const keypad = new Keypad();
                expect(keypad.buttons.length).toBe(3);
                expect(keypad.currentButton).toBe(keypad.buttons[1][1]);
            });
        });

        describe(`When the establishConnections method is called...`, () => {
            test(`should establish the connections between the buttons`, () => {
                const keypad = new Keypad();
                keypad.establishConnections();

                expect(keypad.buttons[0][0].up).toBe(null);
                expect(keypad.buttons[0][0].down).toBe(keypad.buttons[1][0]);
                expect(keypad.buttons[0][0].left).toBe(null);
                expect(keypad.buttons[0][0].right).toBe(keypad.buttons[0][1]);

                expect(keypad.buttons[0][1].up).toBe(null);
                expect(keypad.buttons[0][1].down).toBe(keypad.buttons[1][1]);
                expect(keypad.buttons[0][1].left).toBe(keypad.buttons[0][0]);
                expect(keypad.buttons[0][1].right).toBe(keypad.buttons[0][2]);

                expect(keypad.buttons[0][2].up).toBe(null);
                expect(keypad.buttons[0][2].down).toBe(keypad.buttons[1][2]);
                expect(keypad.buttons[0][2].left).toBe(keypad.buttons[0][1]);
                expect(keypad.buttons[0][2].right).toBe(null);

                expect(keypad.buttons[1][0].up).toBe(keypad.buttons[0][0]);
                expect(keypad.buttons[1][0].down).toBe(keypad.buttons[2][0]);
                expect(keypad.buttons[1][0].left).toBe(null);
                expect(keypad.buttons[1][0].right).toBe(keypad.buttons[1][1]);

                expect(keypad.buttons[1][1].up).toBe(keypad.buttons[0][1]);
                expect(keypad.buttons[1][1].down).toBe(keypad.buttons[2][1]);
                expect(keypad.buttons[1][1].left).toBe(keypad.buttons[1][0]);
                expect(keypad.buttons[1][1].right).toBe(keypad.buttons[1][2]);

                expect(keypad.buttons[1][2].up).toBe(keypad.buttons[0][2]);
                expect(keypad.buttons[1][2].down).toBe(keypad.buttons[2][2]);
                expect(keypad.buttons[1][2].left).toBe(keypad.buttons[1][1]);
                expect(keypad.buttons[1][2].right).toBe(null);

                expect(keypad.buttons[2][0].up).toBe(keypad.buttons[1][0]);
                expect(keypad.buttons[2][0].down).toBe(null);
                expect(keypad.buttons[2][0].left).toBe(null);
                expect(keypad.buttons[2][0].right).toBe(keypad.buttons[2][1]);

                expect(keypad.buttons[2][1].up).toBe(keypad.buttons[1][1]);
                expect(keypad.buttons[2][1].down).toBe(null);
                expect(keypad.buttons[2][1].left).toBe(keypad.buttons[2][0]);
                expect(keypad.buttons[2][1].right).toBe(keypad.buttons[2][2]);

                expect(keypad.buttons[2][2].up).toBe(keypad.buttons[1][2]);
                expect(keypad.buttons[2][2].down).toBe(null);
                expect(keypad.buttons[2][2].left).toBe(keypad.buttons[2][1]);
                expect(keypad.buttons[2][2].right).toBe(null);
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
                expect(keypad.getCurrentButton()).toBe(keypad.buttons[1][1]);
            });
        });

        describe(`When the move method is called...`, () => {
            test(`should move the current button up if the direction is U`, () => {
                const keypad = new Keypad();
                keypad.move('U');
                expect(keypad.currentButton).toBe(keypad.buttons[0][1]);
            });

            test(`should move the current button down if the direction is D`, () => {
                const keypad = new Keypad();
                keypad.move('D');
                expect(keypad.currentButton).toBe(keypad.buttons[2][1]);
            });

            test(`should move the current button left if the direction is L`, () => {
                const keypad = new Keypad();
                keypad.move('L');
                expect(keypad.currentButton).toBe(keypad.buttons[1][0]);
            });

            test(`should move the current button right if the direction is R`, () => {
                const keypad = new Keypad();
                keypad.move('R');
                expect(keypad.currentButton).toBe(keypad.buttons[1][2]);
            });

            test(`should not move the current button if the direction is invalid`, () => {
                const keypad = new Keypad();
                expect(() => keypad.move('X')).toThrow('Invalid direction');
            });

            test(`should not move the current button up if the direction is out of bounds`, () => {
                const keypad = new Keypad();
                keypad.setCurrentButton(keypad.buttons[0][0]);
                keypad.move('U');
                expect(keypad.currentButton).toBe(keypad.buttons[0][0]);
            });

            test(`should not move the current button down if the direction is out of bounds`, () => {
                const keypad = new Keypad();
                keypad.setCurrentButton(keypad.buttons[2][2]);
                keypad.move('D');
                expect(keypad.currentButton).toBe(keypad.buttons[2][2]);
            });
            
            test(`should not move the current button left if the direction is out of bounds`, () => {
                const keypad = new Keypad();
                keypad.setCurrentButton(keypad.buttons[0][0]);
                keypad.move('L');
                expect(keypad.currentButton).toBe(keypad.buttons[0][0]);
            });
            
            test(`should not move the current button right if the direction is out of bounds`, () => {
                const keypad = new Keypad();
                keypad.setCurrentButton(keypad.buttons[2][2]);
                keypad.move('R');
                expect(keypad.currentButton).toBe(keypad.buttons[2][2]);
            });
        });

        describe(`When the followDirectionsAndReturnCode method is called...`, () => {
            test(`should return the code for the directions`, () => {
                const keypad = new Keypad();
                keypad.setCurrentButton(keypad.buttons[0][0]);
                const code = keypad.followDirectionsAndReturnCode('UDLR');
                expect(code).toBe(5);
            });
        });
    });
});