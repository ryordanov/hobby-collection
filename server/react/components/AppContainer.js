import React from 'react';
import { Link, IndexLink } from 'react-router';

var items = {
    'Home': '/',
    'About': '/about',
    'Items': '/list'
};

const AppContainer = props => {
    var links = [];

    Object.keys(items).forEach(function(el, index) {
        links.push(<IndexLink key={el} activeClassName='active' to={items[el]}>{el}</IndexLink>);
        if (index < Object.keys(items).length - 1) {
            links.push(' | ');
        }
    });
    // links.pop();

    return (
      <div>
        {links}
        {' ? '}
        <Link to={'/backend'}>{'None'}</Link>
        {props.children}
      </div>
    );
};

export default AppContainer;
