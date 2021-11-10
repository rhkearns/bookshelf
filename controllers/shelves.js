import { Shelf } from '../models/shelf.js'
import { Book } from '../models/book.js'

function index(req, res) {
  Shelf.find({owner: req.user.profile._id})
  .then(shelves => {
    res.render('shelves/index', {
      title: `My Shelves`,
      shelves, 
    })
  })
}

function newShelf(req, res) {
  res.render('shelves/new', {title: 'New Shelf'})
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Shelf.create(req.body)
  .then(shelf => {
    res.redirect('/shelves')
  })
  .catch(err => {
    console.log(err);
    res.redirect('/shelves')
  })
}

function show(req, res) {
  Shelf.findById(req.params.id)
  .populate('books').exec()
  .then(shelf => {
    Book.find({$and: [{_id: {$in: shelf.books}}, {owner: req.user.profile._id}]})
    .then(books => {
    res.render(`shelves/show`, {
      title: `${shelf.shelfName} Details`,
      shelf, books
      })
    })
  })
}

function removeBook(req, res) {
  console.log(req.params.bookId);
  Book.findById(req.params.bookId)
    .then(book => {
      book.shelves.remove({_id: req.params.id})
      book.save()
      .then(book => {
        Shelf.findById(req.params.id)
        .then(shelf => {
          shelf.books.remove({_id: req.params.bookId})
          shelf.save()
          res.redirect(`/shelves/${shelf._id}`)
        })
      })
    })
}

function edit(req, res) {
  Shelf.findById(req.params.id)
  .then(shelf => {
    res.render('shelves/edit', {
      title: "Edit Shelf", shelf})
  })
}

function update(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Shelf.findByIdAndUpdate(req.params.id, req.body)
  .then(shelf => {
    res.redirect(`/shelves/${shelf._id}`)
  })
}

function deleteShelf(req, res) {
  Shelf.findByIdAndDelete(req.params.id)
  .then(shelf => {
    if (shelf.books.length) {
      deleteHelper(shelf)
    }
    res.redirect('/shelves')
  })
  .catch(err => {
    console.log(err);
    res.redirect('/shelves')
  })
}

function deleteHelper(shelf) {
  shelf.books.forEach(book => {
    Book.findById(book)
    .then(book => {
      book.shelves.remove(shelf.id)
      book.save()
    })
  })
}



export {
  index,
  newShelf as new,
  create,
  show,
  removeBook,
  edit,
  update,
  deleteShelf as delete,
}