import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/header" 
import './App.css'
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'
import Profile from './pages/profile'
import Footer from "./components/footer"

function App() {
  return (
    <div className="App">
      <BrowserRouter> 
      <Header />
        <div className="pages"> 
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
          <Routes>
            <Route path="/signup" element={<Signup />} />
          </Routes>
          <Routes>
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  )
}

export default App;
