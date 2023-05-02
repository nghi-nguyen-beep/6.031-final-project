export class Coordinate {
    private readonly coordinates: Array<number>;

    public constructor(x: number, y: number) {
        this.coordinates.push(x);
        this.coordinates.push(y);
    }

    public getX(): number {
        return this.coordinates[0];
    }

    public getY(): number {
        return this.coordinates[0];
    }

    public toString(): string {
        return this.coordinates.toString();
    }
}