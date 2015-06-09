var Depender = require('../dist/depender')
var deps = new Depender

deps
  .define('text', 'Demo text 1')
  .define('text2', 'Demo text 2')
  .define('fn', function(message) {
    console.log(message)
  })

deps.use(function(text2, text, fn, nonce) {
  console.log(text2);
  console.log(text);
  console.log(nonce) // undefined

  fn('I\'m a function!')
})