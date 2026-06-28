const Book = require("../models/Book.js")
const User = require("../models/User.js")
const bcrypt = require("bcrypt")

const getAllBooks = async(req,res) => {
  try {
    const books = await Book.find()
    res.json(books)
  } catch (error) {
    res.send(`error: ${error}`)
  }
}
const getBookById = async(req,res) => {
  try {
    const books = await Book.findOne({_id: req.params.id})
    res.json(books)
  } catch (error) {
    res.send(`error: ${error}`)
  }
}
const getAllBooksByUserId = async(req,res) => {
  try {
    const selectedUser = await User.findOne({_id: req.params.userid})
    const books = await Book.find({user: selectedUser})
    res.send(books)
  } catch (error) {
    res.send(`error: ${error}`)
  }
}
const createBook = async(req,res) => {
  try {
    const bookInDB = await Book.exists({ title: req.body.title })
    if (bookInDB) {
      return res.send("This menu item already exists!")
    } else {
      const newBook = await Book.create({
        title: req.body.title,
        author: req.body.author,
        details: req.body.details,
        user: req.params.id,
      })
      res.send(newBook)
    }
  } catch (error) {
    res.send(`error: ${error}`)
  }
}
const updateBook = async(req,res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" })
    }

    res.status(200).json(updatedBook)
  } catch (error) {
    res.send(`error: ${error}`)
  }
}
const deleteBookById = async(req,res) => {
  try {
    const deleteBook = await Book.findByIdAndDelete({
      _id: req.params.id,
    })
    res.send(`deleteBook: ${deleteBook}`)
  } catch (error) {
    res.send(`error: ${error}`)
  }
}
module.exports = {
  getAllBooks,
  getBookById,
  getAllBooksByUserId,
  createBook,
  updateBook,
  deleteBookById
}
