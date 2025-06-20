const express = require('express')
const route = express.Router()
const User = require('../Models/UserModel')

route.post('/checksalary', async (req, res) => {

    try {
        // const { email, month, year } = body.req
        const email = req.body.email
        const month = req.body.month
        const year = req.body.year
        const user = await User.findOne({ email })
        // if (!user) {
        //     return res.status(400).json({ success: false, message: "User not found" })
        // }
        const salaryExpense = user.expense.find(exp => {
            const expDate = new Date(exp.date);
            return (
                expDate.getMonth() + 1 === parseInt(month) &&
                expDate.getFullYear() === parseInt(year) &&
                exp.salary !== undefined
            );
        });
        if (salaryExpense && salaryExpense.salary) {
            res.json({ success: true, message: "Salary found", exists: true, salary: salaryExpense.salary })
        }
        else {
            res.json({ success: true, message: "Salary not found", exists: false })
        }
    } catch (error) {
        // console.log("Error in Checking Salary")
        res.status(400).json({ message: "Server error" })
    }
})

module.exports = route