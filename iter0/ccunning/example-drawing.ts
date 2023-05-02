// draw board (blank upon initialization)

import assert from 'assert';

const BOX_SIZE = 20;

// categorical colors from
// https://github.com/d3/d3-scale-chromatic/tree/v2.0.0#schemeCategory10
const COLORS: Array<string> = [
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

// semitransparent versions of those colors
const BACKGROUNDS = COLORS.map( (color) => color + '60' );

function drawPuzzle(canvas: HTMLCanvasElement): void 
{
    const context = canvas.getContext('2d');

    context.strokeStyle = 'black';
    context.lineWidth = 2;

    //outline of rectangle
    context.strokeRect(-BOX_SIZE/2, -BOX_SIZE/2, BOX_SIZE, BOX_SIZE);

    for (let i = 0; i < 10; i++) // 10 cols
    {
        for (let j = 0; j < 10; j++) // 10 rows
        // 100 indiv cells in big rectangle
        {
            context.strokeRect(-BOX_SIZE/2+BOX_SIZE/10*i, -BOX_SIZE/2+BOX_SIZE/10*j, BOX_SIZE/10, BOX_SIZE/10);
            context.fillStyle = BACKGROUNDS[j] ?? assert.fail(); // fill each region with diff color (here regions are horizontal levels)
            context.fillRect(-BOX_SIZE/2+BOX_SIZE/10*i, -BOX_SIZE/2+BOX_SIZE/10*j, BOX_SIZE/10, BOX_SIZE/10);
        }
    }

}

// draw circle (rep. a star)
function drawCircle(canvas: HTMLCanvasElement, xLeftCell: number, yTopCell: number): void 
{
    const radius = 2;
    const context = canvas.getContext('2d');
    // draw circle w/ 360 or 2 pi radian degree rotation
    context.ellipse(xLeftCell + radius, yTopCell+radius, radius, radius, 2*3.14, 0, 2*3.14);
}

// draw circle (rep. a star)
function undoCircule(canvas: HTMLCanvasElement, xLeftCell: number, yTopCell: number, regionColor: string): void 
{
    // redraw cell to remove circircle

    const context = canvas.getContext('2d');
    context.strokeRect(xLeftCell, yTopCell, BOX_SIZE/10, BOX_SIZE/10);
    context.fillStyle = regionColor ?? assert.fail(); // fill each region with diff color (here regions are horizontal levels)
    context.fillRect(xLeftCell, yTopCell, BOX_SIZE/10, BOX_SIZE/10);
}


// call when puzzle solved to signal to user
function solved(canvas: HTMLCanvasElement): void 
{
    const context = canvas.getContext('2d');
    context.fillText("SOLVED", 0, 0);
}

// call if puzzle not yet completed
function unsolved(canvas: HTMLCanvasElement): void 
{
    const context = canvas.getContext('2d');
    context.fillText("UNSOLVED", 0, 0);
}