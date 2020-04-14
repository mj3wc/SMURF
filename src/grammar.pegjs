{
    const AST = options.AST
}

arithmentic_expression
  = head:mult_term rest:(addop mult_term)*
        {return rest.reduce(
            (result, [operator, right]) => new AST.BinOp(result, operator, right),
            head
        )
        }
mult_term
  = head:primary rest:(mulop primary)*
primary
  = left:integer right: "(" arithmentic_expression ")"
integer
  = [0-9]+
addop
  = '+' / '-'
mulop
  = '*' / '/'