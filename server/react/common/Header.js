import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <header>
        <div className="container-fluid">
            <nav className="navbar navbar-default navbar-inverse">
                <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav">
                        <li><NavLink to='/home'>Home</NavLink></li>
                        <li><NavLink to='/collections'>Collections</NavLink></li>
                        <li><NavLink to='/about'>About</NavLink></li>
                        
                    </ul>
                    {/* <p className="navbar-text"> | </p> */}
                    <ul className="nav navbar-nav navbar-right">
                        {sessionStorage.getItem('loggedin') !== 'true' && <li><NavLink to='/login'><span className="glyphicon glyphicon-log-in"></span> Log In</NavLink></li>}
                        {sessionStorage.getItem('loggedin') !== 'true' && <li><NavLink to='/signup'> Sign Up</NavLink></li>}
                        {sessionStorage.getItem('loggedin') === 'true' && <li><NavLink to='/logout'><span className="glyphicon glyphicon-log-out"></span> Log Out</NavLink></li>}
                    </ul>
                </div>
            </nav>
        </div>
    </header>
);

export default Header;
