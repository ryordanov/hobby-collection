import React from 'react';
// import { Link } from 'react-router-dom';
import OptionView from './OptionView';
import ListLinksCollectionItems from './ListLinksCollectionItems';

let itemsSeed = [{id: 'original', value: 'ORG'},{id: 'collapse', value: 'CLLPS'}, {id: 'expand', value: 'EXPND'}];

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
        this.getCollectionData();
    }

    getCollectionData(rbData, callback) {
        rbData = rbData || 'ORG';
        fetch('/api/collections?' + rbData, {credentials: 'same-origin'}) // in order to send cookies too
            .then(function(response) {
                if (response.status >= 400) {
                    throw new Error('Bad response from server');
                }
                return response.json();
            })
            .then((resData) => {
                this.setState({ dataFromBackend: resData });
                // if (callback) {
                //     return callback(resData);
                // }
                return resData;
            });
    }

    selectingOption(rbData) {
        // console.log('Collections: rbData', rbData);
        this.setState({selectedRB: rbData});
        this.getCollectionData(rbData);
    }
    
    render() {
        return (
            <div>
                 {/* JSON.stringify(this.state.dataFromBackend)*/}   
                {/* collectionData={this.state.dataFromBackend}  */}
                <OptionView selectedRB={this.selectingOption} items={itemsSeed}/>
                <ListLinksCollectionItems dataContent={this.state.dataFromBackend} opt={this.state.selectedRB} /> 
            </div>
        );
    }
}

