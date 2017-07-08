// import React from 'react';
// import { Link } from 'react-router-dom';

// class ListItems extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             data: []
//         };
//     }

//     componentDidMount() {
//         // fetch('data_' + Math.floor(Math.random() * 11) + '.json')
//         fetch('items')
//             .then(function (response) {
//                 if (response.status >= 400) {
//                     throw new Error('Bad response from server');
//                 }
//                 return typeof response === 'object' ? response.json() : response;
//             })
//             .then((resData) => {
//                 // console.log('resData', resData);
                
//                 this.setState({ data: resData });
//             });
//     };

//     render() {
//         return (
//             <div>
//                 <div>listItems: {this.state.data.b} </div>
//                 <Link to='/items/24'>Item details: 24</Link>
//                 <br />
//                 <Link to='/'>Back</Link>
//             </div>
//         );
//     }
// }

// export default ListItems;
