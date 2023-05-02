import assert from 'assert';
import { Coordinate } from './Coordinate';

const BOARDSIZE = 10;
const CANVASSIZE = 512;

export class StarBDraw {

    private readonly boardSize: number;
    private readonly canvasSize: number;
    private readonly canvas: HTMLCanvasElement;
    private readonly boxSize: number;

    // categorical colors from
    // https://github.com/d3/d3-scale-chromatic/tree/v2.0.0#schemeCategory10
    private readonly colors: Array<string> = [
        '#1f77b4',
        '#ff7f0e',
        '#2ca02c',
        '#d62728',
        '#9467bd',
        '#8c564b',
        '#e377c2',
        '#7f7f7f',
        '#bcbd22',
        '#17becf',
    ];

    // Abstraction function:
    //   AF(boxSize, boardSize, canvasSize, canvas) = drawing for puzzle represented with `canvas` element of webpage. The canvas has size `canvasSize`
    //                                                and the puzzle represented by StarbDraw is scaled to be same size as canvas by (canvasSize / boardSize)
    // Representation invariant:
    //   boardSize = 10
    //   canvasSize = 512
    // Safety from rep exposure:
    //   all methods are called within methods of Starbclient, which return immutable values
    //   all parameters are private and readonly

    /**
     * Create a new drawing instance to handle drawings for StarbClient
     * 
     * @param boardSize size of board
     * @param canvasSize canvasSize
     * @param canvas canvas for drawing
     */
    public constructor(boardSize: number, canvasSize: number, canvas: HTMLCanvasElement){
        this.boardSize = boardSize;
        this.canvasSize = canvasSize;
        this.canvas = canvas;
        this.boxSize = 32;
        this.checkRep();
    }

    private checkRep(): void {
        assert(this.boardSize === BOARDSIZE);
        assert(this.canvasSize === CANVASSIZE);
    }

    /**
     * Draw the puzzle state given from the puzzle 
     * 
     * @param regions to draw
     * @param board to place stars on puzzle for current state
     */
    public drawBoard(regions: Map<number, Set<Coordinate>>, board: Set<Coordinate>): void {
        const context = this.canvas.getContext('2d');
        assert(context, 'unable to get canvas drawing context');
        // translate the coordinate system of the drawing context:
        // the origin of `context` will now be (x,y)
        regions.forEach((value: Set<Coordinate>, key: number) => {
            context.fillStyle = this.colors[key] ?? assert.fail();
            for(const coord of value) {
                context.save();
                const x = (coord.getCol() + 1) * (this.canvasSize / this.boardSize);
                const y = (coord.getRow() + 1) * (this.canvasSize / this.boardSize);
                context.translate(x, y);

                // draw the outer outline box centered on the origin (which is now (x,y))
                context.strokeStyle = 'white';
                context.lineWidth = 2;
                context.strokeRect(-this.canvasSize / this.boardSize, -this.canvasSize / this.boardSize, this.canvasSize / this.boardSize, this.canvasSize / this.boardSize);

                // fill with a random semitransparent color
                context.fillRect(-this.canvasSize / this.boardSize, -this.canvasSize / this.boardSize, this.canvasSize / this.boardSize, this.canvasSize / this.boardSize);
                
                context.restore();
                }
            });

        for (const star of board) {
            context.save();
            const x = (star.getCol() + 1) * (this.canvasSize / this.boardSize);
            const y = (star.getRow() + 1) * (this.canvasSize / this.boardSize);
            context.translate(x, y);

            // draw the outer outline box centered on the origin (which is now (x,y))
            context.strokeStyle = 'white';
            context.strokeRect(-this.canvasSize / this.boardSize, -this.canvasSize / this.boardSize, this.boxSize, this.boxSize);

            context.fillStyle = 'white';
            context.fillRect(-this.canvasSize / this.boardSize, -this.canvasSize / this.boardSize, this.boxSize, this.boxSize);
            context.restore();
        }
        this.checkRep();
    }

    /**
     * Print a message by appending it to an HTML element.
     * 
     * @param outputArea HTML element that should display the message
     * @param message message to display
     */
    public printOutput(outputArea: HTMLElement, message: string): void {
        // append the message to the output area
        outputArea.innerText += message + '\n';

        // scroll the output area so that what we just printed is visible
        outputArea.scrollTop = outputArea.scrollHeight;
    }
}

