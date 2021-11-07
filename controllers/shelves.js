import { Shelf } from '../models/shelf.js'

function index(req, res) {
  Shelf.find({owner: req.user.profile._id})
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
  .then((shelf) => {
    res.render(`shelves/${shelf._id}`, {
      title: `${shelf.shelfName} Details`,
      shelf,
    })
  })
  .catch(err => {
    console.log(err);
    res.redirect('/shelves')
  })
}

export {
  index,
  newShelf as new,
  create,
  show,
}