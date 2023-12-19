const express = require('express')
const router = express.Router()
const book = require("../models/bookModel.js")

//get all books
router.get("/", async (req, res) => {
    try{
        const books = await book.find({})
        return res.status(200).send({count: books.length, data: books})
    }
    catch(err){
        console.log("Error caught : ", err.message)
        res.status(500).send({message: err.message})
    }
})
//get one book
router.get("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const reqbook = await book.findById(id)
        return res.status(200).json({reqbook})
    }
    catch(err){
        console.log("Error caught : ", err.message)
        res.status(500).send({message: err.message})
    }
})

//add a book to the library
router.post('/', async (req, res) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({message: "Please enter all required fields"})
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };

        const b = await book.create(newBook);

        return res.status(201).send(b)
    }
    catch(err) {
        console.log(err)
        res.status(500).send({message: err.message})
    }
})

//update a book present in the library
router.put("/:id", async (req, res) => {
    try{
        const {id} = req.params

        const bookToUpdate = await book.findById(id)
        if(!bookToUpdate){
            return res.status(404).send("Book not found")
        }
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            console.log(req.body, req.params.id)
            return res.status(400).send({message: "Please enter all required fields"})

        }
        const updatedBook = await bookToUpdate.updateOne(req.body)

        return res.status(200).send({message: "Book updated successfully",old: bookToUpdate, updated: req.body})
    }
    catch(err){
        console.log(err.message)
        return res.status(500).send("Error : ", err.message)
    }
})

//delete a book
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const bookToDelete = await book.findById(id)

        if(!bookToDelete) {
            return res.status(404).send("Book not found")
        }

        const isDel = await book.deleteOne(bookToDelete)

        if(isDel){
            return res.status(200).send({message: "Book deleted successfully"})
        }
    }
    catch(e){
        return res.status(500).send({message: e.message})
    }

})

module.exports = router