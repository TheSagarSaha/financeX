const mongoose = require("mongoose")
const Schema = mongoose.Schema

const expenseSchema = new Schema ({
    username: {
        type: String,
    },
    expense: {
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
    totalExpense: {
        type: Number
    }
})

module.exports = mongoose.model("Expense", expenseSchema)
