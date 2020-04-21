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