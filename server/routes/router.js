const express = require("express")
const router = express.Router()
const Account = require("../models/account")

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
  try {
    const accountSignup = await Account.create({
      email, username, password
    })
    res.send(accountSignup)
  } catch (error) {
    console.log(error);
  }
})

router.post("/login", (req, res) => {
  Account.find({username: req.body.username, password: req.body.password}).then((data) => {
    if (data.length != 0) {
      res.send("found it")
    } else {
      res.send("not found")
    }
  })
})

module.exports = router;
