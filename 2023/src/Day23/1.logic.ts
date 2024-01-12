import { v4 as uuidv4 } from 'uuid';

export enum TileType {
    Wall = '#',
    Path = '.',
    EastSlope = '>',
    WestSlope = '<',
    SouthSlope = 'v',
    NorthSlope = '^',
}

export class Tile {
    id: string;
    value: TileType;
    north: Tile;
    east: Tile;
    south: Tile;
    west: Tile;
    isStart: boolean = false;
    isGoal: boolean = false;
    visited: boolean = false;

    constructor(value: TileType) {
        this.id = `${value}--${uuidv4()}`;
        this.value = value;
    }

    setIsStart() {
        this.isStart = true;
    }

    setIsGoal() {
        this.isGoal = true;
    }

    setNorth(tile) {
        this.north = tile;
    }

    setEast(tile) {
        this.east = tile;
    }

    setSouth(tile) {
        this.south = tile;
    }

    setWest(tile) {
        this.west = tile;
    }

    isWall(): boolean {
        return this.value === TileType.Wall;
    }

    isPath(): boolean {
        return (
            this.value === TileType.Path ||
            this.value === TileType.EastSlope ||
            this.value === TileType.WestSlope ||
            this.value === TileType.SouthSlope ||
            this.value === TileType.NorthSlope
        );
    }

    canMoveNorth(): boolean {
        if (this.north === undefined || this.north.isWall() || this.north.visited) {
            return false;
        } else {
            return [TileType.Path, TileType.NorthSlope].includes(this.value);
        }
    }

    canMoveEast(): boolean {
        if (this.east === undefined || this.east.isWall() || this.east.visited) {
            return false;
        } else {
            return [TileType.Path, TileType.EastSlope].includes(this.value);
        }
    }

    canMoveSouth(): boolean {
        if (this.south === undefined || this.south.isWall() || this.south.visited) {
            return false;
        } else {
            return [TileType.Path, TileType.SouthSlope].includes(this.value);
        }
    }

    canMoveWest(): boolean {
        if (this.west === undefined || this.west.isWall() || this.west.visited) {
            return false;
        } else {
            return [TileType.Path, TileType.WestSlope].includes(this.value);
        }
    }

    visit(steps: number) {
        this.visited = true;
    }
}

export class Map {
    tiles: Tile[][] = [];

    constructor() {
        this.tiles = [];
    }

    addRow(row: Tile[]) {
        this.tiles.push(row);
    }

    initialize() {
        this.establishConnections();
        this.identifyStartingTile();
        this.identifyGoalTile();
        this.removeBackReferences(this.getStartingTile());
    }

    identifyStartingTile() {
        this.tiles[0].forEach((tile) => {
            if (tile.isPath()) {
                tile.setIsStart();
            }
        });
    }

    getStartingTile(): Tile {
        return this.tiles[0].find((tile) => tile.isStart);
    }

    getGoalTile(): Tile {
        return this.tiles[this.tiles.length - 1].find((tile) => tile.isGoal);
    }

    identifyGoalTile() {
        this.tiles[this.tiles.length - 1].forEach((tile) => {
            if (tile.isPath()) {
                tile.setIsGoal();
            }
        });
    }

    establishConnections() {
        this.tiles.forEach((row, rowIndex) => {
            row.forEach((tile, columnIndex) => {
                if (rowIndex > 0) {
                    const neighbor = this.tiles[rowIndex - 1][columnIndex];
                    tile.setNorth(neighbor);
                }

                if (columnIndex > 0) {
                    const neighbor = row[columnIndex - 1];
                    tile.setWest(neighbor);
                }

                if (rowIndex < this.tiles.length - 1) {
                    const neighbor = this.tiles[rowIndex + 1][columnIndex];
                    tile.setSouth(neighbor);
                }

                if (columnIndex < row.length - 1) {
                    const neighbor = row[columnIndex + 1];
                    tile.setEast(neighbor);
                }
            });
        });
    }

    removeBackReferences(tile: Tile) {
        if (tile.canMoveNorth()) {
            tile.north.south = undefined;
            this.removeBackReferences(tile.north);
        }

        if (tile.canMoveEast()) {
            tile.east.west = undefined;
            this.removeBackReferences(tile.east);
        }

        if (tile.canMoveSouth()) {
            tile.south.north = undefined;
            this.removeBackReferences(tile.south);
        }

        if (tile.canMoveWest()) {
            tile.west.east = undefined;
            this.removeBackReferences(tile.west);
        }
    }

    navigate(tile: Tile, steps: number) {
        if (tile.isGoal) {
            tile.visit(steps);
        } else {
            tile.visit(steps);

            if (tile.canMoveNorth()) {
                this.navigate(tile.north, steps + 1);
            }

            if (tile.canMoveEast()) {
                this.navigate(tile.east, steps + 1);
            }

            if (tile.canMoveSouth()) {
                this.navigate(tile.south, steps + 1);
            }

            if (tile.canMoveWest()) {
                this.navigate(tile.west, steps + 1);
            }
        }
    }

    print() {
        let output = '';

        this.tiles.forEach((row) => {
            row.forEach((tile) => {
                output += tile.isStart ? 'S' : tile.isGoal ? 'G' : tile.value;
            });

            output += '\n';
        });

        console.log(output);
    }

    generateTree(tile: Tile, cache: TreeNode[], parent?: TreeNode): TreeNode {
        const node = new TreeNode(tile.id);
        cache.push(node);

        if (parent !== undefined) {
            if (parent.hasAncestor(tile.id) === false) {
                parent.addChild(node);
            }
        }

        if (tile.canMoveNorth()) {
            this.generateTree(tile.north, cache, node);
        }

        if (tile.canMoveEast()) {
            this.generateTree(tile.east, cache, node);
        }

        if (tile.canMoveSouth()) {
            this.generateTree(tile.south, cache, node);
        }

        if (tile.canMoveWest()) {
            this.generateTree(tile.west, cache, node);
        }

        return node;
    }
}

export class TreeNode {
    id: string;
    parent: TreeNode = null;
    children: TreeNode[] = [];

    constructor(id: string) {
        this.id = id;
    }

    addChild(child: TreeNode) {
        this.children.push(child);
        child.parent = this;
    }

    hasAncestor(id: string): boolean {
        if (this.parent === null) {
            return false;
        } else if (this.parent.id === id) {
            return true;
        } else {
            return this.parent.hasAncestor(id);
        }
    }

    getDistanceToRoot(): number {
        if (this.parent === null) {
            return 0;
        } else {
            return 1 + this.parent.getDistanceToRoot();
        }
    }
}