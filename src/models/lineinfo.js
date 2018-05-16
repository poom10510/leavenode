const mongoose = require('mongoose')
const deepPopulate = require('mongoose-deep-populate')(mongoose)

const { Schema } = mongoose
const { ObjectId } = Schema.Types

var schema = new Schema({
    __v: { type: Number, select: false },
    lineid: String,
    userid: String,
    deleted: { type: Boolean, default: false, select: false }
})

schema.plugin(deepPopulate)

export default mongoose.model('Lineinfo', schema)