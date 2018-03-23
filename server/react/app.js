import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './common/Header.js';
import Footer from './common/Footer.js';

import Home from './components/Home';
import Add from './components/Add';
import Edit from './components/Edit';
import Collections from './components/Collections';
import NotFound from './components/NotFound';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Logout from './components/Logout';
import EnsureLoggedInContainer from './components/EnsureLoggedInContainer';

const App = () => (
    <div>
        <Header />
        <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={SignUp} />
            <Route path='/logout' component={Logout} />
            <Route path='/home' component={Home} />
            <EnsureLoggedInContainer>
                <Route path='/collections/:collectionName?/:subCollectionName?' component={Collections} />
                <Route path='/edit/:collectionName/:subCollectionName/:option' component={Edit} />
                <Route path='/add/:collectionName?/:subCollectionName?' component={Add} />
            </EnsureLoggedInContainer>
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
