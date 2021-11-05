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

export {
  newBook as new,
  create,
}