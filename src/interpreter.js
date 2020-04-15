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
        }
    }

    visitInteger(node){
        return node.value
    }

}