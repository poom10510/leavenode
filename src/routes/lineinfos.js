import { Router } from 'express'
import { list, create, update, remove, findById, findBylineId } from '../controllers/lineinfo'
import { findById1 } from '../controllers/notification'

const router = Router()
router.get('/list', list)
router.post('/create', create)
router.post('/update', update)
router.post('/delete', remove)
router.post('/find', findById)
router.post('/findline', findBylineId)
router.post('/find1', findById1)

export default router