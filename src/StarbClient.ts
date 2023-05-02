/* Copyright (c) 2021 MIT 6.031 course staff, all rights reserved.
 * Redistribution of original or derived work requires permission of course staff.
 */

/**
 * Mutable type representing a client who plays the puzzle and mutates it by making moves
 * 
 */

 import assert from 'assert';
 import { Coordinate } from './Coordinate';
 import { StarBDraw } from './Draw';
 import { Puzzle } from './Puzzle';
 import { parseFromText } from './PuzzleParser';
 
 const boardSize = 10;
 const canvasSize = 512;
 const PUZZLE = "kd-6-31-6";
 
 export class StarbClient {

    private puzzle: Puzzle;
    private solved: boolean;

     // Abstraction function:
     //   AF(puzzle, canvas, drawingClient, solved) = 
     //                                 the client that has a puzzle `puzzle` on canvas `canvas` element of webpage and as a drawing is represented by drawingClient
     //                                 user has solved puzzle if solved = True, else puzzle unsolved
     // Representation invariant:
     //   true
     // Safety from rep exposure:
     //   all fields are private and all public method return values are immutable
     //
     // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

     /**
      * Create client instance
      * 
      * @param puzzle puzzle object 
      */
     public constructor(puzzle: Puzzle) {
        this.puzzle = puzzle;
        this.solved = false; // puzzle starts as unsolved
        const outputArea: HTMLElement = document.getElementById('outputArea') ?? assert.fail('missing output area');
        const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement ?? assert.fail('missing drawing canvas');

        const drawingClient: StarBDraw = new StarBDraw(boardSize, canvasSize, canvas);
        
        canvas.addEventListener('click', (event: MouseEvent) => {
                if (!this.solved){
                    this.puzzle = this.makeMove(event.offsetX, event.offsetY);
                    drawingClient.drawBoard(this.puzzle.getRegions(), this.puzzle.getBoard());
                    if (this.puzzle.isSolved())
                    {
                        drawingClient.printOutput(outputArea, `Game Over! You solved the puzzle`); 
                        this.solved = true;
                    }
                }
            });

        drawingClient.drawBoard(this.puzzle.getRegions(), this.puzzle.getBoard());

        drawingClient.printOutput(outputArea, `Welcome to Star Battle! Click on the board to start placing stars.\n Please click within the cell you wish to place your stars. The following rules apply: \n No more than two stars can be in one region\n Now row nor column could have more than two stars\nStars may not be adjacent, even diagonally\n\nYou will not be allowed to place stars if any of this conditions are violated. To remove stars, select on the same spot that has the star`);
        this.checkRep();
     }
 
     private checkRep(): void {
         return;
     }

    /**
     * Helper function to convert canvas coordinates to board coordinates
     * 
     * @param x mouse coordinate that was selected
     * @param y mouse coordinate that was selected
     * @returns board coordinates
     */
    private convertCanvasCoordToBoardCoord(x: number, y: number): Coordinate {
        const row = Math.floor(y / (canvasSize / boardSize));
        const col = Math.floor(x / (canvasSize / boardSize));

        return new Coordinate(row, col);
    }
 
     /**
      * Modifies puzzle by selecting cell to add / remove star from puzzle
      * 
      * @param x mouse coordinate that was selected
      * @param y mouse coordinate that was selected
      * @returns new puzzle state after move
      */
     public makeMove(x: number, y: number): Puzzle {
        const boardCoordinate: Coordinate = this.convertCanvasCoordToBoardCoord(x, y);
        return this.puzzle.addStar(boardCoordinate.getRow(), boardCoordinate.getCol());
     }
 }
 
 /**
  * Factory function to create new instance of StarbClient from filename data
  * 
  * @param filename file containing star game data
  * @returns promise of StarBClient
  */
 export async function createClient(filename: string): Promise<StarbClient>
 {
    const response = await fetch('http://localhost:8789/start/' + filename).then(response => {
        return response;}
    );

    const responseText = await response.text();
    const puzzle: Puzzle = parseFromText(responseText); // split string to get puzzle info 
    return new StarbClient(puzzle);
 
    
 }
 
 /**
  * Set up the Client page.
  */
 async function main(): Promise<void> {
    const client = await createClient(PUZZLE);
  }
  

void main();
