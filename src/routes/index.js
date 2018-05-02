import { Router } from 'express'
import user from './user'
import department from './department'
import leave from './leave'
import task from './task'


const router = Router()
router.get('/', (req, res) => {
    res.status(200).send({ status: 'API service is running.' })
})

router.use('/users', user)
router.use('/departments', department)
router.use('/leaves', leave)
router.use('/tasks', task)


export default router