import React, { useEffect, useState } from "react"
import { useLogout } from "../context/useLogout";
import "./profileDetail.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom"

const ProfileData = () => {

    const navigate = useNavigate();
    const [income, setIncome] = useState("")
    const [expense, setExpense] = useState("")
    const [incomeData, setIncomeData] = useState(null)
    const [expenseData, setExpenseData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/profile")
            const json = await response.json()
            if (response.ok) {
                setIncome(json[0].income)
                setExpense(json[0].expense)
            }
        }
        fetchData()
    }, []) 

    useEffect(() => {
        const fetchIncomeData = async () => {
            const response = await fetch("/incomeTransactions")
            const json = await response.json()
            setIncomeData(json)
        }
        fetchIncomeData()
    }, []) 

    useEffect(() => {
        const fetchExpenseData = async () => {
            const response = await fetch("/expenseTransactions")
            const json = await response.json()
            setExpenseData(json)
        }
        fetchExpenseData()
    }, []) 

    const [addIncome, setAddIncome] = useState()
    const [addIncomeType, setIncomeAddtype] = useState()
    const [incomeResult, setIncomeResult] = useState("")
    const [addExpense, setAddExpense] = useState("")
    const [addExpenseType, setAddExpenseType] = useState("")
    const [expenseResult, setExpenseResult] = useState("")

    const onNewIncome = async (e) => {
        const credentials = {addIncome, addIncomeType}
        const response = await fetch("/income", {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await response.json()
        if(json.msg === "success") {
            navigate("/profile")
        } else {
            setIncomeResult("Opps! Please Enter All Values Correctly and Try Again")
        }
    }

    const onNewExpense = async (e) => {
        const credentials = {addExpense, addExpenseType}
        const response = await fetch("/expense", {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await response.json()
        if(json.msg === "success") {
            navigate("/profile")
        } else {
            setExpenseResult("Opps! Please Enter All Values Correctly and Try Again")
        }
    }

    const netValue = income-expense;
    
    const {logout} = useLogout()
    const onSignOut = () => {
        logout()
        navigate("/")
    }

    return(
        <div className="profileDetail">
            <h4>Your Accounts At a Glance:</h4>
            <div className="incomeBox">
                <h6>Your Total Income: <span className="netAmount"> $ {income} </span> </h6>
                
                <div>
                    <hr />
                    <form onSubmit={onNewIncome}>
                        <label>Add an Income Transanction: </label><br />
                        <input 
                            value={addIncome} 
                            onChange={(e) => setAddIncome(e.target.value)}
                            className="form-control add" 
                            type="number" 
                            placeholder="Enter Amount" 
                        />
                        <input 
                            value={addIncomeType} 
                            onChange={(e) => setIncomeAddtype(e.target.value)}
                            className="form-control add" 
                            type="text" 
                            placeholder="Enter Transaction Type" 
                        />
                        <button type="submit" className="btn btn-outline-success" style={{"marginBottom": "4px"}}>Add Transaction</button>
                    </form>
                    <p><strong>{incomeResult}</strong></p>
                </div>

                <div className="transactionsDetailsDiv">
                    <hr />
                    <h6>View Your Past Transactions Here:</h6> <br />
                    <label> <strong>  Type: </strong></label>
                    <label className="transactionsLabel amount"> <strong>  Amount: </strong></label>
                    <label className="transactionsLabel date"> <strong>  Date: </strong></label>
                    {incomeData && incomeData.map((currentData) => (
                        <div key={currentData._id}> 
                            <label className="transactionsLabel type">{currentData.type}</label>
                            <label className="transactionsLabel amount">$ {currentData.income}</label>
                            <label className="transactionsLabel date">{currentData.date} </label> <br />
                        </div>
                    ))}
                    <br />
                </div>

            </div>
            <div className="expenseBox">
                <h6>Your Total Expense: <span className="netAmount"> $ {expense} </span> </h6>
                
                <div>
                    <hr />
                    <form onSubmit={onNewExpense}>
                        <label>Add an Expense Transanction: </label><br />
                        <input 
                            value={addExpense} 
                            onChange={(e) => setAddExpense(e.target.value)}
                            className="form-control add" 
                            type="number" 
                            placeholder="Enter Amount" 
                        />
                        <input 
                            value={addExpenseType} 
                            onChange={(e) => setAddExpenseType(e.target.value)}
                            className="form-control add" 
                            type="text" 
                            placeholder="Enter Transaction Type"
                        />
                        <button className="btn btn-outline-danger" style={{"marginBottom": "4px"}}>Add Transaction</button>
                    </form>
                    <p><strong>{expenseResult}</strong></p>
                </div>

                <div className="transactionsDetailsDiv">
                    <hr />
                    <h6>View Your Past Transactions Here:</h6> <br />
                    <label> <strong>  Type: </strong></label>
                    <label className="transactionsLabel amount"> <strong>  Amount: </strong></label>
                    <label className="transactionsLabel date"> <strong>  Date: </strong></label>
                    {expenseData && expenseData.map((currentData) => (
                        <div key={currentData._id}> 
                            <label className="transactionsLabel type">{currentData.type}</label>
                            <label className="transactionsLabel amount">$ {currentData.expense}</label>
                            <label className="transactionsLabel date">{currentData.date} </label> <br />
                        </div>
                    ))}
                    <br />
                </div>

            </div>  

            <div className="net">
                <h3>Your Net Income: ${netValue} </h3>
            </div>
            <div className="overall">
                <h3>Your Overall Net Income Breakdown:</h3> <br />
                <h4>Expenses: <span className="percentage">50%</span> <span className="bd-value">$ {netValue*0.5}</span> </h4>
                <h4>Savings: <span className="percentage">20%</span> <span className="bd-value">$ {netValue*0.2}</span> </h4>
                <h4>Investments: <span className="percentage">20%</span> <span className="bd-value">$ {netValue*0.2}</span> </h4>
                <h4>Others: <span className="percentage">10%</span> <span className="bd-value">$ {netValue*0.1}</span> </h4>
                <br /> <br />
                <h6 style={{"marginLeft": "20%"}}>
                    <button 
                        className="btn btn-outline-danger"
                        style={{"textDecoration":"none", "width":"25%"}} 
                        onClick={onSignOut}>Sign Out <i class="bi bi-box-arrow-in-left"></i>
                    </button>
                </h6>
            </div>
            
        </div>
    )
}

export default ProfileData
