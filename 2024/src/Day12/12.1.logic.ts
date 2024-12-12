export class GardenPlot {
    region: Region;
    label: string;
    north: GardenPlot | null;
    east: GardenPlot | null;
    south: GardenPlot | null;
    west: GardenPlot | null;

    constructor(label: string) {
        this.label = label;
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

    calculatePerimeter(): number {
        let perimeter = 0;

        if (!this.canMoveNorth() || (this.north.getRegion() !== this.getRegion())) {
            perimeter++;
        }

        if (!this.canMoveEast() || (this.east.getRegion() !== this.getRegion())) {
            perimeter++;
        }

        if (!this.canMoveSouth() || (this.south.getRegion() !== this.getRegion())) {
            perimeter++;
        }

        if (!this.canMoveWest() || (this.west.getRegion() !== this.getRegion())) {
            perimeter++;
        }

        return perimeter;
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
        let perimeter = 0;

        for (let plot of this.plots) {
            perimeter += plot.calculatePerimeter();
        }

        return perimeter;
    }

    calculatePrice(): number {
        return this.calculateArea() * this.calculatePerimeter();
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