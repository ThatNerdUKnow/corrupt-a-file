const fs = require('fs')
const buffer = require('buffer')

fs.copyFileSync('./input.jpg','./output.jpg')

function go(){
let file = fs.readFileSync('./output.jpg')
console.log(file)
const offset = Math.floor(Math.random() * file.length)
const newval = Math.floor(Math.random()*255)
console.log(offset,newval)
file[offset] = newval
fs.writeFileSync('./output.jpg',file)
}

setInterval(()=>{go()},75)
