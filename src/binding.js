export default class Binding {
  constructor(parent = null) {
    this.binding = new Map()
    this.parent = parent
  }

  getVariableValue(name) {

    if (this.checkVariableExists(name))
      return this.binding.get(name)

    else if (this.parent != null)
      return this.parent.getVariableValue(name)

    else
      throw new Error("Variable does not exist")
  }


  setVariable(name, value) {
    if (this.binding.has(name))
      throw new Error(`Duplicate declaration for variable ${name}`)
    else
      this.binding.set(name, value)
  }


  updateVariable(name, value) {
    if(this.checkVariableExists(name))
        this.binding.set(name, value)
    else
      throw new Error('Varible DNE')
  }

  checkVariableExists(name) { 
    if (!this.binding.has(name)){
      let parent = this.pop()
      if(parent == null){
        throw new Error(`Reference to unknown variable ${name}`)
      }
      else
        parent.checkVariableExists(name)      
    }
    else{
      return true
    }
  }


  push() {
    return new Binding(this)
  }
  pop() {
    return this.parent
  }
}