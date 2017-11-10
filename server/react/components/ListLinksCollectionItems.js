import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as gumUtils from '../../utilities/gumUtils';

export default class ListLinksCollectionItems extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataContent: {
                collectionData: []
            }
        };

        // if (this.props && /* this.props.collectionData && Array.isArray(this.props.collectionData) && this.props.collectionData.length === 0 && */
        //     this.props.getCollectionData && typeof this.props.getCollectionData === 'function') {
        //     // callback to get data from parent
        //     this.props.getCollectionData((data) => {
        //         this.setState({
        //             dataContent: {
        //                 origninalCollectionData: data.map(obj => Object.assign({}, obj)),
        //                 collectionData: data,
        //                 currentCollection: this.props.currentCollection,
        //                 currentSubCollection: this.props.currentSubCollection
        //             }
        //         });
        //     });
        // }

        this.changeItemsView = this.changeItemsView.bind(this);
    }

    changeItemsView(viewState) {
        let dataContent = this.state.dataContent;
        switch (viewState) {
            case 'ORG':
                dataContent.currentSubCollection = this.props.currentCollection + ' - Original';
                console.log('ListLinksCollectionItems: dataContent.collectionData', dataContent.collectionData);
                break;
            case 'CLLPS':
                dataContent.currentSubCollection = this.props.currentCollection + ' - Collapsed';
                dataContent.collectionData = gumUtils.collapse(dataContent.collectionData);
                // dataContent.collectionData[0].items = '1,2,3';
                break;
            case 'EXPND':
                dataContent.currentSubCollection = this.props.currentCollection + ' - Expanded';
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
                ListLinksCollectionItems: {this.props.opt}
                {/* <OptionView d={this.state.dataContent} changeItemsViewCallback={this.changeItemsView} /> */}
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
                                        {/*collectionItem.items*/}
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
