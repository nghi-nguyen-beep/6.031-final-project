
import { Coordinate } from "./Coordinate";
import fs from 'fs';
import assert from 'assert';
/**
 * Immutable Puzzle that represents starb as specified in the project spec.
 */

enum Star {
    STAR = 'star',
    NOSTAR = 'noStar'
}

const numRows = 10;

export class Puzzle {
    private readonly regions: Map<number, Set<Coordinate>>;
    private readonly board: Set<Coordinate>;


    // Abstraction function:
    //  AF(regions, board) = the 10x10 puzzle that holds 10 regions with 2 stars to be placed in each region by the client as specified in the spec.
    //                       regions maps each region number (0-9) to the set of coordinates in that region 
    //                       and board contains the set of stars currently placed on the puzzle by the user
    // 
    // Representation invariant:
    //   board.size = 10
    //   regions.size = 10 and contains integers from 0-9, inclusive

    // Safety from rep exposure:
    //   All fields are private and readonly
    //   Puzzle is immutable: all methods with mutable return types employ defensive copying
    //
    
    /**
     * Make a new puzzle
     * 
     * @param regions mapping for each region number (0-9) to the set of coordinates in that region 
     * @param board current set of stars in region as placed by user
     */
    public constructor(regions: Map<number, Set<Coordinate>>, board: Set<Coordinate>) { 

        this.regions = new Map();
        this.board = new Set(board);

        for (const region of regions.keys()) {
            this.regions.set(region, new Set(regions.get(region)));
        }

    }

    /**
     * Ensure puzzle representation invariants met
     */
    public checkRep(): void
    {
        assert(this.board.size === numRows);
        assert(this.regions.size === numRows);

        for (const key of this.regions.keys()){
            assert(key >= 0 && key < numRows);
        }
    }

    /**
     * Places a star in the given location. If star already exists, then the star is removed.
     * A star can only be added if adding a star there is legal as defined in handout. Otherwise, the player will have to remove
     * another star that now makes adding star there legal before adding the star.
     * 
     * @param row to place star, 0 <= row < 10.
     * @param col to place star, 0 <= col < 10
     * @returns a new Puzzle with the updated state of the board
     */
    public addStar(row: number, col: number): Puzzle {
        assert(row >= 0 && row < numRows && col >= 0 && col < numRows);

        for (const coord of this.board) {
            const coordX = coord.getRow();
            const coordY = coord.getCol();
            if (coordX === row && coordY === col) {
                const newBoard:Set<Coordinate> = new Set(this.board);
                newBoard.delete(coord);
                return new Puzzle(this.regions, newBoard);
            }
        }
        const region = this.findRegion(row, col);
        if (this.isRegionFull(region) || this.isColumnFull(col) || this.isRowFull(row)) {
            return new Puzzle(this.regions, this.board);
        } else {
            const newBoard = new Set(this.board);
            let notAdjacent = true;
            let rowAbove:number;
            let rowBelow:number;
            let columnRight:number;
            let columnLeft:number;

            if (row > 0) {
                rowAbove = row - 1;
            } else {
                rowAbove = row;
            } 
            if (row < numRows-1) {
                rowBelow = row + 1;
            } else {
                rowBelow = row;
            }
            if (col > 0) {
                columnLeft = col - 1;
            } else {
                columnLeft = col;
            } 
            if (col < numRows-1) {
                columnRight = col + 1;
            } else {
                columnRight = col;
            }

            for (let i = rowAbove; i <= rowBelow; i++) {
                for (let j = columnLeft; j <= columnRight; j++) {
                    for (const star of this.board) {
                        if (star.getRow() === i && star.getCol() === j) {
                            notAdjacent = false;
                        }
                    }
                }
            }

            if (notAdjacent) {
                newBoard.add(new Coordinate(row, col));
                return new Puzzle(this.regions, newBoard);
            } else {
                return new Puzzle(this.regions, this.board);
            }
            newBoard.add(new Coordinate(row, col));
            return new Puzzle(this.regions, newBoard);
            
        }
    }

