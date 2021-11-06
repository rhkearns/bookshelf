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

function edit(req, res) {
  Book.findById(req.params.id)
  .then((book) =>{
    res.render(`books/edit`, {
      title: "Edit Book Details", book,
    })
  })
}

function update(req, res) {
  console.log('update function');
  req.body.finishedReading = !!req.body.finishedReading
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Book.findByIdAndUpdate(req.params.id, req.body)
  .then((book) => {
    console.log('update done');
    res.redirect(`/books/${book._id}`)
  })
}

function addReview(req, res) {
  Book.findById(req.params.id)
  .then((book) => {
    book.reviews.push(req.body)
    book.save()
    res.redirect(`/books/${book._id}`)
  })
  .catch(err => {
    console.log(err);
    res.redirect(`/books/${book._id}`)
  })
}

function deleteBook(req, res) {
  Book.findByIdAndDelete(req.params.id)
  .then(() => {
    res.redirect('/books')
  })
  .catch(err => {
    console.log(err);
    res.redirect('/books')
  })
}

export {
  index,
  newBook as new,
  create,
  show,
  edit,
  update,
  addReview,
  deleteBook as delete,
}