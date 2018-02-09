import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <header>
        <nav>
            <ul>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/listCollections'>Collections</Link></li>
                {/* <li><Link to='/items'>Items</Link></li> */}
                <li><Link to='/about'>About</Link></li>
            </ul>
        </nav>
    </header>
);

export default Header;