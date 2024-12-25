const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');

//Route:1 Get Notes and using Get://api/notes/fetchallnotes - Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
})

//Route:2 Add a new Note and using post://api/notes/addnote - Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter The Valid Title').isLength({ min: 3 }),
    body('description', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const Note = new Notes({
            title, description, tag, user: req.user.id
        })

        const savedNote = await Note.save();

        res.json(savedNote)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
})

//Route:3 Update A existing Note and using put://api/notes/updatenote - Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //create a newNote object 
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //Find the note to be updated adn update it

        let notes = await Notes.findById(req.params.id);
        if (!notes) { return res.status(404).send("Not Found") }

        if (notes.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        notes = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ notes })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
})

//Route:4 Delete A existing Note and using delete://api/notes/deletenote - Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //Find the note to be deleted and delete it
        let notes = await Notes.findById(req.params.id);
        if (!notes) { return res.status(404).send("Not Found") }

        //allow deletion only if user own it
        if (notes.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        notes = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note is deleted", note: notes })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
})

module.exports = router