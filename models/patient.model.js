const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patientSchema = new Schema({
    username: {
        type: String,
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
    dob: {
        type: Date,
        required: true
    },
    notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }] ,
    assigned_staff : [{ type: Schema.Types.ObjectId, ref: 'Staff' }]
}, {
    timestamps: true,
})

// Allow patients to be created
// Allow Patients to create if a patient exist
    // Checking first, last and DOB

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;