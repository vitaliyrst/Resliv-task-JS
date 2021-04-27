import React from "react";
import "./Navbar.css";
import {Link} from "react-router-dom";

class Navbar extends React.Component {
    render() {
        return (
            <div className='main_menu_container'>
                <nav className='menu_navbar'>
                    <div>
                        <Link to='/'>
                            <h1> Logo</h1>
                        </Link>
                        <div className='menu_links'>
                            <Link to='/'>Home</Link>
                            <Link to='/employees'>Employees</Link>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;