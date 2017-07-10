import React from 'react';
import { Link } from 'react-router-dom';


class OptionView extends React.Component {    
    constructor(props){
       super(props);
       this.state = {};
    }     

    handleChange(e)  {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <form>
                <fieldset className="radio-buttons">
                    <legend>Choice:</legend>
                    <input type="radio" name="choice" id="original" value="edno" onChange={this.handleChange.bind(this)} />
                    <label htmlFor ="original">Original</label>                            
                    
                    <input type="radio" name="choice" id="unique" value="dve" onChange={this.handleChange.bind(this)} />
                    <label htmlFor ="unique">Unique</label>
                    
                    <input type="radio" name="choice" id="edit" value="tri" onChange={this.handleChange.bind(this)} />
                    <label htmlFor ="edit">Edit</label>
                    
                </fieldset>
            </form>
        );
    }
}

export default function LinksCollection(dataContainer) {
    // console.log('dataContainer', dataContainer);

    return (
        <div>
            <OptionView />
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
    )
};