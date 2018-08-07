/* eslint-disable no-alert, no-unused-vars */

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
        <div className="c items" onClick={(e) => history.push({ pathname: buildUrl('/edit', [element.id], { [props.opt]: true }), itemEditOid: element.oid, search: props.opt + '=true' })}>
            <div className='display-in-cell'>
                {element.items}
            </div>
        </div>
    ));

    function handleDelete(e, element) {
        let { path, oid } = element;
        e.preventDefault();
        // console.log(e.target.attributes[0].value);
        let dialog = confirm('Are you sure you want to delete this item [ ' + path.filter(el => el).join('/') + ' ]');

        if (dialog == true) {
            return postRequestToAPI(buildUrl('/api/delete', [oid]), { path, oid })
                .then(data => {
                    if (data && data.deletedOn && props.reloadAfterDelete) {
                        props.reloadAfterDelete();
                    } else {
                        console.log('ViewCollection (delete error)', data); // make, serie
                    }
                });
        }
    }

    function makePathTree(paths, delimiter = ' ➟ ') {
        if (!paths.length) return null;

        return (<span>
            {paths.map((p, i) => {
                return <span key={i}><Link to={buildUrl('/collections', paths.slice(0, i+1))}>{decodeURIComponent(p)}</Link>{(i < paths.length-1 ? delimiter : '')}</span>; // ➠ https://unicode-table.com/en/sets/arrows-symbols/
            })}
        </span>);
    }

    // function handleRedirect(e, history, element, props) {
    //     // history.push(url);
    //     history.push({pathname: buildUrl('/edit', [element.id], { [props.opt]: true }), itemEditOid: element.oid});
    // }

    const collectionPathArr = (props.collectionPath ? props.collectionPath.split('/') : []);

    return (
        <div>
            <div className='clearafter'>
                <h5 className='float-left'><Link to='/collections'>Collection</Link>{ collectionPathArr.length ? ' / ' : ''}
                    {
                        makePathTree(collectionPathArr, ' / ')
                        // collectionPathArr.length ?
                        //     collectionPathArr.map((el, index) =>
                        //         // <span key={index}> / <Link to={'/collections/' + encodeURIComponent(el)}>{decodeURIComponent(el)}</Link></span>
                        //         <span key={index}> / {decodeURIComponent(el)}</span>
                        //     ) : ''
                    }</h5>
                < Link to={buildUrl('/add', collectionPathArr, { [props.opt]: true })} className='btn btn-primary btn pull-right'>Add</Link>
            </div>
            <div className='cont'>
                <div className="r head">
                    <div className="c">Category</div>
                    {/* <div className="c">Subcategory</div> */}
                    <div className="c">Margins</div>
                    <div className="c">Items</div>
                    <div className="c icon">Action</div>
                </div>
                {
                    props.collectionRecords &&
                    props.collectionRecords.map((element, index) => (
                        <div className="r" key={index}>
                            <div className="c">{makePathTree(element.path)}</div>
                            {/* <div className="c"><Link to={buildUrl('/collections', [element.path[0], element.path[1] || ''])}>{element.path[1] || ''}</Link></div> */}
                            <div className="c">{element.margins}</div>
                            <ItemsDisplayRedirect element={element} />
                            <div className="c icon"><Link to={buildUrl('/delete', [element.id])} onClick={(e) => handleDelete(e, element)}><span className="glyphicon glyphicon-trash"></span></Link></div>
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
