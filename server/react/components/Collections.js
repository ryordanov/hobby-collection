import React from 'react';
import PropTypes from 'prop-types';
import OptionView from '../components/OptionView';
import ViewCollections from '../components/ViewCollections';
import InfoBox from '../components/InfoBox';

import { getRequestToAPI, buildUrl } from '../utils';

// some kind of View-Controller
export default class Collections extends React.Component {
    constructor(props) {
        super(props);

        const radioItemsSeed = [
            { id: 'squished', value: 'print view', checked: true },
            { id: 'numbers', value: 'numbers only', checked: false }
        ];

        const checkItemsSeed = [ // or object with key = id and nested properties...
            { id: 'missing', name: 'missing only', value: true, checked: false }
        ];


        this.state = {
            // url: '',
            dataFromBackend: [],
            // selectedOption: radioItemsSeed[0].id,
            radioItems: radioItemsSeed,
            checkItems: checkItemsSeed,
            statistic: {
                allItems: 0,
                unique: 0,
                allCount: 0
            }
        };
        this.selectOption = this.selectOption.bind(this);
        this.reloadAfterDelete = this.reloadAfterDelete.bind(this);
        this.getChosenRadioOption = this.getChosenRadioOption.bind(this);
    }

    componentDidMount() {
        this.loadNewData(this.props.match.params.collectionPath);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.loadNewData(nextProps.match.params.collectionPath);
        }
    }

    selectOption(inputType, inputId) {
        const actionOption = { radio: 'radioItems', checkbox: 'checkItems' }[inputType];

        this.setState((prevState) => {
            let tmpArray = prevState[actionOption];
            if (inputType === 'radio') {
                for (let i = 0; i < tmpArray.length; i++) {
                    tmpArray[i].checked = tmpArray[i].id === inputId;
                }
            } else {
                for (let i = 0; i < tmpArray.length; i++) {
                    if (tmpArray[i].id === inputId) {
                        tmpArray[i].checked = !tmpArray[i].checked;
                    }
                }
            }
            return { [actionOption]: tmpArray };
        }, () => this.loadNewData(this.props.match.params.collectionPath));
    }

    reloadAfterDelete() {
        this.loadNewData(this.props.match.params.collectionPath);
    }

    loadNewData(collectionPath) {
        const collectionPathArr = (collectionPath ? collectionPath.split('/') : []);
        const selectedRadioButton = this.state.radioItems.filter(e => e.checked);
        let additionalOptions = {};

        if (selectedRadioButton && selectedRadioButton[0] && selectedRadioButton[0].id) {
            additionalOptions[selectedRadioButton[0].id] = true;
        }

        this.state.checkItems.forEach(element => {
            if (element.checked) {
                additionalOptions[element.id] = element.value;
            }
        });

        return getRequestToAPI(buildUrl('/api/collections', collectionPathArr, additionalOptions), this.props.history)
            .then((resData) => {
                if (resData) {
                    this.setState({ /* url, selectedOption, */ dataFromBackend: resData.collection, statistic: resData.statistic });
                }
            });
    }
    getChosenRadioOption(radioItems) {
        let opt = radioItems.filter(el => el.checked);
        return (opt.length && opt[0] && opt[0]['id']) ? opt[0]['id'] : '';
    }

    render() {
        return (
            <div>
                <div className='flex-row'>
                    <OptionView
                        selectedOption={this.selectOption}
                        radioItems={this.state.radioItems}
                        checkItems={this.state.checkItems} />
                    <InfoBox statisticInfo={this.state.statistic} showMissing={!this.state.checkItems.filter(e=> e.id ==='missing' && e.checked).length} />
                </div>
                <ViewCollections
                    opt={this.getChosenRadioOption(this.state.radioItems)}
                    collectionRecords={this.state.dataFromBackend}
                    collectionPath={this.props.match.params.collectionPath}
                    reloadAfterDelete={this.reloadAfterDelete} />
            </div>
        );
    }
}

Collections.propTypes = {
    match: PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object
};
Collections.defaultProps = {
    match: {
        params: {
            collectionName: '',
            subCollectionName: ''
        }
    }
};
