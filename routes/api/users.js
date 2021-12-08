const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../../config/keys");
//LOAD MODEL USER
const User = require("../../models/User");
router.post("/register", (req, res) => {
User.findOne({ email: req.body.email }).then(user => 
    {
        if (user) 
        {
            return res.status(400).json({ error: "Email sudah ada" });
        } else {
                    //TODO: ADD NEW USER AND HASHING PASSWORD
                    const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                    });
                    //hashing password
                    bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                        });
                    });
                }
    });
});
router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email && !password) { return res.status(404).json({ error: "Email dan password harus diisi.!" }); }
    else {
        if (!email ) { return res.status(404).json({ error: "Email  harus diisi.!" }); }
        else 
        if (!password ){  return res.status(404).json({ error: "Password harus diisi.!" });        }
        else 
        {
            User.findOne({ email })
            .then(user => {
            if (!user) {
            return res.status(404).json({ error: "Email tidak ada!" });
            }
            //Check password
            bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
            //UserMatched
            const payload = { id: user.id, name: user.name }; 
            //Create JWT Payload
            //Sign Token
            jwt.sign(
            payload,
            keys.secretKey,
            { expiresIn: 3600 },
            (err, token) => {
            res.json({
            success: true,
            token: "Bearer " + token
            });
            });
            } else {
            return res.status(400).json({ error: "Password salah!" });
            }
            });
            })
            .catch(err => console.log(err));
        }
    }    
    });
router.get(
    "/current",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
    res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
    });
    });
router.get("/list", function (req, res) {
        User.find({}, function (err, User) {
            if (err) console.log(err)
            res.json(User)
        })
    });
module.exports = router;