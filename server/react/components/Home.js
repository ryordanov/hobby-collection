import React from 'react';
const Home = (props) => {
    return (
      <div className='hello-world'>
        <h1>Text from router: {props.route.HomeTitle}</h1>
        <p>{props.route.HomeText}</p>
      </div>
    );
};
export default Home;
