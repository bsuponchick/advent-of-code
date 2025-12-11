import { determineNumberOfPathsToGoalState } from './11.1.logic';


export const countPathsFromSvrToOut = (graph: Map<string, string[]>): number => {
    let count = 0;

    const pathsFromSvrToFFT = determineNumberOfPathsToGoalState({ graph, goal: 'fft', start: 'svr' });
    const pathsFromFFTtoDAC = determineNumberOfPathsToGoalState({ graph, goal: 'dac', start: 'fft' });
    const pathsFromDACtoOut = determineNumberOfPathsToGoalState({ graph, goal: 'out', start: 'dac' });

    const pathsFromSvrToDAC = determineNumberOfPathsToGoalState({ graph, goal: 'dac', start: 'svr' });
    const pathsFromDACtoFFT = determineNumberOfPathsToGoalState({ graph, goal: 'fft', start: 'dac' });
    const pathsFromFFTtoOut = determineNumberOfPathsToGoalState({ graph, goal: 'out', start: 'fft' });

    count = (pathsFromSvrToFFT * pathsFromFFTtoDAC * pathsFromDACtoOut) + (pathsFromSvrToDAC * pathsFromDACtoFFT * pathsFromFFTtoOut);

    return count;
}

// export const findAllPaths = (input: FindAllPathsInput): string[][] => {
//     const { startNode, endNode, graph } = input;

//     const allPaths: string[][] = [];
//     // The current path is built as we traverse
//     const currentPath: string[] = [];
//     // A set to keep track of visited nodes in the current path to avoid cycles
//     const visited = new Set<string>();

//     function dfs(currentNode: string) {
//         // Mark node as visited and add to current path
//         visited.add(currentNode);
//         currentPath.push(currentNode);

//         // If the destination is reached, we've found a valid path
//         if (currentNode === endNode) {
//             // Add a copy of the current path to the results
//             allPaths.push([...currentPath]);
//         } else {
//             // Otherwise, continue the search with its neighbors
//             const neighbors = graph.get(currentNode) || [];
//             for (const neighbor of neighbors) {
//                 // Only explore unvisited neighbors
//                 if (!visited.has(neighbor)) {
//                     dfs(neighbor);
//                 }
//             }
//         }

//         // Backtrack: remove node from current path and visited set
//         currentPath.pop();
//         visited.delete(currentNode);
//     }

//     // Start the search from the source node
//     dfs(startNode);
//     return allPaths;
// }