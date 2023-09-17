const express = require("express")
const router = express.Router()
var bodyParser = require("body-parser")
const Account = require("../models/account")
const Income = require("../models/income")
const Expense = require("../models/expense")
const requireAuth = require("../middleware/requireAuth")
// const {useAuthContext} =  require("../../client/src/context/useAuthContext")
const jwt = require("jsonwebtoken")
const date = new Date() 
var accountStatus = false
var savedUsername = ""

var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '1d' })
}

// router.use(requireAuth)

router.post("/profile", async (req, res) => { 
  const {username} = req.body
  
  var name = "null"
  if (username) {
    Account.find({username}).then((data) => {
      name = data[0]["first_name"]
      res.send({"msg": name})
    })
    
  } else {
    res.send({"msg": "not logged in"})
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

router.post("/signup", urlencodedParser, async (req, res) => {
  const { f_name, l_name, email, username, password } = req.body
  let currentDate = (date.toISOString()).substring(0,10)
  console.log(f_name, l_name, email, username, password); 
  console.log("\n\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n\n\n")
  try {
    const user = await Account.signup(
      f_name, l_name, email, username, password,
    )
    console.log(user);
    if (user["msg"]) {
      res.status(401).json({"msg": "email/username in use"})
    } else {
      const token = createToken(user._id)
      res.status(200).json({email, token})
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({"msg": "error"})
  } 

  try {
    await Income.create({
      username, 
      income: 0,
      type: "Acount Creation",
      date: currentDate,
      totalIncome: 0
    })
  } catch(error) {
    console.log(error);
  }

  try {
    await Expense.create({
      username,
      type: "Account Creation",
      date: currentDate,
      expense: 0,
      totalExpense: 0
    })
  } catch(err) {
    console.log(err);
  }
  accountStatus = true
  savedUsername = req.body.signup
})

router.post("/login", async (req, res) => {
   const {username, password} = req.body
   console.log(username, password);
   try {
    const user = await Account.login(username, password)
    const token = createToken(user._id)
    res.status(200).json({username, token})
  } catch (error) {
    console.log(error)
    res.status(401).json({error}) 
  }
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
