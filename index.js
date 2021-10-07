const fs = require('fs')
const buffer = require('buffer')
const path = require('path');
const program = require('commander')

program
    .version("Version? I'm never touching this code ever again lol")
    .argument('<inputfile>','Path to the file to corrupt')
    .option('-n, --number <number>', 'number of bytes to flip', 0)
    .option('-d, --debug', 'enable debug output', false)

program.parse(process.argv)

const opts = program.opts()


const input = program.args[0]
const ext = path.extname(input)


fs.copyFileSync(input, `./output${ext}`)

function go() {
    let file = fs.readFileSync(`./output${ext}`)
    const offset = Math.floor(Math.random() * file.length)
    const newval = Math.floor(Math.random() * 255)
    if (opts.debug) {
        console.log(file)
        console.log(offset, newval)
    }
    file[offset] = newval
    fs.writeFileSync(`./output${ext}`, file)
}

if (opts.number == 0) {
    setInterval(() => { go() }, 75)
}
else {
    console.log('Processing...')
    for (let i = 0; i < program.opts().number; i++) {
        go()
    }
    console.log('FINISHED')
}