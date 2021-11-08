import { Router } from 'express'
import * as shelvesCtrl from '../controllers/shelves.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, shelvesCtrl.index)
router.get('/new', isLoggedIn, shelvesCtrl.new)
router.get('/:id', isLoggedIn, shelvesCtrl.show)
router.post('/', isLoggedIn, shelvesCtrl.create)
router.delete('/:id/books/:bookId', isLoggedIn, shelvesCtrl.removeBook)
router.delete('/:id', isLoggedIn, shelvesCtrl.delete)

export {
  router
}