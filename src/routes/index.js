import { Router } from 'express'
import * as MODELS from '../models'
import bcrypt from 'bcrypt'
import uuidV4 from 'uuid/v4'

const router = Router()
router.get('/', (req, res) => {
    res.status(200).send({ status: 'API service is running.' })
})

router.get('/users', async (req, res) => {
    const users = await MODELS.User.find()
    res.status(200).send(users)
})

router.post('/users', async (req, res) => {
    const { password, ...userData } = req.body
    const hash_password = bcrypt.hashSync(password, UserData.username.length)
    const user = await MODELS.User.create({
        ...userData,
        hash_password
    })
    res.status(200).send(user)
})

router.put('/users/:id', async (req, res) => {
    const userData = req.body
    const user = await MODELS.User.update({ _id: userData._id }, userData)
    res.status(200).send(user)
})

router.post('/users/generate-admin', async (req, res) => {
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

const loginController = async (req, res) => {
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

router.get('/users/me', async (req, res) => {
    const token = req.get('token')
    const user = await MODELS.User.find({ token })

    if (!user) {
        res.status(403).send({ message: 'forbidden' })
        return
    }
    
    res.status(200).send(user)
})

router.post('/users/logout', async (req, res) => {
    const token = req.get('token') || 'hack'
    const user = await MODELS.User.find({ token })
    
    if (!user) {
        res.status(403).send({ message: 'forbidden' })
        return
    }
    await MODELS.User.update({ _id: user._id.toString() }, { token: null })
    res.status(200).send({ success: true })
})

router.post('/users/clear', async (req, res) => {
    await MODELS.User.remove()
    res.status(200).send({ success: true })
})

export default router