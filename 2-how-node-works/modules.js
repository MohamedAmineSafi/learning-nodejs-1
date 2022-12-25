// Module.export
const myCalculator = require('./test-module-1');
const calc1 = new myCalculator();

console.log(calc1.add(1, 2));

// exports
// const calc2 = require('./test-module-2');
const { add, multiply, divide } = require('./test-module-2');
console.log(add(2, 4));

// caching
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();
