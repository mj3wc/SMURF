import test from "ava"
import loadGrammar from "../src/util/load_grammar.js"
import compileAndRun from "../src/compiler.js"

let grammar = loadGrammar()
let dummyPrint = () => { throw("shouldn't call this") }

test("fn can be part of a variable name", t => {
  let result = compileAndRun(grammar, "let myfn = 1 let fn1 = 2 myfn+fn1", dummyPrint)
  t.is(3, result)
})

test("let can be part of a variable name", t => {
  let result = compileAndRun(grammar, "let toLet = 1 let letter = 2 toLet+letter", dummyPrint)
  t.is(3, result)
})

const Scary =  `
let a = 1
let fn2
let fn1 = fn(b) {
  let a = 2+b
  fn2 = fn (c) {
    a = a + c
  }
  fn () {
    a
  }
}

let f = fn1(3)
`

test("closure scope 1", t => {
  const code = Scary + "f()"
  let result = compileAndRun(grammar, code, dummyPrint)
  t.is(5, result)
})

test("closure scope 2", t => {
  const code = Scary + "fn2(7)"
  let result = compileAndRun(grammar, code, dummyPrint)
  t.is(12, result)
})

test("closure scope 3", t => {
  const code = Scary + "fn2(7) a"
  let result = compileAndRun(grammar, code, dummyPrint)
  t.is(1, result)
})