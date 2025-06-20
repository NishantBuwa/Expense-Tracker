const express = require('express')
const router = express.Router()
const User = require('../Models/UserModel')

router.post('/getexpense',async (req,res)=>{
    const email = req.body.email
    try{
        const user = await User.findOne({email})
        if(!user) {
            return res.status(400).json({message:"Cannot find user"})
        }
        return res.status(200).json(user.expense)
    }catch(error){
        // console.log("Error in Retreving Expenses , error")
        return res.status(400).json({error:"Got Some error ",error})
    }
})

module.exports = router