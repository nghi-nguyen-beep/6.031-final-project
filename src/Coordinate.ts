import assert from "assert";

export class Coordinate {
    private readonly row: number;
    private readonly col: number;

    // Abstraction function:
    //  AF(row, col) = the Coordinate on the puzzle board at the 0-indexed location (row, col)
    // Representation invariant:
    //   row and col are integers >= 0 and <= 9
    // Safety from rep exposure:
    //   All fields are private and readonly
    //   All functions have immutable return values, so rep is not exposed

    public constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
    }

    /**
     * @throws error if rep invariant broken
     */
    public checkRep(): void{
        const maxCoordSize = 9;
        
        assert(this.row % 1 === 0 && this.col % 1 === 0);
        assert(this.row >= 0 && this.row <= maxCoordSize && this.col >= 0 && this.col <= maxCoordSize);
    }

    /**
     * @returns row value of coordinate
     */
    public getRow(): number {
        this.checkRep();
        return this.row;
    }

    /**
     * @returns column value of coordinate
     */
    public getCol(): number {
        this.checkRep();
        return this.col;
    }

    /**
     * 
     * @returns string ordered-pair of row and column values in parentheses
     */
    public toString(): string {
        this.checkRep();
        return "(" + this.getRow() + "," + this.getCol() + ")";
    }

    /**
     * 
     * @param other Coordinate
     * @returns true if both coordinates have same row and column values
     */
    public equals(other: Coordinate): boolean {
        this.checkRep();
        if(this.getRow() === other.getRow() && this.getCol() === other.getCol()) {
            return true;
        }
        return false;
    }
}