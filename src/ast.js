export class BinOp{
    constructor(l, op, r){
        this.left = l
        this.operator = op
        this.right = r
    }

    accept(visitor){
        return visitor.visitBinOp(this)
    }
}

export class Integer{
    constructor(val){
        this.value = val
    }

    accept(visitor){
        return visitor.visitInteger(this)
    }
}

export class Assignment{
    constructor(l,r){
        this.variable = l
        this.expr = r
    }

    accept(visitor){
        return visitor.Assignment(this)
    }
}

export class VariableName{
    constructor(name){
        this.name = name
    }

    accept(visitor){
        return visitor.VariableName(this)
    }
}

export class VariableValue{
    constructor(name){
        this.name = name
    }

    accept(visitor){
        return visitor.VariableValue(this)
    }
}

export class IfStatement{
    constructor(predicate, thenCode, elseCode){
        this.predicate = predicate
        this.thenCode = thenCode
        this.elseCode = elseCode
    }

    accept(visitor){
        return visitor.IfStatement(this)
    }
}

export class StatementList{
    constructor(statements){
        this.statements = statements
    }

    accept(visitor){
        return visitor.StatementList(this)
    }
}

export class FunctionDefinition{
    constructor(param, code){
        this.parameter = param
        this.code = block
    }

    accept(visitor){
        return visitor.FunctionDefinition(this)
    }
}

export class FunctionCall{
    constructor(name, arg){
        this.name = name
        this.arg = arg
    }

    accept(visitor){
        return visitor.FunctionCall(this)
    }
}

export class BoundFunction{
    constructor(formals, code, binding){
        this.formals = formals
        this.code = code
        this.binding = binding
    }

    accept(visitor){
        return visitor.BoundFunction(this)
    }
}