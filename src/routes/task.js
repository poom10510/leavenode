import { Router } from 'express'
import { list, create, update, remove, findById } from '../controllers/task'
import auth from '../middlewares/auth'

const router = Router()
router.get('/list', auth, list)
router.post('/create', auth, create)
router.put('/update', auth, update)
router.delete('/delete', auth, remove)
router.post('/find', auth, findById)


export default router