import { Star } from "./Star";
import { Coordinate } from "./Coordinate";
/**
 * Mutable Puzzle that represents starb as specified in the project spec.
 */
export class Puzzle {
    private readonly board: Array<Array<Star>>;
    private readonly solution: Map<Array<Coordinate>, Array<Coordinate>>;


    // Abstraction function:
    //  AF(board, solution) = the 10x10 puzzle `board` that holds 10 regions with 2 stars to be placed in each region by the client as specified in the spec.
    //                        Solutions `solutions` map the correct star locations to each region. This tests whether the current board is solved or not. 
    // Representation invariant:
    //   board length = 10
    //   element.length = 10 for each element in board
    //   solution entries = 10
    //   solution key length = 2
    //   2 < solution value length <= 8
    // Safety from rep exposure:
    //   All fields are private and readonly
    //   board is of mutable type but it is not shared anywhere so it is not exposed
    //
    // Make cell class, cell class has row, col, region number
    public constructor(filename: string) { 
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                this.board[row].push(Star.NOSTAR);
            }
        }
        // implement solution 
    }

    /**
     * Places a star in the given location. If star already exists, then the star is removed.
     * A star can only be added if there is < 2 stars in the selected region. Otherwise, the player will have to remove
     * one before adding one in another spot
     * 
     * @param row to place star, 0 <= row < 10.
     * @param col to place star, 0 <= col < 10
     */
    public addStar(row: number, col: number) {
        throw new Error("not yet implemented");
    }

    /**
     * Returns whether state of current board matches the solution.
     */
    private isSolved(): boolean {
        throw new Error("not yet implemented");
    }

    /**
     * Returns whether region that encapsulates coordinate given already has 2 stars.
     */
    private isRegionFull(row: number, col: number): boolean {
        throw new Error("not yet implemented");
    }

    /**
     * Returns string version of Board
     */
    public toString(): string {
        throw new Error("not yet implemented");
    }

    /**
     * Make a new board by parsing a file.
     * 
     * 
     * @param filename path to puzzle file
     * @returns (a promise for) a new puzzle with the size and cards from the file
     * @throws Error if the file cannot be read or is not a valid game board
     */
    public static async parseFromFile(filename: string): Promise<Puzzle> {
        
        throw new Error("not yet implemented");
    }

}