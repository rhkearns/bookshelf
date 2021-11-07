import { Book } from '../models/book.js'
import { Shelf } from '../models/shelf.js'

function index(req, res) {
  Book.find({owner: req.user.profile._id})
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
  req.body.owner = req.user.profile._id
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
  .populate('shelves').exec()
  .then(book => {
    Shelf.find({$and: [{_id: {$nin: book.shelves}}, {owner: req.user.profile._id}]})
      .then(shelves => {
        res.render(`books/show`, {
        title: `${book.title} Details`, 
        book, shelves,
        })
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

function addToShelf(req, res) {
  Book.findById(req.params.id)
  .then(book => {
    book.shelves.push(req.body.shelfId)
    book.save()
    .then(book => {
      Shelf.findById(req.body.shelfId)
      .then(shelf => {
        shelf.books.push(book)
        shelf.save()
        res.redirect(`/books/${book._id}`)
      })
    })
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

function addNote(req, res) {
  Book.findById(req.params.id)
  .then((book) => {
    book.notes.push(req.body)
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

function deleteReview(req, res) {
  Book.findById(req.params.id)
  .then(book => {
    book.reviews.forEach(r => {
      if (r._id == req.params.reviewId) {
        r.remove()
        book.save()
        res.redirect(`/books/${book._id}`)
      }
    })
  })
  .catch(err => {
    console.log(err);
    res.redirect(`/books/${book._id}`)
  })
}

function deleteNote(req, res) {
  Book.findById(req.params.id)
  .then(book => {
    book.notes.forEach(r => {
      if (r._id == req.params.noteId) {
        r.remove()
        book.save()
        res.redirect(`/books/${book._id}`)
      }
    })
  })
  .catch(err => {
    console.log(err);
    res.redirect(`/books/${book._id}`)
  })
}



export {
  index,
  newBook as new,
  create,
  show,
  edit,
  update,
  addToShelf,
  addReview,
  addNote,
  deleteBook as delete,
  deleteReview,
  deleteNote,
}