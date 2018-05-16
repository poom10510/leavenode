import { Router } from 'express'
import { list, create, update, remove, findById, findBylineId } from '../controllers/lineinfo'

const router = Router()
router.get('/list', list)
router.post('/create', create)
router.post('/update', update)
router.post('/delete', remove)
router.post('/find', findById)
router.post('/findline', findBylineId)

export default router