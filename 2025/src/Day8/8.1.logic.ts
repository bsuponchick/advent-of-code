import { XYZCoordinate } from '../utils/interfaces/coordinate';

export interface JunctionBoxDistance {
    a: JunctionBox;
    b: JunctionBox;
    distance: number;
}

export class JunctionBox {
    id: number;
    coordinate: XYZCoordinate;
    circuit: Circuit | null;

    constructor(id: number, coordinate: XYZCoordinate) {
        this.id = id;
        this.coordinate = coordinate;
        this.circuit = null;
    }

    getCoordinate(): XYZCoordinate {
        return this.coordinate;
    }

    getId(): number {
        return this.id;
    }

    calculateDistance(other: JunctionBox): number {
        return Math.sqrt(Math.pow(this.coordinate.x - other.coordinate.x, 2) + Math.pow(this.coordinate.y - other.coordinate.y, 2) + Math.pow(this.coordinate.z - other.coordinate.z, 2));
    }

    setCircuit(circuit: Circuit) {
        this.circuit = circuit;
    }

    getCircuit(): Circuit | null {
        return this.circuit;
    }
}

export class Circuit {
    id: number;
    junctionBoxes: JunctionBox[];

    constructor(id: number) {
        this.id = id;
        this.junctionBoxes = [];
    }

    addJunctionBox(junctionBox: JunctionBox) {
        if (junctionBox.getCircuit()?.getId() !== this.id) {
            this.junctionBoxes.push(junctionBox);
            junctionBox.setCircuit(this);
        }
    }

    getJunctionBoxes(): JunctionBox[] {
        return this.junctionBoxes;
    }

    merge(other: Circuit): void {
        if (other.id === this.id) {
            return;
        }

        for (let junctionBox of other.junctionBoxes) {
            this.addJunctionBox(junctionBox);
        }

        other.clearJunctionBoxes();
    }

    clearJunctionBoxes(): void {
        this.junctionBoxes = [];
    }

    getSize(): number {
        return this.junctionBoxes.length;
    }

    getId(): number {
        return this.id;
    }
}