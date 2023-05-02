import assert from 'assert';
import { Server } from 'http';
import express, { Application } from 'express';
import asyncHandler from 'express-async-handler';
import HttpStatus from 'http-status-codes';
import { Puzzle } from './Puzzle';

export class Client {

    private readonly app:Application;
    private server:Server;
    private puzzle:Puzzle;
    private portRequest:number;

    
    public constructor(puzzle: Puzzle) {
        this.puzzle = puzzle;
        this.portRequest = 8789;
        this.app = express();
        this.app.use((request, response, next) => {
            response.set(new Puzzle()); // return blank puzzle
            next();
        });
    }


    public start(): Promise<void> {
        return new Promise(resolve => {
            this.server = this.app.listen(this.portRequest, () => {
                console.log('server now listening at', this.port);
                resolve();
            });
        });
    }
}