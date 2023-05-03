const mongoose = require("mongoose")
const Schema = mongoose.Schema

const incomeSchema = new Schema ({
    username: {
        type: String,
        unique: true
    },
    income: {
        type: Number,
        required: true,
    },
    totalIncome: {
        type: Number
    }
})

module.exports = mongoose.model("Income", incomeSchema)
