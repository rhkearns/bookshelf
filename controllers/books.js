import { Book } from '../models/book.js'

function newBook(req, res) {
  res.render('books/new', {title: 'New Book'})
}

export {
  newBook as new,
}