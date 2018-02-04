import React from 'react';
// import { Link } from 'react-router-dom';
import OptionView from './OptionView';
import ListLinksCollectionItems from './ListLinksCollectionItems';

import { getCollectionData } from '../utils';

let itemsSeed = [
    { id: 'original', value: 'ORG' },
    { id: 'collapse', value: 'CLLPS' },
    { id: 'expand', value: 'EXPND' }
];

let url = '/api/collections?option=';

// some kind of View-Controller
export default class Collections extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataFromBackend: [],
            selectedRB: ''
        };

        this.selectingOption = this.selectingOption.bind(this);
    }

    componentDidMount() {
        console.log('collections', this.props.match);
        getCollectionData(url + itemsSeed[0].value)
            .then((resData) => {
                this.setState({ dataFromBackend: resData });
                // console.log('resData', resData);
                return resData;
            });
    }

    // getCollectionData(rbData) {
    //     // rbData = rbData || 'ORG';
    //     // fetch('/api/collections?option=' + rbData, {credentials: 'same-origin'}) // in order to send cookies too
    //     //     .then(function(response) {
    //     //         if (response.status >= 400) {
    //     //             throw new Error('Bad response from server');
    //     //         }
    //     //         return response.json();
    //     //     })
    //     // console.log('rbData', rbData);
    //     fetch(`/api/collections?option=` + rbData, {
    //         credentials: 'same-origin', // send cookies too
    //         method: 'GET',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json'
    //         }
    //         // body: JSON.stringify({
    //         //     option: rbData || 'ORG' // TODO: remove default argument
    //         // })
    //     })
    //         .then(function (response) {
    //             if (response.status >= 400) {
    //                 throw new Error('Bad response from server');
    //             }
    //             return response.json();
    //         })
    //         .then((resData) => {
    //             this.setState({ dataFromBackend: resData });
    //             // console.log('resData', resData);

    //             return resData;
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }

    selectingOption(rbData) {
        this.setState({ selectedRB: rbData });
        getCollectionData(url + rbData);
    }

    render() {
        return (
            <div>
                <OptionView
                    selectedRB={this.selectingOption}
                    items={itemsSeed} />
                <ListLinksCollectionItems
                    collectionRecords={this.state.dataFromBackend}
                    opt={this.state.selectedRB} />
            </div>
        );
    }
}

