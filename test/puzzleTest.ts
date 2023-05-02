import assert from 'assert';
import { Puzzle } from '../src/Puzzle';
import { Coordinate } from "../src/Coordinate";
import fs from 'fs';

const regions = new Map();

regions.set(0, new Set())
regions.set(1, new Set())
regions.set(2, new Set())
regions.set(3, new Set())
regions.set(4, new Set())
regions.set(5, new Set())
regions.set(6, new Set())
regions.set(7, new Set())
regions.set(8, new Set())
regions.set(9, new Set())

regions.get(0).add(new Coordinate(0, 0));
regions.get(0).add(new Coordinate(0, 1));
regions.get(0).add(new Coordinate(0, 2));
regions.get(0).add(new Coordinate(0, 3));
regions.get(0).add(new Coordinate(0, 4));
regions.get(0).add(new Coordinate(0, 5));
regions.get(0).add(new Coordinate(0, 6));
regions.get(0).add(new Coordinate(0, 7));
regions.get(0).add(new Coordinate(1, 0));
regions.get(0).add(new Coordinate(1, 1));
regions.get(0).add(new Coordinate(1, 2));
regions.get(0).add(new Coordinate(1, 3));
regions.get(0).add(new Coordinate(1, 4));
regions.get(0).add(new Coordinate(1, 5));
regions.get(0).add(new Coordinate(1, 7));
regions.get(0).add(new Coordinate(2, 4));

regions.get(1).add(new Coordinate(0, 8));
regions.get(1).add(new Coordinate(0, 9));
regions.get(1).add(new Coordinate(1, 8));
regions.get(1).add(new Coordinate(1, 9));
regions.get(1).add(new Coordinate(2, 8));
regions.get(1).add(new Coordinate(2, 9));
regions.get(1).add(new Coordinate(3, 8));
regions.get(1).add(new Coordinate(3, 9));
regions.get(1).add(new Coordinate(4, 8));
regions.get(1).add(new Coordinate(4, 9));
regions.get(1).add(new Coordinate(5, 8));
regions.get(1).add(new Coordinate(5, 9));
regions.get(1).add(new Coordinate(6, 9));
regions.get(1).add(new Coordinate(7, 9));

regions.get(2).add(new Coordinate(2, 1));
regions.get(2).add(new Coordinate(2, 2));
regions.get(2).add(new Coordinate(2, 3));

regions.get(3).add(new Coordinate(1, 6));
regions.get(3).add(new Coordinate(2, 5));
regions.get(3).add(new Coordinate(2, 6));
regions.get(3).add(new Coordinate(2, 7));
regions.get(3).add(new Coordinate(3, 7));

regions.get(4).add(new Coordinate(2, 0));
regions.get(4).add(new Coordinate(3, 0));
regions.get(4).add(new Coordinate(3, 1));
regions.get(4).add(new Coordinate(3, 2));
regions.get(4).add(new Coordinate(3, 3));
regions.get(4).add(new Coordinate(4, 0));
regions.get(4).add(new Coordinate(4, 1));
regions.get(4).add(new Coordinate(4, 2));
regions.get(4).add(new Coordinate(5, 0));
regions.get(4).add(new Coordinate(5, 1));
regions.get(4).add(new Coordinate(6, 0));
regions.get(4).add(new Coordinate(6, 1));
regions.get(4).add(new Coordinate(7, 0));
regions.get(4).add(new Coordinate(7, 1));
regions.get(4).add(new Coordinate(7, 2));
regions.get(4).add(new Coordinate(7, 3));
regions.get(4).add(new Coordinate(7, 4));
regions.get(4).add(new Coordinate(7, 5));
regions.get(4).add(new Coordinate(8, 0));

regions.get(5).add(new Coordinate(3, 4));
regions.get(5).add(new Coordinate(4, 3));
regions.get(5).add(new Coordinate(4, 4));
regions.get(5).add(new Coordinate(4, 5));
regions.get(5).add(new Coordinate(5, 3));
regions.get(5).add(new Coordinate(5, 4));
regions.get(5).add(new Coordinate(5, 5));

regions.get(6).add(new Coordinate(3, 5));
regions.get(6).add(new Coordinate(3, 6));
regions.get(6).add(new Coordinate(4, 6));
regions.get(6).add(new Coordinate(4, 7));
regions.get(6).add(new Coordinate(5, 6));
regions.get(6).add(new Coordinate(5, 7));
regions.get(6).add(new Coordinate(6, 5));
regions.get(6).add(new Coordinate(6, 6));
regions.get(6).add(new Coordinate(6, 7));
regions.get(6).add(new Coordinate(7, 6));
regions.get(6).add(new Coordinate(7, 7));

