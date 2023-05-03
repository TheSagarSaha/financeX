import React from "react";
import { useEffect, useState } from "react"

const Home = () => {
  const [test, setTest] = useState(null)

  useEffect(() => {
    const fetchHomePage = async() => {
      const response = await fetch("/")
      setTest(response.status)
    }
    fetchHomePage()
  }, [])

  return (
    <div className="home">
      <h1>This is a home page!</h1>
      <h6>{test}</h6>
    </div>
  )
}

export default Home;
