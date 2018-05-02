const mongoose = require('mongoose')
const deepPopulate = require('mongoose-deep-populate')(mongoose)

const { Schema } = mongoose
const { ObjectId } = Schema.Types

var schema = new Schema({
    __v: { type: Number, select: false },
    type: String,
    status: String,
    detail: String,
    user: { type: ObjectId, ref: 'User' },
    task: { type: ObjectId, ref: 'Task' },
    deleted: { type: Boolean, default: false, select: false }
})

schema.plugin(deepPopulate)

export default mongoose.model('Leave', schema)