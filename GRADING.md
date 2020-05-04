# Week 3

| Part           | Comments    | Points |
|----------------|-------------|--------|
| provided tests | 1 failure   |     63 |
| extras         | 3 failures  |      4 |
| Coding         |             |     20 |
| **TOTAL**      |             |     87 |


### Notes on Code

File: Interpreter.js
53:       if (args.length > 0) {
54:         params.forEach((param, i) => {
55:           params[i] = param[2].accept(this) //the 3rd element of each param is the actual arg, without the optional "," and _
56:         })
57:
58:         args.forEach((arg, i) => {
59:           args[i] = arg[2].accept(this) //the 3rd element of each arg is the actual arg, without the optional "," and _
60:         })
61:
62:         if (params.length != args.length) {
63:           throw new Error("Parameters and arguments are not equal in length")
64:         }
65:
66:         params.forEach((param, i) => {
67:           newBinding.setVariable(param, args[i])
68:         })
69:       }

This almost works, but

1. Why do you need the test for length > 0?

2. Why three loops. Could you not have just one?

    for (let i = 0; i < params.length; i++) {
      let name = params[i].accept(this)
      let value = args[i].accept(this)
      newBinding.setVariable(name, value)
    }

3. In general overwriting data in things that were passed to you is poor
   form :)

I said "almost" because there's a bug: if no arguments are passed, you
never run the test that the argument length is the same as the parameter
length.



### Test Failure

  08-test_closures › let inc = fn() {
        let c = 0
        fn() {
          c = c+1
        }
      }
      let inc1 = inc()
      let inc2 = inc()
      print(inc1(),inc1(),inc2(),inc1(),inc2())


  file:/src/visitors/Interpreter.js:98

  Error thrown in test:

  TypeError {
    message: 'a.accept is not a function',
  }

### Torture Tests

All 3 closure-scope tests failed


# Week 2

| Part           | Comments    | Points |
|----------------|-------------|--------|
| provided tests | All passed  |     65 |
| extras         | 3 failures  |      4 |
| Coding         |             |     15 |
| **TOTAL**      |             |     84 |

(I asked for trace messages to be removed...)


Failures in my torture tests:

- The interpreter blows up when given `if 0 { 99 }`. It should either
  raise a meaningful error or return 0.

- your binding code doesn't check for duplicate definitions of a
  variable (two `let`s for the same variable)

- your binding code doesn't check for attempts to access a
  variable that hasn't been defined.

Code comments:

- you need to be consistent in the naming of things. For example, some
  of the AST class names start with an upper case letter, and others a
  lower case letter.

  # Week 1

| Part           | Comments    | Points |
|----------------|-------------|--------|
| 00-test_values | All passed  |     75 |
| 00-test_extras | All passed  |     10 |
| Coding         |             |     25 |
| **TOTAL**      |             |    100 |

I really have nothing to say about this. Very nice all around.