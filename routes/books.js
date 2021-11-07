import { Router } from 'express'
import * as booksCtrl from '../controllers/books.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, booksCtrl.index)
router.get('/new', isLoggedIn, booksCtrl.new)
router.get('/:id', isLoggedIn, booksCtrl.show)
router.get('/:id/edit', isLoggedIn, booksCtrl.edit)
router.post('/', isLoggedIn, booksCtrl.create)
router.post('/:id/reviews', isLoggedIn, booksCtrl.addReview)
router.post('/:id/notes', isLoggedIn, booksCtrl.addNote)
router.post('/:id/shelves', isLoggedIn, booksCtrl.addToShelf)
router.put('/:id', isLoggedIn, booksCtrl.update)
router.delete('/:id', isLoggedIn, booksCtrl.delete)
router.delete('/:id/reviews/:reviewId', isLoggedIn, booksCtrl.deleteReview)
router.delete('/:id/notes/:noteId', isLoggedIn, booksCtrl.deleteNote)

export {
  router
}