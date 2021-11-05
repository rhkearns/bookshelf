import { Router } from 'express'
import * as booksCtrl from '../controllers/books.js'

const router = Router()

router.get('/new', booksCtrl.new)
router.post('/books', booksCtrl.create)

export {
  router
}