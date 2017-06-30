import React from 'react';

class NotFound extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        fetch('backendRequest')
          .then(function(response) {
              if (response.status >= 400) {
                  throw new Error('Bad response from server');
              }
              return response.json();
          })
          .then((resData) => {
              return this.setState({data: resData});
          });
    };

    render() {
        return (
          <div>Data from backend: {this.state.data.a} </div>
        );
    }
}

export default NotFound;
