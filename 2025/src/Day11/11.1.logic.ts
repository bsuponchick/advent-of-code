export const topologicalSortDFS = (graph: Map<string, string[]>): string[] => {
    const visited = new Set<string>();
    const visiting = new Set<string>(); // Used for cycle detection
    const result: string[] = [];

    function dfs(node: string) {
        if (visiting.has(node)) {
            throw new Error('Cycle detected! Graph is not a DAG.');
        }
        if (visited.has(node)) {
            return;
        }

        visiting.add(node);
        visited.add(node);

        const neighbors = graph.get(node) || [];
        for (const neighbor of neighbors) {
            dfs(neighbor);
        }

        visiting.delete(node);
        result.unshift(node); // Add to the beginning of the result list
    }

    // Iterate over all nodes to ensure all are visited, including disconnected components
    for (const node of graph.keys()) {
        if (!visited.has(node)) {
            dfs(node);
        }
    }

    return result;
};

interface GoalStateInput {
    graph: Map<string, string[]>;
    goal: string;
    start: string;
}

export const determineNumberOfPathsToGoalState = (input: GoalStateInput): number => {
    const sortedNodes = topologicalSortDFS(input.graph).reverse();
    const numberOfPathsToGoalState = new Map<string, number>();

    sortedNodes.forEach(node => {
        if (node === input.goal) {
            numberOfPathsToGoalState.set(node, 1);
        } else {
            numberOfPathsToGoalState.set(node, 0);
        }
    });

    sortedNodes.forEach(node => {
        if (node === input.goal) {
            return;
        }

        const neighbors = input.graph.get(node) || [];
        // console.log(`Neighbors of ${node} are: $${JSON.stringify(neighbors)}`);
        
        // console.log(`Setting number of paths to goal state for ${node} to the sum of its neighbors ${JSON.stringify(neighbors)}`);
        let pathsOfNeighbors = 0;

        neighbors.forEach(neighbor => {
            // console.log(`Adding number of paths to goal state for ${neighbor}: ${numberOfPathsToGoalState.get(neighbor)}`);
            pathsOfNeighbors += numberOfPathsToGoalState.get(neighbor);
        });

        // console.log(`Setting number of paths to goal state for ${node} to ${pathsOfNeighbors}`);
        numberOfPathsToGoalState.set(node, pathsOfNeighbors);
    });

    // console.log(`Paths to goal state is finally: `);
    // numberOfPathsToGoalState.forEach((value, key) => {
    //     console.log(`${key}: ${value}`);
    // });

    return numberOfPathsToGoalState.get(input.start) || 0;
};