export default class Binding {
  constructor(parent = null) {
    this.binding = new Map()
    this.parent = parent
  }

  push(){
    return new Binding(this)
  }

  pop(){
    return this.parent
  }

  getVariableValue(name) {
    this.checkVariableExists(name)
    return this.binding.get(name)
  }

  setVariable(name, value) {
    if (this.binding.has(name))
      throw new Error(`Duplicate declaration for variable ${name}`)
    this.binding.set(name, value)
  }

  updateVariable(name, value) {
    this.binding.set(name, value)
  }

  checkVariableExists(name) {
    if (!this.binding.has(name))
      throw new Error(`Reference to unknown variable ${name}`)
  }
}