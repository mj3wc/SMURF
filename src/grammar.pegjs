{
  const AST = options.AST
}

arithmetic_expression
	= _ head:mult_term _ rest:(addop mult_term)* _
        { return rest.reduce(
            (result, [op, right]) => new AST.BinOp(result, op, right), head
          )
        }

mult_term
	= _ head:primary _ rest:(mulop primary)* _
        { return rest.reduce(
            (result, [op, right]) => new AST.BinOp(result, op, right), head
          )
        }

primary
	= _ "(" _ exp:arithmetic_expression _ ")" _
    {return exp}
    / integer

  // / function_call                  // I”ve commented these
  // / variable_value                 // two out for now

integer
	= _ '+' _ term:digits _
    {return new AST.Integer(parseInt(term.join(""), 10))}
    / _ '-' _ term:digits _
    {return new AST.Integer(parseInt(term.join(""), 10)*-1)}
    / _ term:digits _
    {return new AST.Integer(parseInt(term.join(""), 10))}

digits
	= nums+

nums
= ("0" / "1" / "2" / "3" / "4" / "5" / "6" / "7" / "8" / "9")

addop
	= '+' / '-'
  
mulop
	= '*' / '/'

space
  = [ \t\n\r]
_
 = space*