import assert from 'assert';
import { Puzzle } from '../src/Puzzle';
import fs from 'fs';
import { ParseError, Parser, ParseTree, compile, visualizeAsUrl } from 'parserlib';
import { parseFromFile } from '../src/PuzzleParser';

import { Coordinate } from "../src/Coordinate";


describe('ParsePuzzle', async function () {

    // Testing strategy:
        // function: parseFromFile
            // partition on filename: valid, invalid

    it ('parser throws error for invalid filename', async function(){
        try{
            await parseFromFile("puzzles/kd-1-2-4.starb");
        }
        catch{
            assert(true); // caught error 
        }
        finally{
            assert("Expected to throw error for invalid filename");
        }
    });
    

    it ('parser correctly parses valid filename', async function(){
        let promiseResult;

        try{
            promiseResult = await parseFromFile("puzzles/kd-1-1-1.starb");
        }
        catch{
            assert(false, "Expected valid filename to parse"); // caught error 
        }
        finally{
            assert(promiseResult !== undefined);
            const regionsMap = promiseResult.getRegions();

            // check all coordinates there for regions
            const coordOneSet = new Set([new Coordinate(0,1), new Coordinate(0,4), new Coordinate(0,0), new Coordinate(0,2),
                new Coordinate(0,3), new Coordinate(0,5), new Coordinate(0,6), new Coordinate(0,7), new Coordinate(1,0),
                new Coordinate(1,1), new Coordinate(1,2), new Coordinate(1,3), new Coordinate(1,4), new Coordinate(1,5), new Coordinate(1,7),
                new Coordinate(2,4)]);

            assert.deepStrictEqual(regionsMap.get(0), coordOneSet), "Expected correct coordinates in region";

            const coordTwoSet = new Set([new Coordinate(1,8), new Coordinate(3,9), new Coordinate(0,8), new Coordinate(0,9),
                new Coordinate(1,9), new Coordinate(2,8), new Coordinate(2,9), new Coordinate(3,8),
                new Coordinate(4,8), new Coordinate(4,9), new Coordinate(5,8), new Coordinate(5,9), new Coordinate(6,9),
                new Coordinate(7,9)]);
    
            assert.deepStrictEqual(regionsMap.get(1), coordTwoSet), "Expected correct coordinates in region";

            const coordThreeSet = new Set([new Coordinate(2,1), new Coordinate(2,3), new Coordinate(2,2)]);
            assert.deepStrictEqual(regionsMap.get(2), coordThreeSet), "Expected correct coordinates in region";

            const coordFourSet = new Set([new Coordinate(1,6), new Coordinate(3,7), new Coordinate(2,5),
            new Coordinate(2,6), new Coordinate(2,7)]);
            assert.deepStrictEqual(regionsMap.get(3), coordFourSet), "Expected correct coordinates in region";

            const coordFiveSet = new Set([new Coordinate(5,0), new Coordinate(8,0), new Coordinate(2,0), new Coordinate(3,0),
                new Coordinate(3,1), new Coordinate(3,2), new Coordinate(3,3), new Coordinate(4,0),
                new Coordinate(4,1), new Coordinate(4,2), new Coordinate(5,1), new Coordinate(6,0), new Coordinate(6,1),
                new Coordinate(7,0), new Coordinate(7,1), new Coordinate(7,2), new Coordinate(7,3), 
                new Coordinate(7,4), new Coordinate(7,5)]);
            assert.deepStrictEqual(regionsMap.get(4), coordFiveSet), "Expected correct coordinates in region";

            const coordSixSet = new Set([new Coordinate(4,3), new Coordinate(4,5), new Coordinate(3,4), new Coordinate(4,4),
            new Coordinate(5,3), new Coordinate(5,4), new Coordinate(5,5)]);
            assert.deepStrictEqual(regionsMap.get(5), coordSixSet), "Expected correct coordinates in region";

            const coordSeven = new Set([new Coordinate(5,7), new Coordinate(7,6), new Coordinate(3,5), new Coordinate(3,6),
                new Coordinate(4,6), new Coordinate(4,7), new Coordinate(5,6),
                new Coordinate(6,5), new Coordinate(6,6), new Coordinate(6,7), new Coordinate(7,7)]);
            assert.deepStrictEqual(regionsMap.get(6), coordSeven), "Expected correct coordinates in region";
    
            const coordEight = new Set([new Coordinate(6,2), new Coordinate(6,4), new Coordinate(5,2), new Coordinate(6,3)]);
            assert.deepStrictEqual(regionsMap.get(7), coordEight), "Expected correct coordinates in region";

            const coordNine = new Set([new Coordinate(7,8), new Coordinate(9,9), new Coordinate(6,8), new Coordinate(8,8),
            new Coordinate(8,9)]);
            assert.deepStrictEqual(regionsMap.get(8), coordNine), "Expected correct coordinates in region";

            const coordTenSet = new Set([new Coordinate(8,2), new Coordinate(9,5), new Coordinate(8,1), new Coordinate(8,3),
                new Coordinate(8,4), new Coordinate(8,5), new Coordinate(8,6), new Coordinate(8,7), new Coordinate(9,0),
                new Coordinate(9,1), new Coordinate(9,2), new Coordinate(9,3), new Coordinate(9,4), new Coordinate(9,6), new Coordinate(9,7),
                new Coordinate(9,8)]);

            assert.deepStrictEqual(regionsMap.get(9), coordTenSet), "Expected correct coordinates in region";

        }
    });
});
