import { TreeNode, Equation } from './7.1.logic';
import { describe, expect, test } from '@jest/globals';

describe('Day 7 - Part 1', () => {
    describe('Equation', () => {
        test('should create a new Equation', () => {
            const equation = new Equation('190: 10 19');
            expect(equation.outcome).toBe(190);
            expect(equation.values).toStrictEqual([10, 19]);
        });

        test('should evaluate the equation correctly.', () => {
            const equation = new Equation('190: 10 19');
            expect(equation.evaluate()).toBeTruthy();
        });

        test('should evaluate the equation correctly.', () => {
            const equation = new Equation('3267: 81 40 27');
            expect(equation.evaluate()).toBeTruthy();
        });

        test('should evaluate the equation correctly.', () => {
            const equation = new Equation('83: 17 5');
            expect(equation.evaluate()).toBeFalsy();
        });
    });

    describe('TreeNode', () => {
        test('should create a new TreeNode', () => {
            const node = new TreeNode(15, null);
            expect(node.value).toBe(15);
            expect(node.operator).toBeNull();
            expect(node.children).toStrictEqual([]);
        });

        test('should add a child to the TreeNode', () => {
            const node = new TreeNode(15, null);
            const child = new TreeNode(15, '+');
            node.addChild(child);
            expect(node.children).toStrictEqual([child]);
            expect(child.parent).toBe(node);
        });

        test('should add multiple children to the TreeNode', () => {
            const node = new TreeNode(15, null);
            const child1 = new TreeNode(15, '+');
            const child2 = new TreeNode(15, '*');
            node.addChild(child1);
            node.addChild(child2);
            expect(node.children).toStrictEqual([child1, child2]);
            expect(child1.parent).toBe(node);
            expect(child2.parent).toBe(node);
        });

        test('should evaluate the TreeNode correctly for addition', () => {
            const node = new TreeNode(15, null);
            const child1 = new TreeNode(15, '+');
            const child2 = new TreeNode(15, '*');
            const child11 = new TreeNode(15, '+');
            const child12 = new TreeNode(15, '*');
            const child21 = new TreeNode(15, '+');
            const child22 = new TreeNode(15, '*');
            node.addChild(child1);
            node.addChild(child2);
            child1.addChild(child11);
            child1.addChild(child12);
            child2.addChild(child21);
            child2.addChild(child22);
            expect(node.evaluate(45, 0)).toBeTruthy();
        });

        test('should evaluate the TreeNode correctly for multiplication', () => {
            const node = new TreeNode(15, null);
            const child1 = new TreeNode(15, '+');
            const child2 = new TreeNode(15, '*');
            const child11 = new TreeNode(15, '+');
            const child12 = new TreeNode(15, '*');
            const child21 = new TreeNode(15, '+');
            const child22 = new TreeNode(15, '*');
            node.addChild(child1);
            node.addChild(child2);
            child1.addChild(child11);
            child1.addChild(child12);
            child2.addChild(child21);
            child2.addChild(child22);
            expect(node.evaluate(3375, 0)).toBeTruthy();
        });

        test('should evaluate the TreeNode correctly for combinations of addition and multiplication', () => {
            const node = new TreeNode(15, null);
            const child1 = new TreeNode(15, '+');
            const child2 = new TreeNode(15, '*');
            const child11 = new TreeNode(15, '+');
            const child12 = new TreeNode(15, '*');
            const child21 = new TreeNode(15, '+');
            const child22 = new TreeNode(15, '*');
            node.addChild(child1);
            node.addChild(child2);
            child1.addChild(child11);
            child1.addChild(child12);
            child2.addChild(child21);
            child2.addChild(child22);
            expect(node.evaluate(450, 0)).toBeTruthy();
        });
    });
});