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