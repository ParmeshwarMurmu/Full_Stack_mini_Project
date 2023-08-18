const express = require('express')
const { NoteModel } = require('../model/notesModel')
const { auth } = require('../middleware/auth')
const notesRouter = express.Router()


notesRouter.get('/', auth, async (req, res) => {

    const userId = req.headers['x-user-id']


    try {
        const notes = await NoteModel.find({ userId: userId })
        if(notes.length == 0){
            res.status(200).send({ "notes": "No Notes Available"})
        }
        else{
            res.status(200).send({ "notes": notes })
        }
        
    } catch (error) {
        res.status(400).send({ "msg": error })
    }
})

notesRouter.post('/create', auth, async (req, res) => {

    try {
        const notes = new NoteModel(req.body);
        await notes.save();
        res.status(200).send({ "msg": "Notes have been created" })
    } catch (error) {
        res.status(400).send({ "msg": "Somethinfg went wrong. Notes cannot be created" })
    }
})


notesRouter.patch('/update/:id', auth, async (req, res) => {

    const { id } = req.params

    const note = await NoteModel.findOne({ _id: id })
    // console.log(req.body.userId, note.userId);

    try {

        if (req.body.userId != note.userId) {
            res.status(200).send({ "msg": "You are not authorized" })
        }
        else {
            await NoteModel.findByIdAndUpdate({ _id: id }, req.body)
            res.status(200).send({ "msg": `Notes with id: ${id} has been Updated` })
        }
    } catch (error) {
        res.status(400).send({ "msg": "Somethinfg went wrong. Notes cannot be updated", error: error })
    }
})


notesRouter.delete('/delete/:id', auth, async (req, res) => {

    const { id } = req.params;
    console.log(id, "+")
    const note = await NoteModel.findOne({ _id: id })

    try {

        if (note.userId === req.body.userId) {
            await NoteModel.findByIdAndDelete({ _id: id })
            res.status(200).send({ "msg": `Notes with id: ${id} has been Deleted` })
        }
        else{
            res.status(200).send({"msg": "User Not Authorized"})
        }

    } catch (error) {
        res.status(400).send({ "msg": "Somethinfg went wrong. Notes cannot be deleted", error: error })
    }
})








module.exports = {
    notesRouter
}