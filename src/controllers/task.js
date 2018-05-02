import _ from 'lodash'
import Joi from 'joi'
import { respondResult, respondSuccess, respondErrors } from '../utils'
import Task from '../models/task'

const availableFields = ['name', 'detail']
const schema = Joi.object().keys({
    name: Joi.string(),
    detail: Joi.string().optional()
})

export const list = async(req, res) => {
    try {
        const tasks = await Task.find({ deleted: false })

        respondResult(res)(tasks)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const findById = async(req, res) => {
    try {
        const { _id } = req.body
        const tasks = await Task.findById({ deleted: false, _id })

        respondResult(res)(tasks)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const create = async(req, res) => {
    const tasks = Joi.validate(req.body, schema).value

    try {
        const newTask = await Task.create(tasks)

        respondResult(res)(newTask)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const update = async(req, res) => {
    try {
        const { _id, ...body } = req.body
        const tasks = await Task.findById({ _id })
        _.map(availableFields, (field) => {
            tasks[field] = body[field] || tasks[field]
        })
        tasks.save()

        respondResult(res)(tasks)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const remove = async(req, res) => {
    try {
        const { _id } = req.body
        const tasks = await Task.findById({ _id })
        tasks.deleted = true
        tasks.save()

        respondSuccess(res)()
    } catch (err) {
        respondErrors(res)(err)
    }
}