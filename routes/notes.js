const router = require('express').Router();
let Note = require('../models/note.model');

// Shows all notes
router.get('/', (req, res) => {
    Note.find()
    .then(note = res.json(note))
    .catch(err => res.status(400).json('Error ' + err));
})

router.post('/add', (req, res) => {
    const title = req.body.title
    const date = Date.now()
    const content = req.body.content
    // need to grab patient some way
    const patient = req.body.patient
    // only staff can add notes so grab staff username from req.user
    const author = req.user

    const newNote = new Note({
        title,
        date,
        content,
        patient,
        author
    })

    newNote.save()
    .then(() => res.json('Note Added!'))
    .catch(err => res.status(400).json('Error: ' + err));
})