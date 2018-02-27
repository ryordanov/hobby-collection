import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <header>
        <nav>
            <ul>
                <li><Link to='/login'>Log In</Link></li>
                <li><Link to='/signup'>Sign Up</Link></li>
                <li><Link to='/logout'>Log Out</Link></li>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/collections'>Collections</Link></li>
                {/* <li><Link to='/items'>Items</Link></li> */}
                <li><Link to='/about'>About</Link></li>
            </ul>
        </nav>
    </header>
);

export default Header;
