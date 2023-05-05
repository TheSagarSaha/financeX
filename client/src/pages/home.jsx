import React from "react";
import { useEffect, useState } from "react"
import "./home.css"
import "bootstrap/dist/css/bootstrap.min.css"

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to FinancifyX</h1>
      <h4>Track Your Expenses and Set Financial Goals with the help of FinancifyX</h4>
      <br /> <br />
      <h5>Join Today and Start Using FinancifyX</h5>
      <a className="btn btn-primary" href="/login">Login</a>
      <a className="btn btn-primary" href="/signup">SignUp</a>
    </div>
  )
}

export default Home;
