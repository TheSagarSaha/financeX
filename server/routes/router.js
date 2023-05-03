const express = require("express")
const router = express.Router()
const Account = require("../models/account")
const Income = require("../models/income")
const Expense = require("../models/expense")
var accountStatus = false
var savedUsername = ""

router.get("/", (req, res) => {
  res.send("homepage")
})

router.get("/login", (req,res) => {
  res.send("this is the login page")
})

router.get("/signup", (req,res) => {
  res.send("this is the signup page")
})

router.post("/signup", async (req, res) => {
  const { email, username, password } = req.body
  const income = req.body.income
  const expense = req.body.expense
  console.log(income, expense);
  try {
    const accountSignup = await Account.create({
      email, username, password,
      income: income,
      expense: expense
    })
    res.send(accountSignup)
  } catch (error) {
    console.log(error);
  }

  try {
    const incomeSignup = await Income.create({
      username, 
      income: income,
      totalIncome: income
    })
  } catch(error) {
    console.log(error);
  }

  try {
    const expenseSignup = await Expense.create({
      username,
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

router.get("/profile", async (req, res) => {
  if (accountStatus && savedUsername) {
    Account.find({username: savedUsername}).then((data) => {
      res.send(data)
    })  
  } else {
    res.send("signed out")
  }

})

router.get("/signout", (req, res) => {
  accountStatus = false
  savedUsername = ""
})

module.exports = router;
