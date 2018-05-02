import _ from 'lodash'
import Joi from 'joi'
import { respondResult, respondSuccess, respondErrors } from '../utils'
import { admin } from '../utils/admin'
import User from '../models/user'

const availableFields = ['firstname', 'lastname', 'username', 'password', 'picture', 'role', 'department', 'tasks', 'contact']
const schema = Joi.object().keys({
    firstname: Joi.string(),
    lastname: Joi.string(),
    username: Joi.string(),
    password: Joi.string(),
    picture: Joi.string().optional(),
    role: Joi.string(),
    department: Joi.string(),
    tasks: Joi.array().items(Joi.string()),
    contact: Joi.object().optional()
})

export const list = async(req, res) => {
    try {
        const users = await User.find({ deleted: false })

        respondResult(res)(users)
    } catch (err) {
        respondErrors(res)(err)
    }
}

// const findById = async(req, res) => {
//     try {
//         const { _id } = req.body
//         const users = await User.findById({ deleted: false, _id })

//         respondResult(res)(users)
//     } catch (err) {
//         respondErrors(res)(err)
//     }
// }

// export const me = async (req, res) => {
//     const { token } = req.body
// }

export const login = async(req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username, password })
        user.token = 'xxxxx'
        respondResult(res)(user)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const create = async(req, res) => {
    const users = Joi.validate(req.body, schema).value

    try {
        const newUser = await User.create(users)

        respondResult(res)(newUser)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const update = async (req, res) => {
    try {
        const _id = req.params.id
        const {...body } = req.body
        const user = await User.findById({ _id })
        _.map(availableFields, (field) => {
            users[field] = body[field] || users[field]
        })
        user.save()

        respondResult(res)(user)
    } catch (err) {
        respondErrors(res)(err)
    }
}


export const adminLogin = async (req, res) => {
    const { username, password } = req.body
    if (admin.username === username && admin.password === password) {
        admin.token = uuidV4()
        res.status(200).send({ token: admin.token })
        return
    }
    res.status(401).send({ message: 'auth failed' })
}

export const adminLogout = async (req, res) => {
    if (req.body.token === admin.token && admin.token) {
        admin.token = null
        res.status(200).send({ message: 'success' })
        return
    }
    res.status(403).send({ message: 'forbidden' })
}
