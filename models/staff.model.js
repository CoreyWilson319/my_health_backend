const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const staffSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 8
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    facility: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    patients: [{ type: Schema.Types.ObjectId, ref: 'Patient' }] 
}, {
    timestamps: true,
})

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;