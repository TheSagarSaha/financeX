import React, { useEffect, useState } from "react"
import "./profileDetail.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom"

const ProfileData = () => {

    const navigate = useNavigate();
    const [data, setData] = useState(null)
    const [income, setIncome] = useState("")
    const [expense, setExpense] = useState("")
    const [incomeData, setIncomeData] = useState(null)
    const [expenseData, setExpenseData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/profile")
            const json = await response.json()
            console.log(json[0].income);
            if (response.ok) {
                setData(json[0])
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
            console.log(json);
        }
        fetchIncomeData()
    }, []) 

    useEffect(() => {
        const fetchExpenseData = async () => {
            const response = await fetch("/expenseTransactions")
            const json = await response.json()
            console.log(json);
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

    return(
        <div className="profileDetail">
            <h4>Your Accounts At a Glance:</h4>
            <div className="incomeBox">
                <h6>Your Net Income: <span className="amount"> $ {income} </span> 
                    <span className="iconSpan green"> <i className="bi bi-arrow-down-square-fill"></i> <i class="bi bi-plus-square-fill"></i> </span>
                </h6>
                
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
                        <button type="submit" className="btn btn-outline-primary" style={{"marginBottom": "4px"}}>Add Transaction</button>
                    </form>
                    <p><strong>{incomeResult}</strong></p>
                </div>

                <div>
                    <hr />
                    <h6>View Your Past Transactions Here:</h6>
                </div>

            </div>
            <div className="expenseBox">
                <h6>Your Net Expense: <span className="amount"> $ {expense} </span> 
                    <span className="iconSpan red"> <i className="bi bi-arrow-down-square-fill"></i> <i class="bi bi-plus-square-fill"></i> </span>
                </h6>
                
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
                        <button className="btn btn-outline-primary" style={{"marginBottom": "4px"}}>Add Transaction</button>
                    </form>
                    <p><strong>{expenseResult}</strong></p>
                </div>

                <div>
                    <hr />
                    <h6>View Your Past Transactions Here:</h6>
                </div>/

            </div>  
        </div>
    )
}

export default ProfileData
