const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/dbconn")

const app = express()

const PORT = process.env.PORT || 1234
connectDB()

//middlewares

app.use(cors(corsOptions))
app.use(express.json())

app.use('/api/post', require("./routs/PostRout"))
app.use('/api/todo', require("./routs/TodoRouts"))
app.use('/api/user', require("./routs/UserRout"))

app.get('/', (req, res) => res.send("welcome!!"))

mongoose.connection.once('open', () => {
    app.listen(PORT, () => console.log(`The project is running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
})