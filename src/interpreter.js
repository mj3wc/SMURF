const Operations = {
    "+": (l, r) => l + r,
    "-": (l, r) => l - r,
    "*": (l, r) => l * r,
    "/": (l, r) => Math.round(l / r),
    "==": (l, r) => l == r,
    "!=": (l, r) => l != r,
    ">=": (l, r) => l >= r,
    ">": (l, r) => l > r,
    "<=": (l, r) => l <= r,
    "<": (l, r) => l < r,
  }

export default class Interpreter{
    constructor(target, printFunction){
        this.binding = new Map()
    }

    visit(node){
        return node.accept(this)
    }

    visitBinOp(node) {
        let l = node.left.accept(this)
        let r = node.right.accept(this)
        if (Operations[node.op](l, r) == true) {
          return 1;
        }
        if (Operations[node.op](l, r) == false) {
          return 0;
        }
        return Operations[node.op](l, r)
      }

    visitInteger(node){
        return node.value
    }

    Assignment(node){
        let variable = node.variable.accept(this)
        let expr = node.expr.accept(this)
        this.setVariable(variable, expr)
        return expr
    }

    VariableName(node){
        return node.name
    }

    VariableValue(node){
        return this.getValue(node.value)
    }

    getValue(name){
        let temp = this.binding.get(name)
        if(temp == undefined)
            return 0
        else
            return this.binding.get(name)
    }

    setVariable(name, value){
        this.binding.set(name, value)
        console.log(this)
    }

    IfStatement(node){
        let isTrue = node.predicate.accept(this)
        if(isTrue)
            return node.thenCode.accept(this)
        else
            return node.elseCode.accept(this)
    }

    StatementList(node){
        let statements = node.statements
        var toReturn
        for(let i = 0; i < statements.length; i++)
            toReturn = node.statements[i].accept(this)
        return toReturn
    }

    FunctionDefinition(node){
        return node.code
    }

    FunctionCall(node){
        let bodyAST = node.name.accept(this)
        return bodyAST.accept(this)
    }
}