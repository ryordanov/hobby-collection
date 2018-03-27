import React from 'react';
import { Link /*, withRouter */ } from 'react-router-dom';
import PropTypes from 'prop-types';

import { buildUrl, postRequestToAPI } from '../utils';


// import { Grid, Row, Col } from 'react-bootstrap';

// const Button = withRouter(({ history }) => (
//     <button type='button' onClick={() => { history.push('/new-location') }}>Search missing!</button>
// ))

const ViewCollections = (props) => {
    function handleClick(e, make, serie, oid) {
        e.preventDefault();
        // console.log(e.target.attributes[0].value);
        let dialog = confirm('Are you sure you want to delete "' + make + '/' + serie + '"');
        if (dialog == true) {
            return postRequestToAPI(buildUrl('/api/delete', [oid]), { make, serie, oid })
                .then(data => {
                    if (props.reloadAfterDelete) {
                        props.reloadAfterDelete();
                    }
                });
        }
    }

    return (
        <div>
            {/* ViewCollections: {props.opt} */}
            {
                props.currentCollection && !props.currentSubCollection &&
                <div className='clearafter'>
                    <h5 className='float-left'>Details of `<Link to='/collections'>/ </Link>{props.currentCollection}`: </h5>
                    <Link to={buildUrl('/add', [props.currentCollection, props.currentSubCollection])} className='btn btn-primary btn pull-right'>Add</Link>
                </div>
            }
            {
                props.currentCollection && props.currentSubCollection &&
                <div className='clearafter'>
                    <h5 className='float-left'>Details of `<Link to='/collections'>/ </Link>{props.currentCollection} / {decodeURIComponent(props.currentSubCollection)}`: </h5>
                    <Link to={buildUrl('/edit', [props.currentCollection, props.currentSubCollection], { option: props.opt })} className='btn btn-primary btn pull-right'>Edit</Link>
                </div>
            }
            {
                !(props.currentCollection || props.currentSubCollection) &&
                <div className='clearafter'>
                    <h5 className='float-left'>Details<Link to='/collections'> / </Link></h5>
                    <Link to={buildUrl('/add', [props.currentCollection, props.currentSubCollection])} className='btn btn-primary btn pull-right'>Add</Link>
                </div>
            }
            {/* <Link to={buildUrl('/add', [props.currentCollection, props.currentSubCollection])} className='btn btn-primary btn pull-right'>Add</Link> */}
            <div className='cont'>
                <div className="r head">
                    <div className="c">Category</div>
                    <div className="c">Subcategory</div>
                    <div className="c">Items</div>
                    <div className="c icon">Action</div>
                </div>
                {/* <div className="container TableStyle"> */}
                {
                    props.collectionRecords &&
                    props.collectionRecords.map((element, index) => (
                        <div className="r" key={index}>
                            <div className="c"><Link className='collection-link' to={buildUrl('/collections', [element.make])}>{element.make}</Link></div>
                            <div className="c"><Link className='subcollection-link' to={buildUrl('/collections', [element.make, element.serie])}>{element.serie}</Link></div>
                            <div className="c"><Link to={buildUrl('/edit', [element.make, element.serie], { option: props.opt })}>
                                <div className='display-in-cell'>
                                    {element.items}
                                </div>
                            </Link></div>
                            <div className="c icon"><Link to={buildUrl('/delete', [element.id])} onClick={(e) => handleClick(e, element.make, element.serie, element.oid)}><span className="glyphicon glyphicon-trash"></span></Link></div>
                        </div>
                    ))
                }
                {/* </div> */}
            </div>
        </div>
    );
};

ViewCollections.propTypes = {
    opt: PropTypes.string,
    collectionRecords: PropTypes.array,
    currentCollection: PropTypes.string,
    currentSubCollection: PropTypes.string,
    reloadAfterDelete: PropTypes.func
};

ViewCollections.defaultProps = {
    opt: '',
    collectionRecords: [],
    currentCollection: '',
    currentSubCollection: '',
    reloadAfterDelete: () => {}
};

export default ViewCollections;
