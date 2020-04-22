{
  const AST = options.AST
}

start
  = code
identifier
  = [a-z]([a-z][A-Z][0-9]_)*

///////////////////////////////////////////////////////////////////////////////////////////////////

code
  = term:statement+
  {return new AST.StatementList(term)}

statement
  = "let" _ term:variable_declaration
  {return term}
  / term:assignment
  {return term}
  / term:expr
  {return term}

///////////////////////////////////////////////////////////////////////////////////////////////////
variable_declaration
  = _ left:variable_name _ "=" _ right:expr _
  {return new AST.Assignment(left, right)}
  / term:variable_name
  {return new AST.Assignmetn(term, new AST.Integer(1))}

variable_value
  = id:identifier
  {return new AST.VariableValue(id.join(""))}

variable_name
  = id:identifier
  {return new AST.VariableName(id.join(""))}

///////////////////////////////////////////////////////////////////////////////////////////////////
if_expression
  = _ predicate:expr _ thenCode:brace_block _ "else" _ elseCode:brace_block  _
  {return new AST.IfStatement(predicate, thenCode, elseCode)}
  / predicate:expr _ elseCode:brace_block
  {return new AST.IfStatement(predicate, elseCode, "")}

///////////////////////////////////////////////////////////////////////////////////////////////////
assignment
  = left:variable_name _ "=" _ right:expr
  {return new AST.Assignment(left, right)}
///////////////////////////////////////////////////////////////////////////////////////////////////
expr
  = "fn" _ function_definition
  / _ "if" _ term:if_expression
  {return term}
  / term:boolean_expression
  {return term}
  / term:arithmetic_expression
  {return term}
///////////////////////////////////////////////////////////////////////////////////////////////////
boolean_expression
  = _ head:arithmetic_expression _ rest:(relop right:arithmetic_expression)* _
  {return rest.reduce((result, [op, right])=>
    new AST.BinOp(result, op, right), head)
      }
//////////////////// arithmetic expression /////////////////////////////

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

relop
  = _ ('==' / '!=' / '>=' / '>' / '<=' / '<') _

  
//////////////////////////////// function call /////////////////////////////

function_call
  = var:variable_value _ "(" _ ")" _   // note: no parameters
  {return new AST.FunctionCall(var, "")}

//////////////////////// function definition /////////////////////////////

function_definition
  =  _ param: param_list _ code:brace_block _
  {return new AST.FunctionDefinition(param,code)}

param_list
   = "(" ")"

brace_block
  = "{" _ code:code _"}"
  {return code}

space
  = [ \t\n\r]
_
 = space*

