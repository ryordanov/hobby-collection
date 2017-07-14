import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as gumUtils from '../../utilities/gumUtils';

// ---------- FIELDSET -----------------------------------------------------------------------
class OptionView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    // npm install --save-dev babel-preset-stage-1
    // handleChange = (e) => {
    //     const { name, value } = e.target;
    //     this.setState({
    //         [name]: value
    //     });
    // }

    handleChange(e) {
        const { id, value } = e.target;
        this.setState({
            selectedOption: e.target.value
        });

        if (this.props.changeItemsViewCallback) {
            this.props.changeItemsViewCallback(value);
        }
    }

    render() {
        return (
            <form>
                <fieldset className='radio-buttons'>
                    <legend>Choice:</legend>
                    <input type='radio' name='choice' id='original' value='ORG' checked={this.state.selectedOption === 'ORG'} onChange={this.handleChange} />
                    <label htmlFor='original'>Original</label>

                    <input type='radio' name='choice' id='collapse' value='CLLPS' checked={this.state.selectedOption === 'CLLPS'} onChange={this.handleChange} />
                    <label htmlFor='collapse'>Collapse</label>

                    <input type='radio' name='choice' id='expand' value='EXPND' checked={this.state.selectedOption === 'EXPND'} onChange={this.handleChange} />
                    <label htmlFor='expand'>Expand</label>

                </fieldset>
            </form>
        );
    }
};

OptionView.propTypes = {
    changeItemsViewCallback: PropTypes.func
};

// ---------- MAIN CLASS -----------------------------------------------------------------------

export default class ListLinksCollectionItems extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataContent: {
                collectionData: []
            }
        };

        if (this.props && /* this.props.collectionData && Array.isArray(this.props.collectionData) && this.props.collectionData.length === 0 && */
            this.props.getCollectionData && typeof this.props.getCollectionData === 'function') {
            // callback to get data from parent
            this.props.getCollectionData((data) => {
                this.setState({
                    dataContent: {
                        collectionData: data,
                        currentCollection: this.props.currentCollection,
                        currentSubCollection: this.props.currentSubCollection
                    }
                });
            });
        }

        this.changeItemsView = this.changeItemsView.bind(this);
    }

    changeItemsView(viewState) {
        let dataContent = this.state.dataContent;
        switch (viewState) {
            case 'ORG':
                dataContent.currentSubCollection = dataContent.currentSubCollection + ' - Original';
                // dataContent = dataContent;
                break;
            case 'CLLPS':
                dataContent.currentSubCollection = dataContent.currentSubCollection + ' - Collapsed';
                dataContent.collectionData = gumUtils.collapse(dataContent.collectionData);
                break;
            case 'EXPND':
                dataContent.currentSubCollection = dataContent.currentSubCollection + ' - Expanded';
                dataContent.collectionData = gumUtils.expand(dataContent.collectionData);
                break;
            default:
                break;
        }

        this.setState({
            dataContent: dataContent
        });
    }

    render() {
        return (
            <div>
                <OptionView d={this.state.dataContent} changeItemsViewCallback={this.changeItemsView} />
                {
                    this.state.dataContent.currentCollection && !this.state.dataContent.currentSubCollection &&
                    <h5>Details of '{this.state.dataContent.currentCollection}': </h5>
                }
                {
                    this.state.dataContent.currentCollection && this.state.dataContent.currentSubCollection &&
                    <h5>Details of '{this.state.dataContent.currentCollection} / {decodeURIComponent(this.state.dataContent.currentSubCollection)}': </h5>
                }
                {
                    !(this.state.dataContent.currentCollection || this.state.dataContent.currentSubCollection) &&
                    <h5>Details of the currentCollection </h5>
                }

                <div className='path-to-item'>
                    {
                        this.state.dataContent.collectionData.map((collectionItem, index) => (
                            <div className='nl' key={index}>
                                <Link className='collection-link' to={`/collection/${encodeURIComponent(collectionItem.make)}`}>{collectionItem.make}</Link>
                                <span className='delimiter'>/</span>
                                <Link className='subcollection-link' to={`/collection/${encodeURIComponent(collectionItem.make)}/${encodeURIComponent(collectionItem.serie)}`}>{collectionItem.serie}</Link>
                                <div className='input-wrapper'>
                                    <div className='display-in-cell'>
                                        {collectionItem.items}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {/* <Link to='/collections'>Collections</Link> */}
            </div>
        );
    }
};

ListLinksCollectionItems.propTypes = {
    collectionData: PropTypes.array,
    getCollectionData: PropTypes.func,
    currentCollection: PropTypes.string,
    currentSubCollection: PropTypes.string
};
