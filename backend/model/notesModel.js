const mongoose = require('mongoose')

const notesSchema = mongoose.Schema({
    title:String,
    note: String,
    category: String,
    author: String,
    userId: String,
    userName: String
})

const NoteModel = mongoose.model("note", notesSchema)

module.exports = {
    NoteModel
}