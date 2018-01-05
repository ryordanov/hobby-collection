import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class ListLinksCollectionItems extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataContent: {
                collectionData: []
            }
        };
    }

    render() {
        return (
            <div>
                {JSON.stringify(this.state.dataContent)}

                ListLinksCollectionItems: {this.props.opt}
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
                                        {/* collectionItem.items */}
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
    currentSubCollection: PropTypes.string,
    opt: PropTypes.any
};
