const foo = bar => bar + 1


// 1. importaciones y exportaciones 

// math.js
function cube (x) {
  return x * x * X
}

function add (a, b) {
  return a + b
}

export { cube, add }



// index.js
// import { cube, add } from './math'

cube(2)
add(1, 3)


// 2. desestructurización 

var obj = { bar: 1, baz: 2 }


var name = obj.bar
var lastname = obj.baz

var { bar: name, baz: lastname } = obj


var arr = [1, 4, 7]

var [first, ...rest] = arr
var [first,, third] = arr

var a = 1
var b = 2

var aux = a
a = b
b = aux

var [b, a] = [a, b]

function getTuple() {
	return [1, 2]
}

var [a, b] = getTuple()

// 3. parámetros por defecto

function add(a, b) {
  const baux = b || 1
  return a + baux 
}

function add(a, b = 1) {
   return a + b
} 
  
add(1, 4)
add(1)

// 4. fetch
import axios from 'axios' 

axios.get('http://gist.io')
	.then()
	.catch()

fetch('http://gist.io')
	.then()
	.catch()

// 5. async/await

(async function() {
  try {
  	const gist = await fetch('http://gist.io')
  } catch (err) {
  }
})()



// 6. const y let

var a = 1

function foo2() {
  var a = 4
  
  console.log(a) // 4
}

console.log(a) // 1

// sin let
var a = 1

function foo2() {
  var a = 4
  
  console.log(a) // 4
  
  if (true) {
    var a = 7
    
    console.log(a) // 7
  }
  
  console.log(a) // 7
}

console.log(a) // 1

// let
var a = 1

function foo2() {
  let a = 4
  
  console.log(a) // 4
  
  if (true) {
    let a = 7
    
    console.log(a) // 7
  }
  
  console.log(a) // 4
}

console.log(a) // 1

const a5 = 5

a5 = 8