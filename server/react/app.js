import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './common/Header.js';
import Footer from './common/Footer.js';

import Home from './components/Home';
import Edit from './containers/Edit';
import Collections from './containers/Collections';
import NotFound from './components/NotFound';
import Login from './components/Login';

const App = () => (
    <div>
        <Header />
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/collections/:collectionName?/:subCollectionName?' component={Collections} />
            <Route path='/edit/:collectionName/:subCollectionName/:option' component={Edit} />
            <Route component={NotFound} />
        </Switch>
        <Footer />
    </div>
);
ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('app'));

// https://youtu.be/43RIoAwTESQ?t=8014 adding store...
