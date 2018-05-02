import _ from 'lodash'
import Joi from 'joi'
import { respondResult, respondSuccess, respondErrors } from '../utils'
import Leave from '../models/leave'

const availableFields = ['type', 'status', 'detail']
const schema = Joi.object().keys({
    type: Joi.string(),
    status: Joi.string(),
    user: Joi.string(),
    task: Joi.string(),
    detail: Joi.string().optional()
})

export const list = async(req, res) => {
    try {
        const leaves = await Leave.find({ deleted: false })

        respondResult(res)(leaves)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const findById = async(req, res) => {
    try {
        const { _id } = req.body
        const leaves = await Leave.findById({ deleted: false, _id })

        respondResult(res)(leaves)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const create = async(req, res) => {
    const leaves = Joi.validate(req.body, schema).value

    try {
        const newLeave = await Leave.create(leaves)

        respondResult(res)(newLeave)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const update = async(req, res) => {
    try {
        const { _id, ...body } = req.body
        const leaves = await Leave.findById({ _id })
        _.map(availableFields, (field) => {
            leaves[field] = body[field] || leaves[field]
        })
        leaves.save()

        respondResult(res)(leaves)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const remove = async(req, res) => {
    try {
        const { _id } = req.body
        const leaves = await Leave.findById({ _id })
        leaves.deleted = true
        leaves.save()

        respondSuccess(res)()
    } catch (err) {
        respondErrors(res)(err)
    }
}