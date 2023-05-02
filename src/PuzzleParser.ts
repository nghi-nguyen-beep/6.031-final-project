import { Coordinate } from "./Coordinate";
import { Puzzle } from "./Puzzle";
import fs from 'fs';
import assert from 'assert';

import { ParseError, Parser, ParseTree, compile, visualizeAsUrl } from 'parserlib';

const puzzleDim = 10;

// https://stackoverflow.com/questions/23409731/cant-make-antlr4-grammar-skip-comments, referenced may 3


const grammar = ` 
@skip ignoring {
    BOARD ::= ROW "x" COLUMN NEWLINE (REGION NEWLINE)+;
    REGION ::= STAR* "|" (STAR)+ ;
    STAR ::=  INT "," INT ;
}
ROW ::= INT ;
COLUMN ::= INT ;
INT ::= [1-9][0-9]*;
NEWLINE ::= [\\n] ;
whitespace ::= [ \\t]+;
COMMENTLINE ::= "#" [^\\n]* NEWLINE;
ignoring ::= COMMENTLINE | whitespace;
`;

// the nonterminals of the grammar
enum PuzzleGrammar {
    Board, Region, Star, Coordinate, Row, Column, Int, Whitespace, Newline, commentLine, ignoring
}

// compile the grammar into a parser
const parser: Parser<PuzzleGrammar> = compile(grammar, PuzzleGrammar, PuzzleGrammar.Board);


/**
 * Make a new board by parsing a file.
 * 
 * 
 * @param filename path to puzzle file
 * @returns blank puzzle with regions as specified in filename
 * @throws Error if the file cannot be read or is not a valid star board
 */
export async function parseFromFile(filename: string): Promise<Puzzle>
{
    try
    {
        const promiseFiledata = await fs.promises.readFile(filename, { encoding: 'utf-8' });
        const parseTree: ParseTree<PuzzleGrammar> = parser.parse(promiseFiledata);
        const puzzle: Puzzle = makeAbstractSyntaxTree(parseTree);
        return puzzle;
    }
    catch
    {
        throw new ParseError("File cannot be parsed");
    }
}

/**
 * Make a new board by parsing an input text.
 * 
 * 
 * @param text to parse containing  "|" character in front of each region followed by a list of (1-indexed) ordered pairs of at least 2 ordered pairs, with 10 regions in total
 * @returns blank puzzle with regions as specified in text
 */
 export function parseFromText(text: string): Puzzle
    {
        const parseTree: ParseTree<PuzzleGrammar> = parser.parse(text);
        const puzzle: Puzzle = makeAbstractSyntaxTree(parseTree);
        return puzzle;
    }

/**
 * Returns a parsed file string representation after checking it against the grammar
 * 
 * 
 * @param filename path to puzzle file
 * @returns string of puzzle representation validating if it is a good puzzle
 * @throws Error if the file cannot be read or is not a valid star board
 */
 export async function parsedFile(filename: string): Promise<string>
 {
     try
     {
         const promiseFiledata = await fs.promises.readFile(filename, { encoding: 'utf-8' });
         const parseTree: ParseTree<PuzzleGrammar> = parser.parse(promiseFiledata);
         const puzzle: Puzzle = makeAbstractSyntaxTree(parseTree);
         return promiseFiledata;
         
     }
     catch
     {
         throw new ParseError("File cannot be parsed");
     }
 }
 

/**
 * Convert a parse tree into an abstract syntax tree.
 * 
 * @param parseTree constructed according to the grammar in Expression.g
 * @returns abstract syntax tree corresponding to the parseTree
 */
 function makeAbstractSyntaxTree(parseTree: ParseTree<PuzzleGrammar>): Puzzle {

    const boardMap: Map<number, Set<Coordinate>> = new Map();

    if (parseTree.name === PuzzleGrammar.Board) 
    {
        const puzzleRegions: Array<ParseTree<PuzzleGrammar>> = parseTree.childrenByName(PuzzleGrammar.Region);

        const puzzleRow: Array<ParseTree<PuzzleGrammar>> = parseTree.childrenByName(PuzzleGrammar.Row);
        const puzzleCol: Array<ParseTree<PuzzleGrammar>> = parseTree.childrenByName(PuzzleGrammar.Column);

        assert(puzzleRow.length && puzzleRow[0] !== undefined, "Expected Row");
        assert(puzzleCol.length && puzzleCol[0] !== undefined, "Expected Column");

        const row: number = parseInt(puzzleRow[0].text);
        const col: number = parseInt(puzzleCol[0].text);

        assert(row !== undefined && row === puzzleDim, "Expected 10 rows");
        assert(col !== undefined && col === puzzleDim, "Expected 10 cols");

        assert(puzzleRegions.length === puzzleDim, 'Expect node to have 10 regions');

        // iterate through each region
        for (let i = 0; i < puzzleRegions.length; i++)
        {
            const regionInfo = puzzleRegions[i];
            assert(regionInfo !== undefined);
            const starInfo = regionInfo.childrenByName(PuzzleGrammar.Star);
            assert(starInfo!== undefined && starInfo.length >= 2, "Expected at least 2 stars in a region");

            for (let j = 0; j < starInfo.length; j++)
            {
                const starRow = starInfo[j];
                assert (starRow !== undefined);
                const coordInfo = starRow.childrenByName(PuzzleGrammar.Int);
                assert(coordInfo !== undefined && coordInfo.length == 2, "Expected 2 coordiantes in each star");
                assert(coordInfo[0]!== undefined && coordInfo[1] !== undefined);

                // need 0-indexing
                const row: number = parseInt(coordInfo[0].text) - 1; 
                const col: number = parseInt(coordInfo[1].text) - 1;

                const boardSet: Set<Coordinate> = new Set();

                if (j == 0){
                    boardSet.add(new Coordinate(row, col));

                    boardMap.set(i, boardSet);
                }
                else{
                    const boardRegionSet = boardMap.get(i);
                    assert(boardRegionSet !== undefined);
                    boardRegionSet.add(new Coordinate(row, col));
                }
            }

        }
    }
    // pass in empty set for Parser to match puzzle spec
    return new Puzzle(boardMap, new Set());
 }