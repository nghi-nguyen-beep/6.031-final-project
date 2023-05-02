/* Copyright (c) 2021 MIT 6.031 course staff, all rights reserved.
 * Redistribution of original or derived work requires permission of course staff.
 */

import assert from 'assert';
import { Server } from 'http';
import express, { Application } from 'express';
import asyncHandler from 'express-async-handler';
import HttpStatus from 'http-status-codes';
import { parsedFile } from './PuzzleParser';


/**
 * HTTP web game server. The app runs the server that will call the board and mouse clicks to interact with the puzzle.
 */

const PORT = 8789;
export class StarbServer {

    private readonly app: Application;
    private server: Server | undefined;

    // Abstraction function:
    //  AF(server, requestedPort, app) = The app `app` that contains the server `server` that hosts the game on port `requestedPort` 
    //                                                   
    // Representation invariant:
    //   requestedPort = 8789
    // Safety from rep exposure:
    //   all fields are private
    //   server is only called within the start function, which does not return anything, thus server cannot be modified
    
    /**
     * Make a new web game server using puzzle that listens for connections on port.
     * 
     * @param requestedPort server port number
     */
    public constructor(
        private readonly requestedPort: number,
    ) {
        this.app = express();
        this.app.use((request, response, next) => {
            // allow requests from web pages hosted anywhere
            response.set('Access-Control-Allow-Origin', '*');
            next();
        });
        this.checkRep();

        /*
         * Handle a request for /start/<filename> by finding the file if it exists, and returning it as a string
         */
        this.app.get('/start/:filename', asyncHandler(async function(request, response) {
            const params = request.params;
            assert(params);
            const filename = params['filename'];
            if (filename !== undefined) {
                if (/[-A-Za-z0-9]$/.test(filename)) {
                    const puzzle: string = await parsedFile("puzzles/" + filename + ".starb");
                    
                    let dataNoCommentsString = "";
                    const data = puzzle.split('\n');
                    for (const line of data) {
                        if (!line.includes("#")) {
                            dataNoCommentsString += line + "\n";
                        }
                    }
                    const dataNoCommentsArray = dataNoCommentsString.split('\n');
                    const dimensions = dataNoCommentsArray[0];
                    let blankPuzzle = "" + dimensions?.toString() + '\n';
                    for (const region of dataNoCommentsArray.slice(1,11)) {
                        const solutions = region.split('|');
                        const blankRegion = " | " + solutions[0]?.trim() + " " + solutions[1]?.trim() + '\n';
                        blankPuzzle += blankRegion;
                    }
                    response
                    .status(HttpStatus.OK) // 200
                    .type('text')
                    .send(blankPuzzle);    
                } else {
                    response
                    .status(HttpStatus.NOT_FOUND) // 404
                    .type('text')
                    .send("filename can't be found");
                }
            }
        }));
        this.checkRep();
    }

    /**
     * @throws error if rep invariant broken
     */
    public checkRep(): void {
        assert(this.requestedPort === PORT);
    }

    /**
     * Start this server.
     * 
     * @returns (a promise that) resolves when the server is listening
     */
    public start(): Promise<void> {
        this.checkRep();
        return new Promise(resolve => {
            this.server = this.app.listen(this.requestedPort, () => {
                console.log('server now listening at', this.port);
                resolve();
            });
        });
    }

    /**
     * @returns the actual port that server is listening at. (May be different
     *          than the requestedPort used in the constructor, since if
     *          requestedPort = 0 then an arbitrary available port is chosen.)
     *          Requires that start() has already been called and completed.
     */
    public get port(): number {
        if(this.requestedPort !== PORT) {
            throw new Error("port 8789 should be used");
        }
        const address = this.server?.address() ?? 'not connected';
        if (typeof(address) === 'string') {
            throw new Error('server is not listening at a port');
        }
        this.checkRep();
        return address.port;
    }

    /**
     * Stop this server. Once stopped, this server cannot be restarted.
     */
    public stop(): void {
        this.server?.close();
        console.log('server stopped');
        this.checkRep();
    }
}

/**
 * Start a game server using the given arguments.
 * 
 * @throws Error if an error occurs parsing a file or starting a server
 */
async function main(): Promise<void> {
    const server: StarbServer = new StarbServer(PORT);
    await server.start();
}

if (require.main === module) {
    void main();
}
