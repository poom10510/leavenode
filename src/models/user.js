const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

var schema = new Schema({
    __v: { type: Number, select: false },
    firstname: String,
    lastname: String,
    username: {
        type: String,
        unique: true
    },
    hash_password: {
        type: String,
        select: false
    },
    picture: String,
    role: String,
    token: String,
    department: { type: ObjectId, ref: 'Department' },
    tasks: [{ type: ObjectId, ref: 'Task' }],
    contact: Object,
    deleted: { type: Boolean, default: false, select: false }
})

export default mongoose.model('User', schema)