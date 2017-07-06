import React from 'react';
import { Link } from 'react-router-dom';

export default function LinksCollection (dataContainer) {
    console.log('dataContainer', dataContainer);
    
    return  (
    <div>
        {
            dataContainer.collection && !dataContainer.subcollectionname &&
            <h5>Details of '{dataContainer.collection}': </h5>
        }
        {
            dataContainer.collection && dataContainer.subcollectionname &&
            <h5>Details of '{dataContainer.collection} / {decodeURIComponent(dataContainer.subcollectionname)}': </h5>
        }
        {
            !(dataContainer.collection || dataContainer.subcollectionname) &&
            <h5>Details of the collection </h5>
        }

        <div className='path-to-item'>
            {
                dataContainer.data.map((collectionItem, index) => (
                    <div className="nl" key={index}>
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
        {/*<Link to='/collections'>Collections</Link>*/}
    </div>
)};