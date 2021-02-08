const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema ({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    content: {
        type: String,
    },
    patient: [{ type: Schema.Types.ObjectId, ref: 'Patient' }] 
})

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;