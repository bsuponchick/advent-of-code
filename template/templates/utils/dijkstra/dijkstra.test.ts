import { describe, expect, test } from '@jest/globals';
import { Node, Edge, Graph } from './dijkstra';

describe('Node Tests', () => {
    test('constructor', () => {
        const node = new Node({id: 1});
        expect(node.id).toBe(1);
        expect(node.edges).toEqual([]);
        expect(node.visited).toBe(false);
    });

    test('addEdge', () => {
        const node = new Node({id: 1});
        const edge = new Edge({start: node, end: node, weight: 1});
        node.addEdge(edge);
        expect(node.edges).toEqual([edge]);
    });

    test('removeEdge', () => {
        const node = new Node({id: 1});
        const edge = new Edge({start: node, end: node, weight: 1});
        node.addEdge(edge);
        node.removeEdge(edge);
        expect(node.edges).toEqual([]);
    });

    test('reset', () => {
        const node = new Node({id: 1});
        node.visited = true;
        node.reset();
        expect(node.visited).toBe(false);
    });
});

describe('Edge Tests', () => {
    test('constructor', () => {
        const node = new Node({id: 1});
        const edge = new Edge({start: node, end: node, weight: 1});
        expect(edge.start).toBe(node);
        expect(edge.end).toBe(node);
        expect(edge.weight).toBe(1);
    });
});

describe('Graph Tests', () => {
    test('constructor', () => {
        const graph = new Graph();
        expect(graph.nodes).toEqual([]);
        expect(graph.edges).toEqual([]);
    });

    test('getNode', () => {
        const graph = new Graph();
        const node = new Node({id: `1`});
        graph.addNode(node);
        expect(graph.getNode(`1`)).toBe(node);
    });

    test('addNode', () => {
        const graph = new Graph();
        const node = new Node({id: 1});
        graph.addNode(node);
        expect(graph.nodes).toEqual([node]);
    });

    test('removeNode', () => {
        const graph = new Graph();
        const node = new Node({id: 1});
        graph.addNode(node);
        graph.removeNode(node);
        expect(graph.nodes).toEqual([]);
    });

    test('addEdge', () => {
        const graph = new Graph();
        const start = new Node({id: 1});
        const end = new Node({id: 2});
        const edge = new Edge({start: start, end: end, weight: 1});
        graph.addEdge(edge);
        expect(graph.edges).toEqual([edge]);
        expect(start.edges).toEqual([edge]);
        expect(end.edges).toEqual([edge]);
    });

    test('removeEdge', () => {
        const graph = new Graph();
        const start = new Node({id: 1});
        const end = new Node({id: 2});
        const edge = new Edge({start: start, end: end, weight: 1});
        graph.addEdge(edge);
        graph.removeEdge(edge);
        expect(graph.edges).toEqual([]);
        expect(start.edges).toEqual([]);
        expect(end.edges).toEqual([]);
    });

    test('reset', () => {
        const graph = new Graph();
        const node = new Node({id: 1});
        graph.addNode(node);
        node.visited = true;
        graph.reset();
        expect(node.visited).toBe(false);
    });
});