    private findRegion(row: number, col: number): number {
        for (const region of this.regions.keys()) {
            const coords = this.regions.get(region);
            assert(coords !== undefined);
            for (const coord of coords) {
                const coordX = coord.getRow();
                const coordY = coord.getCol();
                if (coordX === row && coordY === col) {
                    return region;
                }
            }
        }
        throw("no region exists");
    }

    /**
     * Returns whether state of current board is a solution to the board.
     * 
     * @returns true if each row, column, and region of the board has two stars, false otherwise
     */
    public isSolved(): boolean {
        let solved = true;
        for (const region of this.regions.keys()) {
            if (!this.isRegionFull(region)) {
                solved = false;
            }
        }
        for (let i = 0; i < numRows; i++) {
            if (!this.isColumnFull(i)) {
                solved = false;
            }
            if (!this.isRowFull(i)) {
                solved = false;
            }
        }
        return solved;
    }

    /**
     * checks if 'region' has two stars
     * 
     * @param region the number of the region to check
     * @returns true if the regiion contains twoo stars, false if it contains 1 or 0 stars, and throws an error 
     *          if it contains more than 2 stars
     */
    private isRegionFull(region: number): boolean {
        const coords = this.regions.get(region);
        assert(coords !== undefined);
        let stars = 0;
        for (const coord of coords) {
            for (const star of this.board) {
                assert(star !== undefined && coord !== undefined);
                if (coord.equals(star)) {
                    stars += 1;
                }
            }
        }
        if (stars === 2) {
            return true;
        } else if (stars < 2) {
            return false;
        } else {
            throw new Error("too many stars in region");
        }
    }
    /**
     * checks if 'col' has two stars
     * 
     * @param col the column to check
     * @returns true if col contains two stars and false if col contains 1 or 0 stars. If the column contains more than
     *          2 stars, throw an error
     */
    private isColumnFull(col: number): boolean {
        let starsInCol = 0;
        for (const star of this.board) {
            const starColumn = star.getCol();
            if (col === starColumn) {
                starsInCol += 1;
            }
        }
        if (starsInCol === 2) {
            return true;
        } else if (starsInCol < 2) {
            return false;
        } else {
            throw new Error("too many stars in column");
        }
    }

    /**
     * checks if 'row' has two stars
     * 
     * @param row the row to check
     * @returns true if row contains two stars and false if row contains 1 or 0 stars. If the row contains more than
     *          2 stars, throw an error
     */
    private isRowFull(row: number): boolean {
        let starsInRow = 0;
        for (const star of this.board) {
            const starRow = star.getRow();
            if (row === starRow) {
                starsInRow += 1;
            }
        }
        if (starsInRow === 2) {
            return true;
        } else if (starsInRow < 2) {
            return false;
        } else {
            throw new Error("too many stars in row");
        }
    }

    /**
     * @returns copy of set of coordinates in board
     */ 
    public getBoard(): Set<Coordinate> {
        const boardSet: Set<Coordinate> = new Set();
        
        for (const coord of this.board){
            boardSet.add(coord);
        }
        return boardSet;
    }

    /**
     * @returns a copy of this.regions
     */
    public getRegions(): Map<number, Set<Coordinate>> {
        const regionsCopy: Map<number, Set<Coordinate>> = new Map();
        for (const region of this.regions.keys()) {
            regionsCopy.set(region, new Set(this.regions.get(region)));
        }
        return regionsCopy;
    }

    /**
     * 
     * @returns a string representation of the puzzle, where, for every region, it is representated as the string 
     *          'REGION' followed by each coordinate in that region on a new line. After all the region, the current 
     *          state of the board is shown as 'BOARD', followed by the coordinates containing stars on new lines
     */
    public toString(): string {
        let outputString = "";
        for (const region of this.regions.keys()) {
            outputString += "REGION\n";
            const coords = this.regions.get(region);
            assert(coords !== undefined);
            for (const coord of coords) {
                const row = coord.getRow();
                const col = coord.getCol();
                assert(row !== undefined && col !== undefined);
                outputString += row + "," + col;
                outputString += '\n';
            }
        }

        outputString += "BOARD\n";
        for (const star of this.board) {
            const row = star.getRow();
            const col = star.getCol();
            assert(row !== undefined && col !== undefined);
            outputString += row + "," + col;
            outputString += '\n';
        }
        return outputString;
    }
    
}


