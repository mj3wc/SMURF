function bool(value) {
  return value ? 1 : 0
}

const operations = {
  "+": (l, r) => l + r,
  "-": (l, r) => l - r,
  "*": (l, r) => l * r,
  "/": (l, r) => Math.round(l / r),

  "<":  (l,r) => bool(l < r),
  "<=": (l,r) => bool(l <= r),
  "==": (l,r) => bool(l == r),
  ">=": (l,r) => bool(l >= r),
  ">":  (l,r) => bool(l > r),
  "!=": (l,r) => bool(l != r),

}

import Binding from "./binding.js"
import * as AST from "./ast.js"

export default class Interpreter {

  constructor(target, printFunction) {
    this.target = target
    this.printFunction = printFunction
    this.binding = new Binding()
  }

  visit() {
    return this.target.accept(this)
  }

  Assignment(node) {
    let variable = node.variable.accept(this)
    let expr     = node.expr.accept(this)
    this.binding.updateVariable(variable, expr)
    return expr
  }

  BinOp(node) {
    let l = node.l.accept(this)
    let r = node.r.accept(this)
    return operations[node.op](l, r)
  }

  FunctionCall(node) {
    let thunk = node.name.accept(this)
      let newBinding = thunk.binding.push()
      let args = node.args
      let params = thunk.formals
      if (args.length > 0) {
        params.forEach((param, i) => {
          params[i] = param[2].accept(this) //the 3rd element of each param is the actual arg, without the optional "," and _
        })
  
        args.forEach((arg, i) => {
          args[i] = arg[2].accept(this) //the 3rd element of each arg is the actual arg, without the optional "," and _
        })

        if (params.length != args.length) {
          throw new Error("Parameters and arguments are not equal in length")
        }
        
        params.forEach((param, i) => {
          newBinding.setVariable(param, args[i])
        })
      }
    
      this.binding = newBinding
      let code = thunk.code.accept(this)
      
      while (this.binding.parent != null) {
        this.binding = this.binding.pop()
      }
      return code
    }

  FunctionDefinition(node) {
    return new AST.Thunk(node.formals, node.code, this.binding)
  }

  IfStatement(node) {
    let predicate = bool(node.predicate.accept(this))

    if (predicate == 1)
      return node.thenCode.accept(this)

    return node.elseCode.accept(this)
  }

  IntegerValue(node) {
    return node.value
  }

  InternalPrint(node) {
    let args = node.args.map(a => a.accept(this).toString() )
    this.printFunction(args)
    return args
  }

  StatementList(node) {
    let result = 0
    node.statements.forEach(statement =>
      result = statement.accept(this)
    )
    return result
  }

  VariableDeclaration(node) {
    let variable = node.variable.accept(this)
    let initialValue = 0
    if (node.initialValue) {
      initialValue = node.initialValue.accept(this)
    }
    this.binding.setVariable(variable, initialValue)
    return initialValue
  }

  VariableName(node) {
    return node.name
  }

  VariableValue(node) {
    return this.binding.getVariableValue(node.name)
  }
}