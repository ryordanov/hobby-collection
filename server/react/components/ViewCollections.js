import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

// const Button = withRouter(({ history }) => (
//     <button type='button' onClick={() => { history.push('/new-location') }}>Search missing!</button>
// ))


const ViewCollections = (props) => (
    <div>
        {/* ViewCollections: {props.opt} */}
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
        {/* <Button /> */}
        <div className='container table'>
            {
                // <div className="container TableStyle">
                props.collectionRecords &&
                props.collectionRecords.map((element, index) => (
                        <div className="row" key={index}>
                            <div className="cell col-xs-1"><Link className='collection-link' to={`/collections/${encodeURIComponent(element.make)}`}>{element.make}</Link></div>
                            <div className="cell col-xs-2"><Link className='subcollection-link' to={`/collections/${encodeURIComponent(element.make)}/${encodeURIComponent(element.serie)}`}>{element.serie}</Link></div>
                            <div className="cell col-xs-9"><Link to={`/edit/${encodeURIComponent(element.make)}/${encodeURIComponent(element.serie)}/${props.opt}`}>
                                <div className='display-in-cell'>
                                    {element.items}
                                </div>
                            </Link></div>
                        </div>
                    // </div>
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
