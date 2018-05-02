import { Router } from 'express'
import { list, create, update, remove, findById, findByUser } from '../controllers/user'
import auth from '../middlewares/auth'

const router = Router()
router.get('/list', list)
router.post('/create', create)
router.put('/:id', update)
router.delete('/delete', remove)
router.post('/find', findById)
router.post('/login', findByUser)

export default router