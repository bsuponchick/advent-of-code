import { Graph, Node, Edge } from './dijkstra';


const execute = () => {
    const graph = new Graph();
    const zero = new Node({id: 0});
    const one = new Node({id: 1});
    const two = new Node({id: 2});
    const three = new Node({id: 3});
    const four = new Node({id: 4});
    const five = new Node({id: 5});
    const six = new Node({id: 6});

    graph.addNode(zero);
    graph.addNode(one);
    graph.addNode(two);
    graph.addNode(three);
    graph.addNode(four);
    graph.addNode(five);
    graph.addNode(six);

    graph.addEdge(new Edge({start: zero, end: one, weight: 2}));
    graph.addEdge(new Edge({start: zero, end: two, weight: 6}));
    graph.addEdge(new Edge({start: one, end: three, weight: 5}));
    graph.addEdge(new Edge({start: two, end: three, weight: 8}));
    graph.addEdge(new Edge({start: three, end: five, weight: 15}));
    graph.addEdge(new Edge({start: three, end: four, weight: 10}));
    graph.addEdge(new Edge({start: four, end: six, weight: 2}));
    graph.addEdge(new Edge({start: four, end: five, weight: 6}));
    graph.addEdge(new Edge({start: five, end: six, weight: 6}));

    const { distance, path } = graph.findShortestPath(zero, five);

    console.log(`The shortest path from ${zero.id} to ${five.id} is ${distance}`);
    console.log(`The path is ${path.map((node) => node.id).join(' -> ')}`);
};

execute();