regions.get(7).add(new Coordinate(5, 2));
regions.get(7).add(new Coordinate(6, 2));
regions.get(7).add(new Coordinate(6, 3));
regions.get(7).add(new Coordinate(6, 4));

regions.get(8).add(new Coordinate(6, 8));
regions.get(8).add(new Coordinate(7, 8));
regions.get(8).add(new Coordinate(8, 8));
regions.get(8).add(new Coordinate(8, 9));
regions.get(8).add(new Coordinate(9, 9));

regions.get(9).add(new Coordinate(8, 1));
regions.get(9).add(new Coordinate(8, 2));
regions.get(9).add(new Coordinate(8, 3));
regions.get(9).add(new Coordinate(8, 4));
regions.get(9).add(new Coordinate(8, 5));
regions.get(9).add(new Coordinate(8, 6));
regions.get(9).add(new Coordinate(8, 7));
regions.get(9).add(new Coordinate(9, 0));
regions.get(9).add(new Coordinate(9, 1));
regions.get(9).add(new Coordinate(9, 2));
regions.get(9).add(new Coordinate(9, 3));
regions.get(9).add(new Coordinate(9, 4));
regions.get(9).add(new Coordinate(9, 5));
regions.get(9).add(new Coordinate(9, 6));
regions.get(9).add(new Coordinate(9, 7));
regions.get(9).add(new Coordinate(9, 8));




