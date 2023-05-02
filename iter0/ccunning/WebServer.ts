/**
 * HTTP web game server.
 */ 
 export interface WebServer
 {   
    // Abstraction function:
    // AF(app, server) = a webserver with router app and server server

    // Representation invariant:
    // all server requests are on port 8789

    // Safety from rep exposure:
    //   all fields are private and unreassignable
    //   all method inputs and outputs are immutable, so the rep is not exposed 


    /**
     * Start this server.
     * 
     * @returns (a promise that) resolves when the server is listening
     */
    start(): Promise<void>; 

    /**
     * @returns the actual port that server is listening at.
     *          Requires that start() has already been called and completed.
     */
    getPort(): number;

    /**
     * Stop this server. Once stopped, this server cannot be restarted.
     */
    stop(): void;

    /**
     * Send a blank puzzle to client based on filename
     */
    get(filePath: '/send/:fileName');

 }
 
 /**
  * Tests for the Puzzle abstract data type.
  */
  describe('WebServer', function () {
      /**
       * Testing partitions
       * 
       *     partition on fileName validity: valid, invalid
       * 
       *     partition on number of requests per fileName during game: 0, 1, >1
       * 
       *     partition on number of Stars in puzzle (as determined by client): 0, 1, >1
       */
  });
 