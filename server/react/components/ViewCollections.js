/* eslint-disable no-alert */

import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { buildUrl, postRequestToAPI } from '../utils';

// import { Grid, Row, Col } from 'react-bootstrap';

// const Button = withRouter(({ history }) => (
//     <button type='button' onClick={() => { history.push('/new-location') }}>Search missing!</button>
// ))



const ViewCollections = (props) => {

    const ItemsDisplayRedirect = withRouter(({ history, element }) => (
        <div className="c items" onClick={(e) => handleRedirect(e, history, buildUrl('/edit', element.path, { [props.opt]: true }))}>
            <div className='display-in-cell'>
                {element.items}
            </div>
        </div>
    ));

    function handleDelete(e, make, serie, oid) {
        e.preventDefault();
        // console.log(e.target.attributes[0].value);
        let dialog = confirm('Are you sure you want to delete "' + make + '/' + serie + '"');
        if (dialog == true) {
            return postRequestToAPI(buildUrl('/api/delete', [oid]), { make, serie, oid })
                .then(data => {
                    if (data && data.deletedOn && props.reloadAfterDelete) {
                        props.reloadAfterDelete();
                    } else {
                        console.log('ViewCollection (delete error)', data); // make, serie
                    }
                });
        }
    }

    function handleRedirect(e, history, url) {
        history.push(url);
    }

    const collectionPathArr = (props.collectionPath ? props.collectionPath.split('/') : []);

    return (
        <div>
            <div className='clearafter'>
                <h5 className='float-left'><Link to='/collections'>Collection</Link>
                    {
                        collectionPathArr.length ?
                            collectionPathArr.map((el, index) =>
                                // <span key={index}> / <Link to={'/collections/' + encodeURIComponent(el)}>{decodeURIComponent(el)}</Link></span>
                                <span key={index}> / {decodeURIComponent(el)}</span>
                            ) : ''
                    }</h5>
                < Link to={buildUrl('/add', collectionPathArr, { [props.opt]: true })} className='btn btn-primary btn pull-right'>Add</Link>
            </div>
            <div className='cont'>
                <div className="r head">
                    <div className="c">Category</div>
                    <div className="c">Subcategory</div>
                    <div className="c">Margins</div>
                    <div className="c">Items</div>
                    <div className="c icon">Action</div>
                </div>
                {
                    props.collectionRecords &&
                    props.collectionRecords.map((element, index) => (
                        <div className="r" key={index}>
                            <div className="c"><Link className='collection-link' to={buildUrl('/collections', [element.path[0]])}>{element.path[0]}</Link></div>
                            <div className="c"><Link className='subcollection-link' to={buildUrl('/collections', [element.path[0], element.path[1] || ''])}>{element.path[1] || ''}</Link></div>
                            <div className="c">{element.margins}</div>
                            <ItemsDisplayRedirect element={element} />
                            <div className="c icon"><Link to={buildUrl('/delete', [element.id])} onClick={(e) => handleDelete(e, element.make, element.serie, element.oid)}><span className="glyphicon glyphicon-trash"></span></Link></div>
                        </div>
                    ))
                }
            </div>
        </div >
    );
};

ViewCollections.propTypes = {
    opt: PropTypes.string,
    collectionRecords: PropTypes.array,
    collectionPath: PropTypes.string,
    reloadAfterDelete: PropTypes.func
};

ViewCollections.defaultProps = {
    opt: '',
    collectionRecords: [],
    collectionPath: '',
    reloadAfterDelete: () => { }
};

export default ViewCollections;
