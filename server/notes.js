const { ifError } = require('assert');
const { log } = require('console');
const fs = require('fs')

fs.readFile('./server/notes.txt','utf8', (err,data) => {

    let notesArray = []
    if (err) {
        log(`Error reading file: ${err}`)
        return
    }
    log(`File contents: ${data}`)
})

const notes = {id:1, text:"Ulolllll"}
fs.writeFile('./server/notes.txt', JSON.stringify(notes)+ ',', (err) => {
    if (err) {
        log(`Error ${err}`)
        return
    }
    log('File writteng')
})

async function addNotes(notes) {
    fs.appendFile('./server/notes.txt',JSON.stringify(notes) + ',', (err) => {
        if (err) {
            log(`Error ${err}`)
        }
        log('Note offended hahahaS')
    })
}

const data = fs.readFileSync('./server/notes.txt','utf8')
const notesArray = JSON.stringify(data)
log(typeof notesArray)


addNotes({id:2,text:"Tanginangyan"})