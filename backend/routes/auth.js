const express = require('express');
const User = require('../models/User')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

const JWT_S = 'HelloIAM&KEtan'

// Route:1 Create New User where user enter name, email, password no login requried and using POST://api/auth/NewUser No login requried
router.post('/NewUser', [
    // name , error message , contion 
    body('name', 'Enter The Valid Name').isLength({ min: 3 }),
    body('email', 'Enter The Valid Email').isEmail(),
    body('password', 'Password must be atleast five characters').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;

    // if any error while entering the data this is extected
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    // checks whether a user present or not

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: "Sorry a user with this email already exits" })
        }

        // making password unread or secreaing the password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // if not then user data is added in database
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_S)

        success = true
        // displaying the user in json format on screen
        // res.json(user)
        // displaying the Token in json format on screen
        res.json({success, authtoken })
    }

    // if any error in try block this is block gives error and make status 500
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }

})

//Route:2 Authuration using Email and password and using POST://api/auth/Login - Login required
router.post('/Login', [
    body('email', 'Enter The Valid Email').isEmail(),
    body('password', 'password cannot be blank').exists(),
], async (req, res) => {

    // if any error while entering the data this is extected
    const errors = validationResult(req);

    let success = false;

    if (!errors.isEmpty()) {
        return res.status(400).json({success , errors: errors.array() });
    }

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({success , error: "Please try to login with correct credentials" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({success , error: "Please try to login with correct credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_S);
        success = true;
        res.json({success , authtoken })
    }

    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }

})

//Route:2 Get User Deltails and using POST://api/auth/getuser - Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
})

module.exports = router