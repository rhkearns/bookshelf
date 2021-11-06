import { Router } from 'express'
import * as shelvesCtrl from '../controllers/shelves.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, shelvesCtrl.index)
router.get('/new', isLoggedIn, shelvesCtrl.new)

export {
  router
}