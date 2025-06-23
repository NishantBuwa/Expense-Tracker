const express = require('express')
const router = express.Router()
const User = require('../Models/UserModel')
const bcrypt = require('bcryptjs')

//  CREATE USER

router.post("/createuser", async (req, res) => {
    try {
        let email = req.body.email
        let userData = await User.findOne({ email })
        if(userData !== null ){
            return res.status(409).json({message:"User Exists"})
        }
        const salt = await bcrypt.genSalt(10)
        let securePassword = await bcrypt.hash(req.body.password, salt)
        await User.create({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            age: req.body.age,
            password: securePassword,
        })
        res.json({ success: true })
    }
    catch (error) {
        // console.log("Error in Creating user")
        res.json({ success: false })
    }
})

// LOGIN USER

router.post("/loginuser", async (req, res) => {
    // console.log("Login route is hit")
    // console.log("Request Body: ", req.body)
    let email = req.body.email

    try {
        const body = req.body;
        if (!body || !body.email || !body.password) {
            return res.status(400).json({
                error: "Missing fields",
                received: body, // 👈 shows what was received
            });
        }
        let userData = await User.findOne({ email })
        if (!userData) {
            return res.status(400).json({ errors: "Enter Correct Email" })
        }
        const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
        if (!pwdCompare) {
            return res.status(400).json({ errors: "Enter Correct Password" })
        }
        const data = userData.id
        // console.log(`User logged in using ${userData.email}`)
        res.status(200).json({ success: true, username: userData.username })
    }
    catch (error) {
        // console.log("User login error",error)
        res.status(400).json({ success: false,message:error.message })
    }
})

module.exports = router