import { Router } from 'express'
import * as booksCtrl from '../controllers/books.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, booksCtrl.index)
router.get('/new', isLoggedIn, booksCtrl.new)
router.get('/:id', isLoggedIn, booksCtrl.show)
router.post('/', isLoggedIn, booksCtrl.create)
router.delete('/', isLoggedIn, booksCtrl.delete)

export {
  router
}