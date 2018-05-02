import _ from 'lodash'
import Joi from 'joi'
import { respondResult, respondSuccess, respondErrors } from '../utils'
import User from '../models/user'

const availableFields = ['firstname', 'lastname', 'username', 'password', 'picture', 'role', 'department', 'task', 'contact']
const schema = Joi.object().keys({
    firstname: Joi.string(),
    lastname: Joi.string(),
    username: Joi.string(),
    password: Joi.string(),
    picture: Joi.string().optional(),
    role: Joi.string(),
    department: Joi.string(),
    task: Joi.array().items(Joi.string()),
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

export const findById = async(req, res) => {
    try {
        const { _id } = req.body
        const users = await User.findById({ deleted: false, _id })

        respondResult(res)(users)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const findByUser = async(req, res) => {
    try {
        const { username, password } = req.body
        const users = await User.findOne({ username, password })

        respondResult(res)(users)
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

export const update = async(req, res) => {
    try {
        const { _id, ...body } = req.body
        const users = await User.findById({ _id })
        _.map(availableFields, (field) => {
            users[field] = body[field] || users[field]
        })
        users.save()

        respondResult(res)(users)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const remove = async(req, res) => {
    try {
        const { _id } = req.body
        const users = await User.findById({ _id })
        users.deleted = true
        users.save()

        respondSuccess(res)()
    } catch (err) {
        respondErrors(res)(err)
    }
}