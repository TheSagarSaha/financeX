import { Link } from "react-router-dom"
import "./header.css"

const Header = () => {
    return (
        <header>
            <div className="navContainer">
                <h4 className="headerTitle">FinancifyX</h4>
                <Link to="/">
                    <div className="navLink">Home</div>
                </Link>
                <Link to="/login">
                <div className="navLink">Login</div>
                </Link><Link to="/signup">
                <div className="navLink">SignUp</div>
                </Link><Link to="/profile">
                <div className="navLink">Profile</div>
                </Link>
            </div>
        </header>
    )
}

export default Header 
