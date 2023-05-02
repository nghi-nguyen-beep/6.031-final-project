/* Copyright (c) 2021 MIT 6.031 course staff, all rights reserved.
 * Redistribution of original or derived work requires permission of course staff.
 */

// This test file runs in Node.js, see the `npm test` script.
// Remember that you will *not* be able to use DOM APIs in Node, only in the web browser.
// See the *Testing* section of the project handout for more advice.

import assert from 'assert';
import { StarbServer } from '../src/StarbServer';
import fetch from 'node-fetch';

describe('server', function() {
    
    // Testing strategy
    //      partition on start endpoint
    //          - filename is valid
    //          - filename is invalid
    //      partition on port
    //          - port = 8789
    //          - port != 8789

    it('covers /start with valid file on port 8789', async function () {
        const server = new StarbServer(8789);
        await server.start();

        let url = `http://localhost:${server.port}/kd-1-1-1`;

        fetch(url).then((response) => {
            assert.strictEqual(response.status, 200);
            server.stop();
        });

        server.stop();
    });

    it('covers /start with invalid file on port 8789', async function () {
        const server = new StarbServer(8789);
        await server.start();

        let url = `http://localhost:${server.port}/kd-1-2-1`;

        fetch(url).then((response) => {
            assert.strictEqual(response.status, 500);
            server.stop();
        });

        server.stop();
    });

    it('covers port != 8789', async function () {
        assert.throws(() => {
            const server = new StarbServer(8888);
            server.stop();
        }, "Expected error to be thrown");
    });
    
});
