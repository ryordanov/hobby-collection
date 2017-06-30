import React /* , { Component } */ from 'react';
import { Route, IndexRoute } from 'react-router';
import Home from './components/Home';
import About from './components/About';
import ListItems from './components/ListItems';
import NotFound from './components/NotFound';
import AppContainer from './components/AppContainer';

export default (
  <Route path='/' component={AppContainer}>
    <IndexRoute component={Home} HomeTitle='TITLE' HomeText='subtext' />
    <Route path='/about' component={About} HelloWorldText='data' />
    <Route path='/list' component={ListItems} />
    <Route path='*' component={NotFound} />
  </Route>
);
