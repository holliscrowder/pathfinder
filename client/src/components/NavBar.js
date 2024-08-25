import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar({isLoggedIn}) {

    return  (
        <nav className="navbar">
            <NavLink to="/" className="nav-link">
                Home
            </NavLink>
            <NavLink to="/paths" className="nav-link">
                Paths
            </NavLink>
            <NavLink to="profile" className="nav-link">
                Profile
            </NavLink>
        </nav>
    )
}

export default NavBar;
