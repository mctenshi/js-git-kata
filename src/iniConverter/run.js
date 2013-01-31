var converter = require('./iniConverter');
var fs = require('fs');
var iniContent = fs.readFileSync('./iniTest.ini');
var result = converter.convert(iniContent);
console.log(result);
