// Testing Strategy
//  Partition on input
//      - partition on location
//      
//  Partition on output
// Manual tests
//    covers: player adds star to region and not solving
//      0. open server to game
//      1. player A clicks on spot in region with => 3 spaces => spot has star and every other location has no star
//      2. player A clicks on another spot in same region => region should have two stars
//      3. player A clicks on another spot in same region => region should have two stars still, with no star added in the most recently selected spot
//      4. player A clicks on same spot from step 2  => region should have one star, with no star in the most recently selected spot
//      5. player A clicks on same spot from step 3 ==> region should have 2 stars, one from step 1 and one in spot most recently selected

//    covers: player solves game
//      0. open server to game
//      1. player A clicks on spot in region with => 3 spaces => spot has star and every other location has no star
//      2. player A clicks on another spot in same region => region should have two stars
//      3. player A clicks on another spot in same region => region should have two stars still, with no star added in the most recently selected spot
//      4. player A clicks on same spot from step 2  => region should have one star, with no star in the most recently selected spot
//      5. player A clicks on same spot from step 3 ==> region should have 2 stars, one from step 1 and one in spot most recently selected
//      6. repeat steps 1-5 until board is complete and correct.
//      7. On last addition to correct star, the game ends and congratulatory message appears. No spots on board can be altered

