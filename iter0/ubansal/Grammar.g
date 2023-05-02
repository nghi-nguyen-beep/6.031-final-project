BOARD ::= REGION (REGION)+
REGION ::= SQUARE (SQUARE)+
SQUARE ::= STAR | BLANK | UNAVAILABLE
STAR ::= "* (" INT ", " INT ")"
BLANK ::= "  (" INT ", " INT ")"
UNAVAILABLE ::= ". (" INT ", " INT ")"
INT ::= [0-9]
