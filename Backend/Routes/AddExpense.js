const express = require('express')
const router = express.Router()
const User = require('../Models/UserModel')

router.post('/AddExpense', async (req, res) => {
    const { email, amount, expenseName, category, date, income, ptype } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User Not Found" })
        }

        const newExpense = { expenseName, date, amount, category, salary:income, ptype }

        user.expense.push(newExpense)
        await user.save()
        return res.status(201).json({success:true, message:"Expense is Added" })
    }
    catch (error) {
        // console.log("Error in Adding Expenses")
        return res.status(500).json({ message:error })
    }
})

module.exports = router