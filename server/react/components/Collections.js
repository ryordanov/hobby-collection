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
            selectedOption: itemsSeed[0].value
        };

        this.selectOption = this.selectOption.bind(this);
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

    selectOption(rbData) {
        this.setState({ selectedOption: rbData });
        getCollectionData(url + rbData);
    }

    render() {
        return (
            <div>
                <OptionView
                    selectedOption={this.selectOption}
                    items={itemsSeed} />
                <ListLinksCollectionItems
                    collectionRecords={this.state.dataFromBackend}
                    opt={this.state.selectedOption} />
            </div>
        );
    }
}

