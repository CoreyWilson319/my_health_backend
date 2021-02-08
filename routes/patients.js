const router = require('express').Router();
let Patient = require('../models/patient.model');

router.get('/', (req, res) => {
    res.json("Patients Home Route")
})

// Returns all patients
router.get('/patients', (req, res) => {
    Patient.find()
    .then(patient = res.json(patient))
    .catch(err => res.status(400).json('Error ' + err));
})

router.post('/add', (req, res) => {
    // Change this to search if this patient exist
    // By checking last_name and DOB

    // Creates a new instance of a patient
    const newPatient = new Patient({
        // fills patient information with what is in the req body
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        dob: req.body.dob
    })

    // Saves the new Patient
    newPatient.save()
    // sends a json message that the patient has been added or it throws an error if something
    // has gone wrong
    .then(() => res.json('Patient Added!'))
    .catch(err => res.status(400).json('Error: '+ err));
})

// We must export the router for server.js to use
module.exports = router;