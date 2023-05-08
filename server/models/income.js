const mongoose = require("mongoose")
const Schema = mongoose.Schema

const incomeSchema = new Schema ({
    username: {
        type: String,
    },
    income: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    totalIncome: {
        type: Number
    }
})

module.exports = mongoose.model("Income", incomeSchema)
