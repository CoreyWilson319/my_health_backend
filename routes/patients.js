const router = require('express').Router();
let Patient = require('../models/patient.model');

router.get('/', (req, res) => {
    res.json("Patients Home Route")
})

// Returns all patients
router.get('/all', (req, res) => {
    Patient.find()
    .then(patient => res.json(patient))
    .catch(err => res.status(400).json('Error ' + err));
})


// Make it so that once a patient has been added by staff allow them sign up using email, password

// We must export the router for server.js to use
module.exports = router;