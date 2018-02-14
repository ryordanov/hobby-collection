import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ViewCollections = (props) => (
    <div>
        ViewCollections: {props.opt}
        {
            props.currentCollection && !props.currentSubCollection &&
            <h5>Details of `{props.currentCollection}`: </h5>
        }
        {
            props.currentCollection && props.currentSubCollection &&
            <h5>Details of `{props.currentCollection} / {decodeURIComponent(props.currentSubCollection)}`: </h5>
        }
        {
            !(props.currentCollection || props.currentSubCollection) &&
            <h5>Details</h5>
        }
        <div className='path-to-item'>
            {
                props.collectionRecords &&
                props.collectionRecords.map((element, index) => (
                    <div className='nl' key={index}>
                        <Link className='collection-link' to={`/collections/${encodeURIComponent(element.make)}`}>{element.make}</Link>
                        <span className='delimiter'>/</span>
                        <Link className='subcollection-link' to={`/collections/${encodeURIComponent(element.make)}/${encodeURIComponent(element.serie)}`}>{element.serie}</Link>
                        <div className='input-wrapper'>
                            <Link to={`/edit/${encodeURIComponent(element.make)}/${encodeURIComponent(element.serie)}/${props.opt}`}>
                                <div className='display-in-cell'>
                                    {element.items}
                                </div>
                            </Link>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
);

ViewCollections.propTypes = {
    opt: PropTypes.string,
    collectionRecords: PropTypes.array,
    currentCollection: PropTypes.string,
    currentSubCollection: PropTypes.string
};

export default ViewCollections;
