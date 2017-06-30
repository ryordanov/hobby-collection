import React from 'react';

class ListItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        // fetch('data_' + Math.floor(Math.random() * 11) + '.json')
        fetch('listItems')
          .then(function(response) {
              if (response.status >= 400) {
                  throw new Error('Bad response from server');
              }
              return response.json();
          })
          .then((resData) => {
              this.setState({data: resData});
          });
    };

    render() {
        return (
          <div>listItems: {this.state.data.b} </div>
        );
    }
}

export default ListItems;
