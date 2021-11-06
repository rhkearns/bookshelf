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

export {
  index,
}