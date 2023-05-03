const mongoose = require("mongoose")
const Schema = mongoose.Schema

const expenseSchema = new Schema ({
    username: {
        type: String,
        unique: true
    },
    expense: {
        type: Number,
        required: true,
    },
    totalExpense: {
        type: Number
    }
})

module.exports = mongoose.model("Expense", expenseSchema)