describe('Puzzle', function () {
    // Testing strategy:
    // functions: 
    //      addStar(row, col)
    //      isSolved()
    // 
    // addStar(row, col):
    //      row: 
    //          row = 0
    //          1 <= row <= 8
    //          row = 10
    //      col: 
    //          col = 0
    //          1 <= col <= 8
    //          col = 9
    //      outcome:
    //          star is added
    //          region is full
    //          column is full
    //          row is full
    //          star is adjacent to other star: horizontally, diagonally, or vertically
    // isSolved():
    //      output:
    //          true
    //          false

    // tests for addStar(row, col)
    it ('row = 0, col = 0, star is added', function(){
        const board: Set<Coordinate> = new Set();
        const puzzle = new Puzzle(regions, board);
        const puzzleWithStar = puzzle.addStar(0, 0);
        const newBoard = puzzleWithStar.getBoard();
        assert(newBoard.size === 1);
        for (const star of newBoard) {
            assert(star.getRow() === 0 && star.getCol() === 0);
        }
        assert.deepStrictEqual(regions, puzzleWithStar.getRegions());
    });

    it ('row = 1, col = 9, star is added', function(){
        const board: Set<Coordinate> = new Set();
        const puzzle = new Puzzle(regions, board);
        const puzzleWithStar = puzzle.addStar(1, 9);
        const newBoard = puzzleWithStar.getBoard();
        assert(newBoard.size === 1);
        for (const star of newBoard) {
            assert(star.getRow() === 1 && star.getCol() === 9);
        }
        assert.deepStrictEqual(regions, puzzleWithStar.getRegions());
    });

    it ('row = 9,  1 <= col <= 8, region is full', function(){
        const board: Set<Coordinate> = new Set();
        board.add(new Coordinate(8, 1));
        board.add(new Coordinate(9, 8));
        const puzzle = new Puzzle(regions, board);
        const puzzleWithStar = puzzle.addStar(9, 5);
        const newBoard = puzzleWithStar.getBoard();
        assert(newBoard.size === 2);
        assert.deepStrictEqual(board, newBoard);
        assert.deepStrictEqual(regions, puzzleWithStar.getRegions());
    });

    it (' 1 <= row <= 8,  1 <= col <= 8, column is full', function(){
        const board: Set<Coordinate> = new Set();
        board.add(new Coordinate(1, 4));
        board.add(new Coordinate(9, 4));
        board.add(new Coordinate(3, 6));
        const puzzle = new Puzzle(regions, board);
        const puzzleWithStar = puzzle.addStar(3, 4);
        const newBoard = puzzleWithStar.getBoard();
        assert(newBoard.size === 3);
        assert.deepStrictEqual(board, newBoard);
        assert.deepStrictEqual(regions, puzzleWithStar.getRegions());
    });

    it (' 1 <= row <= 8,  1 <= col <= 8, row is full', function(){
        const board: Set<Coordinate> = new Set();
        board.add(new Coordinate(5, 1));
        board.add(new Coordinate(5, 9));
        const puzzle = new Puzzle(regions, board);
        const puzzleWithStar = puzzle.addStar(5, 7);
        const newBoard = puzzleWithStar.getBoard();
        assert(newBoard.size === 2);
        assert.deepStrictEqual(board, newBoard);
        assert.deepStrictEqual(regions, puzzleWithStar.getRegions());
    });

    it ('row = 0,  1 <= col <= 8, diagonal adjacency error', function(){
        const board: Set<Coordinate> = new Set();
        board.add(new Coordinate(1, 6));
        board.add(new Coordinate(8, 8));
        const puzzle = new Puzzle(regions, board);
        const puzzleWithStar = puzzle.addStar(0, 7);
        const newBoard = puzzleWithStar.getBoard();
        assert(newBoard.size === 2);
        assert.deepStrictEqual(board, newBoard);
        assert.deepStrictEqual(regions, puzzleWithStar.getRegions());
    });

    it (' 1 <= row <= 8,  1 <= col <= 8, horizontal adjacency error', function(){
        const board: Set<Coordinate> = new Set();
        board.add(new Coordinate(3, 3));
        board.add(new Coordinate(6, 5));
        const puzzle = new Puzzle(regions, board);
        const puzzleWithStar = puzzle.addStar(3, 2);
        const newBoard = puzzleWithStar.getBoard();
        assert(newBoard.size === 2);
        assert.deepStrictEqual(board, newBoard);
        assert.deepStrictEqual(regions, puzzleWithStar.getRegions());
    });

    it (' 1 <= row <= 8,  1 <= col <= 8, vertical adjacency error', function(){
        const board: Set<Coordinate> = new Set();
        board.add(new Coordinate(3, 3));
        board.add(new Coordinate(6, 5));
        const puzzle = new Puzzle(regions, board);
        const puzzleWithStar = puzzle.addStar(4, 3);
        const newBoard = puzzleWithStar.getBoard();
        assert(newBoard.size === 2);
        assert.deepStrictEqual(board, newBoard);
        assert.deepStrictEqual(regions, puzzleWithStar.getRegions());
    });

    // tests for isSolved()
    it ('isSolved returns true', function(){
        const board: Set<Coordinate> = new Set();
        board.add(new Coordinate(0, 1));
        board.add(new Coordinate(0, 4));
        board.add(new Coordinate(1, 8));
        board.add(new Coordinate(3, 9));
        board.add(new Coordinate(2, 1));
        board.add(new Coordinate(2, 3));
        board.add(new Coordinate(1, 6));
        board.add(new Coordinate(3, 7));
        board.add(new Coordinate(5, 0));
        board.add(new Coordinate(8, 0));
        board.add(new Coordinate(4, 3));
        board.add(new Coordinate(4, 5));
        board.add(new Coordinate(5, 7));
        board.add(new Coordinate(7, 6));
        board.add(new Coordinate(6, 2));
        board.add(new Coordinate(6, 4));
        board.add(new Coordinate(7, 8));
        board.add(new Coordinate(9, 9));
        board.add(new Coordinate(8, 2));
        board.add(new Coordinate(9, 5));
        let puzzle = new Puzzle(regions, board);
        const solved = puzzle.isSolved();
        assert(solved);
    });

    it ('isSolved returns false', function(){
        const board: Set<Coordinate> = new Set();
        board.add(new Coordinate(0, 1));
        board.add(new Coordinate(0, 4));
        board.add(new Coordinate(1, 8));
        board.add(new Coordinate(3, 9));
        board.add(new Coordinate(2, 1));
        board.add(new Coordinate(2, 3));
        board.add(new Coordinate(1, 6));
        board.add(new Coordinate(3, 7));
        board.add(new Coordinate(5, 0));
        board.add(new Coordinate(8, 0));
        board.add(new Coordinate(4, 3));
        board.add(new Coordinate(4, 5));
        board.add(new Coordinate(5, 7));
        board.add(new Coordinate(7, 6));
        board.add(new Coordinate(6, 2));
        board.add(new Coordinate(6, 4));
        board.add(new Coordinate(7, 8));
        board.add(new Coordinate(9, 9));
        board.add(new Coordinate(8, 2));
        const puzzle = new Puzzle(regions, board);
        const solved = puzzle.isSolved();
        assert(!solved);
    });
});
