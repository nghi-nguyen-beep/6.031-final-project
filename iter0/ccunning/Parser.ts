// BOARD ::= ROW "x" COLUMN NEWLINE (REGION NEWLINE)+
// REGION ::= STAR " " STAR " | " (COORDINATE){1,8}
// STAR ::= COORDINATE
// COORDINATE ::= INT "," INT
// ROW ::= INT
// COLUMN ::= INT
// INT ::= [0-10]
// NEWLINE ::= "\n"

// BOARD ::= REGION (REGION)+
// REGION ::= SQUARE (SQUARE)+
// SQUARE ::= STAR | BLANK | UNAVAILABLE
// STAR ::= "* (" INT ", " INT ")"
// BLANK ::= "  (" INT ", " INT ")"
// UNAVAILABLE ::= ". (" INT ", " INT ")"
// INT ::= [0-9]
