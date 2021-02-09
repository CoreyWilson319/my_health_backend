const router = require("express").Router();
let Note = require("../models/note.model");

// Shows all notes
router.get("/", (req, res) => {
  Note.find()
    .then((note = res.json(note)))
    .catch((err) => res.status(400).json("Error " + err));
});

router.post("/add", (req, res) => {
  const title = req.body.title;
  const date = Date.now();
  const content = req.body.content;
  // need to grab patient some way
  const patient = req.body.patient;
  // only staff can add notes so grab staff username from req.user
  const author = req.user;

  const newNote = new Note({
    title,
    date,
    content,
    patient,
    author,
  });

  newNote
    .save()
    .then(() => res.json("Note Added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/:id", (req, res) => {
  Note.findByIdAndDelete(req.params.id)
    .then(() => res.json("Note deleted " + req.params.id))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/update/:id", (req, res) => {
  Note.findById(req.params.id)
    .then((note) => {
      (note.title = req.body.title),
        (note.date = req.body.date),
        (note.content = req.body.content);

      note
        .save()
        .then(() => res.json("Exercise updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});


module.exports = router;