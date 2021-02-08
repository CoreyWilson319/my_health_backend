const router = require('express').Router();
let Staff = require('../models/staff.model');

router.get('/', (req, res) => {
    Staff.find()
    .then(staff = res.json(staff))
    .catch(err => res.status(400).json('Error ' + err));
})

module.exports = router;