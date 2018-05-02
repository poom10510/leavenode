import _ from 'lodash'
import Joi from 'joi'
import { respondResult, respondSuccess, respondErrors } from '../utils'
import Department from '../models/department'

const availableFields = ['name', 'detail']
const schema = Joi.object().keys({
    name: Joi.string(),
    detail: Joi.string().optional()
})

export const list = async(req, res) => {
    try {
        const departments = await Department.find({ deleted: false })

        respondResult(res)(departments)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const findById = async(req, res) => {
    try {
        const { _id } = req.body
        const department = await Department.findById({ deleted: false, _id })

        respondResult(res)(department)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const create = async(req, res) => {
    const department = Joi.validate(req.body, schema).value

    try {
        const newDepartment = await Department.create(department)

        respondResult(res)(newDepartment)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const update = async(req, res) => {
    try {
        const { _id, ...body } = req.body
        const department = await Department.findById({ _id })
        _.map(availableFields, (field) => {
            department[field] = body[field] || department[field]
        })
        department.save()

        respondResult(res)(department)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const remove = async(req, res) => {
    try {
        const { _id } = req.body
        const department = await Department.findById({ _id })
        department.deleted = true
        department.save()

        respondSuccess(res)()
    } catch (err) {
        respondErrors(res)(err)
    }
}