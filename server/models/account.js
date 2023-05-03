const mongoose = require("mongoose")
const Schema = mongoose.Schema

const accountSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    income: {
        type: Number,
        required: true
    },
    expense: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model("Account", accountSchema)
