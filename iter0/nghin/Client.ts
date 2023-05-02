/* Copyright (c) 2021 MIT 6.031 course staff, all rights reserved.
 * Redistribution of original or derived work requires permission of course staff.
 */

import assert from 'assert';
import { Server } from 'http';
import express, { Application } from 'express';
import asyncHandler from 'express-async-handler';
import HttpStatus from 'http-status-codes';
import { Puzzle } from './Puzzle';
import { Coordinate } from './Coordinate';

/**
 * HTTP web game server. The app runs the server that will call the board and allow multiple
 * players to interact with the board.
 */

export class Client {

    private readonly app: Application;
    private server: Server|undefined;

    // Abstraction function:
    //  AF(server, app, puzzle) = The app `app` that contains the server `server` that hosts the board `puzzle` for the client to interact with 
    // Representation invariant:
    //   
    // Safety from rep exposure:
    //   
    /**
     * Make a new web game server using board that listens for connections on port.
     * 
     * @param puzzle shared game board
     */
    public constructor(
        private readonly puzzle: Puzzle, 
    ) {
        this.puzzle = puzzle;
        this.app = express();
        this.app.use((request, response, next) => {
            // allow requests from web pages hosted anywhere
            response.set('Access-Control-Allow-Origin', '*');
            next();
        });
    }

    /**
     * Has listener that listens to mouse click and 
     * returns location of where it was clicked on board in form of [row, col]
     */
    public clickLocation(): Array<Coordinate> {
        throw new Error("not implemented yet");
    }
}
