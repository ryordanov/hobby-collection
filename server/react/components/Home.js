import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <div>
        <h1>Хоме</h1>
        <Link to='about' className='btn btn-primary btn-lg'>About</Link>
    </div>
);

export default Home;
