var Depender = require('../index');
    dep = new Depender;

dep.define('text', '123');
dep.define('text2', 'demo222222');
dep.define('functionOne', function(msg) {
    console.log(msg);
});

dep.use(function(text2, text, functionOne, nonce) {
    console.log(text2);
    console.log(text);
    functionOne('hi, im a function!');
    console.log(nonce) // undefined
});