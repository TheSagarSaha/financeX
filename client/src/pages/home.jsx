import React from "react";
import "./home.css"
import "bootstrap/dist/css/bootstrap.min.css"

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to FinancifyX  <i class="bi bi-coin"></i></h1>
      <h4>Track Your Expenses and Set Financial Goals with the help of FinancifyX</h4>
      <br /> <br />
      <h5>Join Today and Start Using FinancifyX </h5>
      <a style={{"width": "130px"}} className="btn btn-primary" href="/login">Login <i class="bi bi-box-arrow-in-right"></i> </a>
      <a style={{"width": "130px"}} className="btn btn-primary" href="/signup">Sign Up  <i class="bi bi-person-plus-fill"></i> </a>

      <div className="about">
        <h2>What is FinancifyX <i class="bi bi-question-square"></i> </h2>
        <p>FinancifyX is a web app that helps you keep track of your financial records. Easily add and remove your records as needed. </p>
        <p>It can also help you track how much money you need to save for specific categories such as Expenses/Investments/Savings and many more!</p>
      </div>

      <div className="about">
        <h2>How it Works <i class="bi bi-building-lock"></i></h2>
        <p>FinancifyX uses MongoDB as its database and uses React and Express.js for its frontend rendering. The data is securely stored and nobody have access to those.
          FinancifyX is adding more features, which lets users to edit their username and password. 
        </p>
      </div>
      
    </div>
  )
}

export default Home;
