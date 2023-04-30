import { Link } from "react-router-dom"

const Header = () => {
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h4>HOME</h4>
                </Link>
                <Link to="/login">
                    <h4>login</h4>
                </Link><Link to="/signup">
                    <h4>signup</h4>
                </Link><Link to="/profile">
                    <h4>my profile</h4>
                </Link>
            </div>
        </header>
    )
}

export default Header 
