export default class Interpreter{
    visit(node){
        return node.accept(this)
    }

    visitBinOp(node){
        let left = node.left.accept(this)
        let right = node.right.accept(this)

        switch(node.operator){
            case "+" :
                return left + right
            
            case "-" : 
                return left - right

            case "*" :
                return left * right 
            
            case "/":
                return Math.round(left / right) //must round for integer divison

            case "==":
                return left == right
            
            case "!=":
                return left != right
            
            case ">":
                return left > right
            
            case "<":
                return left < right

            case ">=":
                return left >= right

            case "<=":
                return left <= right
            
        }
    }

    visitInteger(node){
        return node.value
    }

    Assignment(node){
        let variable = node.variable.accept(this)
        let expr = node.expr.accept(this)
        this.setVariable(varibale, expr)
        return expr
    }

    VariableName(node){
        return node.name
    }

    setVariable(name, value){
        this.binding.set(name,value)
    }

    VariableValue(node){
        return this.getVariable(node.name)
    }

    getVariable(name){
        this.binding.get(name)
    }

    FunctionDefiniton(node){
        return node.code
    }

    FunctionCall(node){
        let bodyAST = node.name.accept(this)
        return bodyAST.accept(this)
    }

}