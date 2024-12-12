interface Coordinate {
    x: number;
    y: number;
}

export class GardenPlot {
    region: Region;
    label: string;
    north: GardenPlot | null;
    east: GardenPlot | null;
    south: GardenPlot | null;
    west: GardenPlot | null;
    coordinate: Coordinate;

    constructor(label: string) {
        this.label = label;
        this.coordinate = null;
        this.region = null;
        this.north = null;
        this.east = null;
        this.south = null;
        this.west = null;
    }

    setNorth(plot: GardenPlot) {
        this.north = plot;
    }

    setEast(plot: GardenPlot) {
        this.east = plot;
    }

    setSouth(plot: GardenPlot) {
        this.south = plot;
    }

    setWest(plot: GardenPlot) {
        this.west = plot;
    }

    canMoveNorth(): boolean {
        return this.north !== null;
    }

    canMoveEast(): boolean {
        return this.east !== null;
    }

    canMoveSouth(): boolean {
        return this.south !== null;
    }

    canMoveWest(): boolean {
        return this.west !== null;
    }

    hasRegion(): boolean {
        return this.region !== null;
    }

    getRegion(): Region {
        return this.region;
    }

    setRegion(region: Region) {
        this.region = region;
    }

    getLabel(): string {
        return this.label;
    }

    setCoordinate(coordinate: Coordinate) {
        this.coordinate = coordinate;
    }

    crawlRegion(region: Region) {
        region.addPlot(this);

        if (this.canMoveNorth() && !this.north.hasRegion() && this.north.getLabel() === this.getLabel()) {
            this.north.crawlRegion(region);
        }

        if (this.canMoveEast() && !this.east.hasRegion() && this.east.getLabel() === this.getLabel()) {
            this.east.crawlRegion(region);
        }

        if (this.canMoveSouth() && !this.south.hasRegion() && this.south.getLabel() === this.getLabel()) {
            this.south.crawlRegion(region);
        }

        if (this.canMoveWest() && !this.west.hasRegion() && this.west.getLabel() === this.getLabel()) {
            this.west.crawlRegion(region);
        }
    }

    getVertices(): Coordinate[] {
        return [
            { x: this.coordinate.x, y: this.coordinate.y },
            { x: this.coordinate.x + 1, y: this.coordinate.y },
            { x: this.coordinate.x + 1, y: this.coordinate.y + 1 },
            { x: this.coordinate.x, y: this.coordinate.y + 1 },
        ];
    }
}

export class Region {
    id: number;
    plots: GardenPlot[];

    constructor(id: number) {
        this.id = id;
        this.plots = [];
    }

    addPlot(plot: GardenPlot) {
        plot.setRegion(this);
        this.plots.push(plot);
    }

    calculateArea(): number {
        return this.plots.length;
    }

    calculatePerimeter(): number {
        const map = new Map<string, number>();

        this.plots.forEach((plot) => {
            plot.getVertices().forEach((vertex) => {
                let key = `${vertex.x},${vertex.y}`;
                let count = map.get(key) || 0;
                map.set(key, count + 1);
            });
        });

        // Determine which of the values in the map are odd, those are vertices
        let vertices = 0;

        // for (let count of map.values()) {
        const keys = Array.from(map.keys());

        keys.forEach((key) => {
            let count = map.get(key);

            if (count % 2 !== 0) {
                console.log(`Vertex at key: ${key}, Count: ${count}`);
                vertices++;
            } else if (count === 2) {                
                // Check to see if this is a connection of two diagonal plots, if so increment the vertices count by 2
                let vertex = key.split(',').map((value) => parseInt(value, 10));
                let plotsToCheck = this.plots.filter((plot) => {
                    let vertexToCheck = plot.getVertices().find((v) => v.x === vertex[0] && v.y === vertex[1]);
                    return vertexToCheck !== undefined;
                });

                let p1x = plotsToCheck[0].coordinate.x;
                let p1y = plotsToCheck[0].coordinate.y;

                let p2x = plotsToCheck[1].coordinate.x;
                let p2y = plotsToCheck[1].coordinate.y;

                if (Math.abs(p1x - p2x) === 1 && Math.abs(p1y - p2y) === 1) {
                    vertices+=2;
                }
            }
        });

        return vertices;
    }

    calculatePrice(): number {
        const area = this.calculateArea();
        const perimeter = this.calculatePerimeter();
        const price = area * perimeter;
        console.log(`Region ${this.id} has an area of ${area} and a perimeter of ${perimeter}. The price is ${price}`);

        return price;
    }
}

export class Garden {
    plots: GardenPlot[][];
    regions: Region[];

    constructor() {
        this.plots = [];
        this.regions = [];
    }

    addRow(row: GardenPlot[]) {
        // Set the coordinates for each plot
        row.forEach((plot, index) => {
            plot.setCoordinate({ x: index, y: this.plots.length });
        });
        this.plots.push(row);
    }

    addRegion(region: Region) {
        this.regions.push(region);
    }

    connectPlots() {
        for (let y = 0; y < this.plots.length; y++) {
            for (let x = 0; x < this.plots[y].length; x++) {
                let plot = this.plots[y][x];

                if (y > 0) {
                    plot.setNorth(this.plots[y - 1][x]);
                }

                if (y < this.plots.length - 1) {
                    plot.setSouth(this.plots[y + 1][x]);
                }

                if (x > 0) {
                    plot.setWest(this.plots[y][x - 1]);
                }

                if (x < this.plots[y].length - 1) {
                    plot.setEast(this.plots[y][x + 1]);
                }
            }
        }
    }

    markRegions() {
        let regionId = 1;

        for (let y = 0; y < this.plots.length; y++) {
            for (let x = 0; x < this.plots[y].length; x++) {
                let plot = this.plots[y][x];

                if (!plot.hasRegion()) {
                    let region = new Region(regionId);
                    this.addRegion(region);

                    plot.crawlRegion(region);
                    regionId++;
                }
            }
        }
    }

    calculateTotalPriceOfFencing(): number {
        let totalPrice = 0;

        for (let region of this.regions) {
            totalPrice += region.calculatePrice();
        }

        return totalPrice
    }
}