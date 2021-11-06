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

export {
  index,
  newShelf as new,
}