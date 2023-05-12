const express = require("express")
const router = express.Router()
const Account = require("../models/account")
const Income = require("../models/income")
const Expense = require("../models/expense")
const date = new Date()
var accountStatus = false
var savedUsername = ""

router.get("/profile", (req, res) => {
  if (accountStatus && savedUsername) {
    Account.find({username: savedUsername}).then((data) => {
      res.send(data)
    })  
  } else {
    res.send({"msg": "signed-out"})
  }
})

router.get("/incomeTransactions", (req, res) => {
  if (accountStatus && savedUsername) {
    Income.find({username: savedUsername}).then((data) => {
      res.send(data)
    })
  }
})

router.get("/expenseTransactions", (req, res) => {
  if (accountStatus && savedUsername) {
    Expense.find({username: savedUsername}).then((data) => {
      res.send(data)
    })
  }
})

router.get("/signout", (req, res) => {
  accountStatus = false
  savedUsername = ""
})

router.post("/signup", async (req, res) => {
  const { name, email, username, password } = req.body
  const income = req.body.income
  const expense = req.body.expense
  let currentDate = (date.toISOString()).substring(0,10)

  try {
    await Account.create({
      name, email, username, password,
      income: income,
      expense: expense
    })
    res.send({"msg": "success"})
  } catch (error) {
    console.log(error);
  }

  try {
    await Income.create({
      username, 
      income: income,
      type: "Initial Amount",
      date: currentDate,
      totalIncome: income
    })
  } catch(error) {
    console.log(error);
  }

  try {
    await Expense.create({
      username,
      type: "Initial Amount",
      date: currentDate,
      expense: expense,
      totalExpense: expense
    })
  } catch(err) {
    console.log(err);
  }
  accountStatus = true
  savedUsername = req.body.signup
})

router.post("/login", (req, res) => {
   Account.find({username: req.body.username, password: req.body.password}).then((data) => {
    if (data.length != 0) {
      res.status(200).json({msg: "found"})
      accountStatus = true
      savedUsername = data[0].username
    } else {
      res.status(404).json({msg: "not found"})
      savedUsername = ""
    }
    
  })
})

router.post("/income", async (req, res) => {
  
  let currentDate = (date.toISOString()).substring(0,10)
  let postingError = false
  try {
    const newIncome = await Income.create({
      username: savedUsername,
      income: parseInt(req.body.addIncome),
      type: req.body.addIncomeType,
      date: currentDate
    })
  } catch (err) {
    console.log(err);
    postingError = true
  }

  try {
    var income=0
    await Account.find({username: savedUsername}).then((data) => {
      income = data[0].income
    })

    await Account.findOneAndUpdate(
      {username: savedUsername},
      {income: income + parseInt(req.body.addIncome)}
    )
  } catch (err) {
    console.log(err);
    postingError = true
  }

  if(!postingError) {
    res.send({"msg": "success"})
  } else { res.send("error") }

})

router.post("/expense", async (req, res) => {
  let currentDate = (date.toISOString()).substring(0,10)
  let postingError = false
  
  try {
    await Expense.create({
      username: savedUsername,
      expense: parseInt(req.body.addExpense),
      type: req.body.addExpenseType,
      date: currentDate
    })
  } catch (err) {
    console.log(err);
    postingError = true
  }

  var expense=0
  await Account.find({username: savedUsername}).then((data) => {
    expense = data[0].expense
  })

  try {
    await Account.findOneAndUpdate(
      {username: savedUsername},
      {expense: expense + parseInt(req.body.addExpense)}
    )
  } catch (err) {
    console.log(err);
    postingError = true
  }

  if(!postingError) {
    res.send({"msg": "success"})
  } else { res.send("error") }

})

module.exports = router;
