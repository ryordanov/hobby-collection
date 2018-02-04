import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ListLinksCollectionItems = (props) => (
    <div>
        {/* {JSON.stringify(props.collectionRecords)} */}
        {console.log(props.collectionRecords)}

        ListLinksCollectionItems: {props.opt}
        {
            props.collectionRecords.currentCollection && !props.collectionRecords.currentSubCollection &&
            <h5>Details of '{props.collectionRecords.currentCollection}': </h5>
        }
        {
            props.collectionRecords.currentCollection && props.collectionRecords.currentSubCollection &&
            <h5>Details of '{props.collectionRecords.currentCollection} / {decodeURIComponent(props.collectionRecords.currentSubCollection)}': </h5>
        }
        {
            !(props.collectionRecords.currentCollection || props.collectionRecords.currentSubCollection) &&
            <h5>Details of currentCollection </h5>
        }

        <div className='path-to-item'>
            {
                props.collectionRecords && 
                props.collectionRecords.map((element, index) => (
                    <div className='nl' key={index}>
                        <Link className='collection-link' to={`/collection/${encodeURIComponent(element.make)}`}>{element.make}</Link>
                        <span className='delimiter'>/</span>
                        <Link className='subcollection-link' to={`/collection/${encodeURIComponent(element.make)}/${encodeURIComponent(element.serie)}`}>{element.serie}</Link>
                        <div className='input-wrapper'>
                            <div className='display-in-cell'>
                                {/* element.items */}
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
        {/* <Link to='/collections'>Collections</Link> */}
    </div>
);

ListLinksCollectionItems.propTypes = {
    collectionData: PropTypes.array,
    getCollectionData: PropTypes.func,
    currentCollection: PropTypes.string,
    currentSubCollection: PropTypes.string
};

export default ListLinksCollectionItems;
