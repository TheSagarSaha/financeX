import { Link } from "react-router-dom"
import "bootstrap-icons/font/bootstrap-icons.css";
import "./header.css"

const Header = () => {
    return (
        <header>
            <div className="navContainer">
                <h4 className="headerTitle">FinancifyX <i class="bi bi-coin"></i></h4>
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
                <span className="theSagarSaha"><strong>@TheSagarSaha</strong></span>
            </div>
            
        </header>
    )
}

export default Header 
