import assert from 'assert';

describe('server', function() 
{
    // Manual testing strategy for client-server integration

    // Partition on filename validity: valid, invalid

    // Partition on system recognizing puzzle status: puzzle unsolved, puzzle solved

        // unsolved puzzles: 
            //  missing stars in row, too many stars in row
            //  missing stars in col, too many stars in col
            //  missing stars in region, too many stars in region
            //  stars adjacent: horizontally adjacent, vertically adjacent, or diagonally adjacent
  
    // Parition on cell selected by client: contains star, does not contain star (empty)

    /*
    * Manual test: does not load puzzle from invalid file
    * Covers: invalid filename
    * 1. browse to server http address and pass argument of invalid filename => assert helpful Error message shows
    */

    /*
    * Manual test: loads puzzle from valid filename
    * Covers: valid filename
    * 1. browse to server http address and pass argument of valid filename => assert that blank 10x10 puzzle matching file loads
    */

    /*
    * Manual test: client can place star in empty cell
    * Covers: cell does not contain star
    * 1. browse to server http address and pass argument of valid filename => assert that blank 10x10 puzzle matching file loads
    * 2. select location of an empty cell that does not contain a star => assert that a star now appears in that cell
    */

    /*
    * Manual test: client can remove star from cell
    * Covers: cell contains star
    * 1. browse to server http address and pass argument of valid filename => assert that blank 10x10 puzzle matching file loads
    * 2. select location of an empty cell that does not contain a star => assert that a star now appears in that cell
    * 3. select that cell again => assert that the cell now appears empty (no stars)
    */

    /*
    * Manual test: system recognizes when puzzle solved
    * Covers: puzzle solved
    * 1. browse to server http address and pass argument of valid filename => assert that blank 10x10 puzzle matching file loads
    * 2. select location of an empty cell that does not contain a star => assert that a star now appears in that cell
    * 3. repeat Step 2 again such that solvability conditions are met (as defined in the handout) => assert that webpage shows puzzle as solved
    */

    /*
    * Manual test: system recognizes when star cannot be added
    * Covers: puzzle unsolved due to horizontally-adjacent stars
    * 1. browse to server http address and pass argument of valid filename => assert that blank 10x10 puzzle matching file loads
    * 2. select location of an empty cell that does not contain a star => assert that a star now appears in that cell
    * 3. select location of an empty cell horizontally adjacent to the one previously selected => assert that webpage does not add a star in the new location
    */

    /*
    * Manual test: system recognizes when star cannot be added
    * Covers: puzzle unsolved due to vertically-adjacent stars
    * 1. browse to server http address and pass argument of valid filename => assert that blank 10x10 puzzle matching file loads
    * 2. select location of an empty cell that does not contain a star => assert that a star now appears in that cell
    * 3. select location of an empty cell vertically adjacent to the one previously selected => assert that webpage does not add a star in the new location
    */

    /*
    * Manual test: system recognizes when star cannot be added
    * Covers: puzzle unsolved due to diagonally-adjacent stars
    * 1. browse to server http address and pass argument of valid filename => assert that blank 10x10 puzzle matching file loads
    * 2. select location of an empty cell that does not contain a star => assert that a star now appears in that cell
    * 3. select location of an empty cell diagonally adjacent to the one previously selected  => assert that webpage does not add a star in the new location
    */

    /*
    * Manual test: system recognizes when star cannot be added
    * Covers: puzzle unsolved due to too many stars in a region
    * 1. browse to server http address and pass argument of valid filename => assert that blank 10x10 puzzle matching file loads
    * 2. select location of an empty cell that does not contain a star => assert that a star now appears in that cell
    * 3. Repeat Step 2 against such that there is exactly two stars in each region, except one => assert that webpage shows puzzle as unsolved
    * 4. Select location of an empty cell in a region already containing two stars => assert that webpage does not add a star in the new location
    */

    /*
    * Manual test: system recognizes when a star cannot be added
    * Covers: puzzle unsolved due to too many stars in a column
    * 1. browse to server http address and pass argument of valid filename => assert that blank 10x10 puzzle matching file loads
    * 2. select location of an empty cell that does not contain a star => assert that a star now appears in that cell
    * 3. Repeat Step 2 against such that there is exactly two stars in each column except for one column, where there is one star => assert that webpage shows puzzle as unsolved
    * 4. Select location of an empty cell in a column already containing two stars => assert that webpage does not add a star in the new location
    */

    /*
    * Manual test: system recognizes when a star cannot be added
    * Covers: puzzle unsolved due to too many stars in a row
    * 1. browse to server http address and pass argument of valid filename => assert that blank 10x10 puzzle matching file loads
    * 2. select location of an empty cell that does not contain a star => assert that a star now appears in that cell
    * 3. Repeat Step 2 against such that there is exactly two stars in each row except for one row, where there is one star => assert that webpage shows puzzle as unsolved
    * 4. Select location of an empty cell in a row already containing two stars => assert that webpage does not add a star in the new location
    */

});