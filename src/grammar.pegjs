{
  const AST = options.AST
}

start
  = code

identifier
  = [a-z]([a-z][A-Z][0-9]_)*

///////////////////////// blocks (lists of statements) /////////////////////////

code
  = statement+

statement
  = "let" __ variable_declaration
  / assignment
  / expr

//////////////// variables & variable declaration /////////////////////////////

variable_declaration
  = variable_name "=" expr
  {return new AST.assignment(variable_name, expr)}
  / variable_name
  {return new AST.assignment(variable_name)}

variable_value             // as rvalue
  =  _ identifier
  {return new AST.VariableValue(identifier)}

variable_name              // as lvalue
  =  identifier
  {return AST.VariableName(identifier)}

//////////////////////////////// if/then/else /////////////////////////////

if_expression
  = _ "if" _ exp:expr _ block:brace_block _ "else" _ elseBlk:brace_block
  {return new AST.ifThenElse(exp, block, elseBlk)}
  / _"if" exp:expr block:brace_block
  {return new AST.ifThen(exp,block)}

///////////////////////////// assignment ///////////////////////////////////////
assignment
  = variable_name _"=" _ expr
  {return new AST.Assignment(variable_name, expr)}

//////////////////////////////// expression /////////////////////////////

expr
  = function_definition
  / if_expression
  / boolean_expression
  / arithmetic_expression


/////////////////////// boolean expression /////////////////////////////

boolean_expression
  = head:arithmentic_expression rest:(relop arithmentic_expression)*
  {return BinOp(head,rest)}

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
  = '==' / '!=' / '>=' / '>' / '<=' / '<'

  
//////////////////////////////// function call /////////////////////////////

function_call
  = variable_value "(" ")"     // note: no parameters

//////////////////////// function definition /////////////////////////////

function_definition
  = "fn" _ param: param_list _ code:brace_block
  {return new AST.FunctionDefinition(param,code)}

param_list
   = "("")"

brace_block
  = "{" _ code _"}"

space
  = [ \t\n\r]
_
 = space*

