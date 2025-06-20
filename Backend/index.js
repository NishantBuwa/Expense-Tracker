const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 5000
const dotenv = require('dotenv')
const mongoose = require('mongoose')

// CONFIG DOTENV FILE
dotenv.config()

// DB CONNECTION USING ASYNC/AWAIT
const connectDB = async () => {
    try {
        await  mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("DB Connected Successfully")
    }
    catch (error) {
        console.log("Error: ", error)
    }
}

connectDB()

// PARSING TO JSON
app.use(cors())
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Backend is running.')
})


app.use('/api', require('./Routes/LoginCreateUser'))
app.use('/api', require('./Routes/AddExpense'))
app.use('/api',require('./Routes/GetExpense'))
app.use('/api',require('./Routes/CheckSalary'))

app.listen(PORT, () => {
    console.log(`Port is listening at ${PORT}`)
})