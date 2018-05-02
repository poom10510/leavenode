import { Router } from 'express'
import { list, create, update, remove, findById } from '../controllers/task'
import auth from '../middlewares/auth'

const router = Router()
router.get('/list', list)
router.post('/create', create)
router.put('/:id', update)
router.delete('/delete', remove)
router.post('/find', findById)


export default router