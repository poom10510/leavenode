import { Router } from 'express'
import * as MODELS from '../models'
import bcrypt from 'bcryptjs'
import uuidV4 from 'uuid/v4'
import _ from 'lodash'

const router = Router()
router.get('/', (req, res) => {
    res.status(200).send({ status: 'API service is running.' })
})

//----------------------------- USER -----------------------------
router.get('/users', async(req, res) => {
    const users = await MODELS.User.find()
    res.status(200).send(users)
})

router.post('/users', async(req, res) => {
    const { password, ...userData } = req.body
    const hash_password = bcrypt.hashSync(password, userData.username.length)
    const user = await MODELS.User.create({
        ...userData,
        hash_password
    })
    res.status(200).send(user)
})

router.post('/users/update', async(req, res) => {
    const { _id, ...userData } = req.body
    const user = await MODELS.User.findById({ _id })
    _.map(userData, (value, field) => {
        user[field] = value
    })
    user.save()
    res.status(200).send(user)
})

router.post('/users/generate-admin', async(req, res) => {
    let admin = await MODELS.User.findOne({ role: 'admin' })
    if (admin || req.body.password !== 'THIS_PASSWORD_CAN_BE_USED_FOR_GENERATE_ADMIN') {
        res.status(403).send({ message: 'forbidden' })
        return
    }
    const username = 'adminA'
    admin = await MODELS.User.create({
        role: 'admin',
        username,
        hash_password: bcrypt.hashSync('admin', username.length)
    })
    delete admin.hash_password
    res.status(200).send(_.omitBy(admin, 'hash_password'))
})

const loginController = async(req, res) => {
    const { username, password } = req.body
    const user = await MODELS.User.findOne({ username }).select('+hash_password')

    if (!user || !bcrypt.compareSync(password, user.hash_password)) {
        res.status(401).send({ message: 'auth failed' })
        return
    }

    const token = uuidV4()
    await MODELS.User.update({ username }, { token })
    res.status(200).send({ token })
}
router.post('/users/login', loginController)

router.get('/users/me', async(req, res) => {
    const token = req.get('token')
    const user = await MODELS.User.find({ token })

    if (!user) {
        res.status(403).send({ message: 'forbidden' })
        return
    }

    res.status(200).send(user)
})

router.post('/users/logout', async(req, res) => {
    const token = req.get('token') || 'hack'
    const user = await MODELS.User.find({ token })

    if (!user) {
        res.status(403).send({ message: 'forbidden' })
        return
    }
    await MODELS.User.update({ _id: user._id.toString() }, { token: null })
    res.status(200).send({ success: true })
})

router.post('/users/clear', async(req, res) => {
    await MODELS.User.remove()
    res.status(200).send({ success: true })
})

//----------------------------- TASKS -----------------------------

router.get('/tasks', async(req, res) => {
    const tasks = await MODELS.Task.find()
    res.status(200).send(tasks)
})
router.post('/tasks', async(req, res) => {
    const taskData = req.body
    const task = await MODELS.Task.create(taskData)
    res.status(200).send(task)
})
router.delete('/tasks', async(req, res) => {
    const { _id } = req.body
    const task = await MODELS.Task.remove({ _id })
    res.status(200).send({ success: true })
})

//----------------------------- DEPARTMENTS -----------------------------

router.get('/departments', async(req, res) => {
    const departments = await MODELS.Department.find()
    res.status(200).send(departments)
})
router.post('/departments', async(req, res) => {
    const departmentData = req.body
    const department = await MODELS.Department.create(departmentData)
    res.status(200).send(department)
})
router.delete('/departments', async(req, res) => {
    const { _id } = req.body
    const dep = await MODELS.Department.remove({ _id })
    res.status(200).send({ success: true })
})

//----------------------------- LEAVES -----------------------------
import { reportsupervisor } from '../controllers/notification'

router.get('/leaves', async(req, res) => {
    const leaves = await MODELS.Leave.find().populate('user').populate('substitute')
    res.status(200).send(leaves)
})
router.post('/leaves', async(req, res) => {
    const leaveData = req.body
    reportsupervisor(leaveData.user)
    const leave = await MODELS.Leave.create(leaveData) //.populate('user').populate('substitute')
    res.status(200).send(leave)
})
router.post('/leaves/update', async(req, res) => {
    const { _id, ...leaveData } = req.body
    const leave = await MODELS.Leave.findById({ _id })
    _.map(leaveData, (value, field) => {
        leave[field] = value
    })
    leave.save()
    res.status(200).send(leave)
})

export default router

//----------------------------- Line -----------------------------
import lineinfos from './lineinfos'
router.use('/lines', lineinfos)