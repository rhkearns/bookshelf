import { Book } from '../models/book.js'

function newBook(req, res) {
  res.render('books/new', {title: 'New Book'})
}

function create(req, res) {
  req.body.finishedReading = !!req.body.finishedReading
  Book.create(req.body)
  .then(book => {
    res.redirect(`/books/${book._id}`)
  })
  .catch(err => {
    console.log(err);
    res.redirect('/books')
  })
}

function show(req, res) {
  Book.findById(req.params.id)
  .then(book => {
    res.render(`books/show`, {
    title: `${book.title} Details`, 
    book
    })
  })
}

export {
  newBook as new,
  create,
  show,
}