import _ from 'lodash'
import Joi from 'joi'
import { respondResult, respondSuccess, respondErrors } from '../utils'
import Lineinfo from '../models/lineinfo'

const availableFields = ['name', 'detail']
const schema = Joi.object().keys({
    lineid: Joi.string(),
    userid: Joi.string()
})

export const list = async(req, res) => {
    try {
        const infos = await Lineinfo.find({ deleted: false })

        respondResult(res)(infos)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const findById = async(req, res) => {
    try {
        const { _id } = req.body
        const infos = await Lineinfo.findById({ deleted: false, _id })

        respondResult(res)(infos)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const create = async(req, res) => {
    const infos = Joi.validate(req.body, schema).value
    const { lineid } = req.body
    try {
        const checkinfos = await Lineinfo.findOne({ deleted: false, lineid })
        if (checkinfos) {
            respondResult(res)({ errortext: "lineid exist" })
        } else {
            const newLine = await Lineinfo.create(infos)
            respondResult(res)(newLine)
        }

    } catch (err) {
        respondErrors(res)(err)
    }
}

export const update = async(req, res) => {
    try {
        const _id = req.params.id
        const {...body } = req.body
        const infos = await Lineinfo.findById({ _id })
        _.map(availableFields, (field) => {
            infos[field] = body[field] || infos[field]
        })
        infos.save()

        respondResult(res)(infos)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const remove = async(req, res) => {
    try {
        const { _id } = req.body
        const infos = await Lineinfo.findById({ _id })
        infos.deleted = true
        infos.save()

        respondSuccess(res)()
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const findBylineId = async(req, res) => {
    try {
        const { lineid } = req.body
            //const infos = await Lineinfo.findOne({ deleted: false, lineid })
        const infos = await Lineinfo.find({ deleted: false, lineid: lineid })

        respondResult(res)(infos)
    } catch (err) {
        respondErrors(res)(err)
    }
}