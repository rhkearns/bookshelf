import { Book } from '../models/book.js'

function index(req, res) {
  Book.find({})
  .then(books => {
    res.render('books/index', {
      title: `${req.user.profile.name}'s Books`,
      books, 
    })
  })
}

function newBook(req, res) {
  res.render('books/new', {title: 'New Book'})
}

function create(req, res) {
  req.body.finishedReading = !!req.body.finishedReading
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Book.create(req.body)
  .then(book => {
    res.redirect(`/books/${book._id}`)
  })
  .catch(err => {
    console.log(err);
    res.redirect('/books/index')
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

function deleteBook(req, res) {
  Book.findByIdAndDelete(req.params.id)
  .then(() =>{
    res.redirect('/books/index')
  })
  .catch(err => {
    console.log(err);
    res.redirect('/books/index')
  })
}

export {
  index,
  newBook as new,
  create,
  show,
  deleteBook as delete,
}