const router = require("express").Router();
let Staff = require("../models/staff.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get("/all", (req, res) => {
  Staff.find()
    .then((staff = res.json(staff)))
    .catch((err) => res.status(400).json("Error " + err));
});

router.post("/register", (req, res) => {
  const { username, email, password, first_name, last_name, facility, title } = req.body;

  // Simple Validation
  if (!last_name || !email || !username || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  // Check if user exist
  Staff.findOne({ email: email }).then((staff) => {
    if (staff) return res.status(400).json({ msg: "Staff Member already exist" });

    const newStaff = new Staff({
        first_name,
        last_name,
        email,
        // We don't want to store a raw password so we need to hash it
        password,
        username,
        facility,
        title
    })

    // Create salt & hash
    // first parameter of genSalt method is how many times we will salt the password
    // 10 is the default
    bcrypt.genSalt(10, (err, salt)=> {
        // hash will take in the plain text password first
        // then salt
        // callback function that takes in an err and the hash
        bcrypt.hash(newStaff.password, salt, (err, hash) => {
            // If error stop everything and throw that error
            if(err) throw err;
            newStaff.password = hash;
            newStaff.save()
                .then(user => {

                    // Sign the token, first parameter is going to be the payload we want to add
                        // Can be anything
                    // When we send a token these things will be sent in the token
                    // Can add more
                    // next paramater will be the secret
                    // Last parameter is optional which is the expiresIn by seconds 3600 is an hour
                    // Lastly we need to send a callback with an err and the token
                    jwt.sign(
                        { id: user.id },
                        process.env.jwt,
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token: token,
                                user: {
                                    id: user.id,
                                    last_name: user.last_name,
                                    email: user.email,
                                    username: user.username,
                                    facility: user.facility,
                                    title: user.title
                                }
                            })

                        }
                    )
                })
        })
    })
  });
});

module.exports = router;
