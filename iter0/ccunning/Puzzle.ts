/**
 * An immutable data type representing a Puzzle
 */

export interface Puzzle
{
    // Abstraction function:
    //   AF(puzzle, row, col) = Star puzzle of size row x col,
    //                          where the square at (r,c) is contains a Cell Object representing the state of the cell

    // Representation invariant:
    //   puzzle.row and puzzle.col equal 10
    //   there are 10*10 Cells in puzzle
    //   puzzle contains 10 regions

    // Safety from rep exposure:
    //   all fields are private and unreassignable
    //   all public method inputs and outputs are immutable, so the rep is not exposed 
    
    /**
     * @returns nxn string array with each cell in array[i][j] containing the ID of the region it belongs to plus "STAR" if cell has a star 
     */
     toString(): string;

    /**
     * @returns true if the cell is solved as according to handout conditions, else false
     */
    isSolved(): boolean;

    /**
     * Mutate cell of puzzle at desired location, adding a star if cell is empty, else removing a star
     * 
     * @param puzzleIdx index of cell to mutate, where 0 <= puzzleIdx < n*n
     */
    handleMove(puzzleIdx: number): void;

    /**
     * @param puzzleIdx index of cell, where 0 <= puzzleIdx < n*n
     * @return Cell at desired location in puzzle
     */
    getCell(puzzleIdx: number): Cell;

    /**
     * @param id id of region desired, where 0 <= id < n
     * @return Map of regionIds to set of Cell IDs covered 
     */
    getRegion(id: number): Map<number, Set<number>>;

    /**
     * @param id1 of first star, 0 <= id1 < n*n
     * @param id2 of second star, 0 <= id2 < n*n
     * @return true if starts are not horizontally, vertically, or diagonally adjacent
     */
    starsSeparated(id1: number, id2: number): boolean;
}

/**
 * Mutable type representing a Region in the board, as described in the handout
 */
export interface Region
{
    // Abstraction function:
    //   AF(cellsCovered, regionID) = Region in Puzzle with ID regionID containing the cells with cell IDs in cellsCovered 

    // Representation invariant:
    //   cellsCovered.length = 10
    //   0 <= regionID < 10

    // Safety from rep exposure:
    //   all fields are private and unreassignable
    //   all public method inputs and outputs are immutable, so the rep is not exposed 

    /**
     * return array of cells of regions, where each cell in the array contains' the toString() for cell as defined in Cell class
     */
    toString(): string;

    /**
     * @returns number of Stars in cells in the region
     */
    numberStars(): number;

    /**
     * @returns id of region, where 0 <= id < n
     */
    getID(): number;

    /**
     * @returns Set of cell IDs that a region contains
     */
    cellsCovered(): Set<number>;

    /**
     * @returns Set of cell IDs that contain stars in the region
     */
    starsInRegion(): Set<number>;
}

/**
 * Mutable type representing a cell in the board, which is either empty or contains a star
 */
export interface Cell{

    // Abstraction function:
    //   AF(hasStar, regionID, index) = Cell at location = index on puzzle belonging to the region with regionID,
//                                   contains a Star if hasStar is True

    // Representation invariant:
    //   0 <= index < 10*10
    //   0 <= regionID < 10

    // Safety from rep exposure:
    //   all fields are private
    //   all method inputs and outputs are immutable, so the rep is not exposed 

    /**
     * @returns a string with "STAR" if the cell contains a star, else the empty string
     */
    toString(): string;

    /**
     * Mutates the cell to place a Star in it
     */
    addStar(): void;

    /**
     * Mutates the cell to remove a Star from it
     */
    removeStar(): void;

    /**
     * @returns true if the cell has a star in it, else false
     */
    hasStar(): boolean;

    /**
     * @returns row of cell's location in puzzle
     */
    getRow(): number;

    /**
     * @returns col of cell in puzzle
     */
    getCol(): number;

    /**
     * @returns id of region cell belongs to
     */
    getCellRegion(): number;

    /**
     * @returns id of region cell (equal to cell's row + col value)
     */
    getCellID(): number;
}

/**
 * Tests for the Puzzle abstract data type.
 */
 describe('Puzzle', function () {
     /**
      * Testing partitions
      *     puzzle status: 
      *             solved, 
      *             unsolved: 
      *                 missing stars in row, too many stars in row
      *                 missing stars in col, too many stars in col
      *                 missing stars in region, too many stars in region
      *                 stars adjacent: horizontally adjacent, vertically adjacent, or diagonally adjacent
      *                   
      *     cells contained in region: disjoint, continuous
      * 
      *     handleMove():
      *           location of chosen cell: cell empty, cell contains star
      * 
      *    contents of Puzzle: puzzle is empty, puzzle is complete (solved), puzzle is partially-solved (non-empty but not solved)
      */
 });
