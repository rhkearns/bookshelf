import { Shelf } from '../models/shelf.js'

function index(req, res) {
  Shelf.find({})
  .then(shelves => {
    res.render('shelves/index', {
      title: `${req.user.profile.name}'s Shelves`,
      shelves, 
    })
  })
}

function newShelf(req, res) {
  res.render('shelves/new', {title: 'New Shelf'})
}

function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Shelf.create(req.body)
  .then(shelf => {
    req.redirect('/shelves')
  })
  .catch(err => {
    console.log(err);
    req.redirect('/shelves')
  })
}

export {
  index,
  newShelf as new,
  create,
}