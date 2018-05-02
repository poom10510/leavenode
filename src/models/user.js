const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

var schema = new Schema({
    __v: { type: Number, select: false },
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    picture: String,
    role: String,
    department: { type: ObjectId, ref: 'Task' },
    task: [{ type: ObjectId, ref: 'Task' }],
    contact: Object,
    deleted: { type: Boolean, default: false, select: false }
})

export default mongoose.model('User', schema)