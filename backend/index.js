//libs
const express = require('express')
const app = express()
const mongoose = require('mongoose')
app.use(express.json())
const dotenv = require('dotenv')
dotenv.config()

//urls and other
const {mongoURL}= require("./config.js")
const {PORT}  = require("./config.js")

const bookRouteData = require("./routes/booksRoute.js")
app.use("/books", bookRouteData)
mongoose
.connect(mongoURL)
.then(() => {
    console.log("App connected to DB")

    //express runs only if connection to DB is successful
    app.listen(PORT, (err) => {
        if(err){
            console.log(err.message)
            return
        }
        console.log(`Server listening to port ${PORT}`)
    })
})
.catch((e) => {
    console.log("Error caught : ", e.message)
})

//home page
app.get("/", (req, res) => {
    console.log(req.headers)
    res.send("Some text")
    res.end()
})

