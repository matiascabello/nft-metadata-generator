var namer = require('color-namer')
var name = namer("rgb(101,101,102)", {pick: ['html']})

console.log(name.html[0].name)