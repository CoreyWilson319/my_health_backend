const router = require("express").Router();
let Staff = require("../models/staff.model");
let Patient = require("../models/patient.model");
let Medication = require("../models/medication.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// @route   GET staff/all
// @desc    Get all staff members
// @access  Private
router.get("/all", auth, (req, res) => {
  Staff.find()
    .then((staff = res.json(staff)))
    .catch((err) => res.status(400).json("Error " + err));
});

// {
//     "first_name": "Gineara",
//     "last_name": "Hannah",
//    "email": "ghannah@gmail.com",
//    "password": "testing123",
//    "facility": "hannah solutions",
//    "title": "Counsellor",
//    "username": "hgineara123"
// }

// @route   GET staff/user
// @desc    Get user data
// @access Private
router.get("/user", auth, (req, res) => {
  Staff.findById(req.user.id)
    // Disregards the password in the responding json
    .select("-password")
    .then((user) => res.json(user));
});

// @route   GET staff/user
// @desc    Get user data
// @access Private
// Add validation to see if staff is assigned to patient before prescribing
router.post("/prescribe", auth, (req, res) => {
  Patient.findOne({_id: req.body.patient_id})
//   Find the patient with the matching id
    .then((patient) => {
      const newMedication = new Medication({
        prescribed_by: req.user.id,
        prescribed_user: patient,
        trade_name: req.body.trade_name,
        brand_name: req.body.brand_name,
      });
    //   Create a new medicine in the db
    //   prescribed by the user currently logged in and the patient with the matching id


      // Saves the new Medication
      newMedication.save();
    //   Push the newMedication
      patient.medication.push(newMedication);
      patient.save();
    })
    .then(() => res.json({ msg: "Medicine Prescribed" }))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/createpatient", (req, res) => {
  // Change this to search if this patient exist
  // By checking last_name and DOB

  // Creates a new instance of a patient
  const newPatient = new Patient({
    // fills patient information with what is in the req body
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    dob: Date.parse(req.body.dob),
    username: "unregisteredpatient",
  });

  // Saves the new Patient
  newPatient
    .save()
    // sends a json message that the patient has been added or it throws an error if something
    // has gone wrong
    .then(() => res.json("Patient Added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/patient/:patient_id")

module.exports = router;
