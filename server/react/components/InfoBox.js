import React from 'react';
import PropTypes from 'prop-types';

const InfoBox = (props) => {
    if (!props.statisticInfo) {
        return null;
    }
    return (
        <div className="container radio-group">
            <div className="panel panel-primary">
                <div className="panel-body">
                    <h4 className="text-on-panel text-primary"><strong className="text-uppercase">Statistic</strong></h4>
                    {/* <div className='info-box-content'> */}
                    <div className='info-box-row'>
                        <div className='info-box-col'>
                            {props.showMissing ? 'All Items:' : 'Missing Items:'}
                        </div>
                        <div className='info-box-col nums'>
                            {props.statisticInfo.allItems}
                        </div>
                    </div>
                    {props.showMissing && <div className='info-box-row'>
                        <div className='info-box-col'>
                            Unique:
                        </div>
                        <div className='info-box-col nums'>
                            {props.statisticInfo.unique}
                        </div>
                    </div>}
                    <div className='info-box-row'>
                        <div className='info-box-col'>
                            {props.showMissing ? 'All Collections:' : 'Incomplete collections:'}
                        </div>
                        <div className='info-box-col nums'>
                            {props.statisticInfo.collectionsCount}
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
};

InfoBox.propTypes = {
    selectedOption: PropTypes.func,
    radioItems: PropTypes.array,
    checkItems: PropTypes.array,
    showMissing: PropTypes.bool,
    statisticInfo: PropTypes.object
};

InfoBox.defaultProps = {
    radioItems: [], //[{ id: 'r1', value: 'one', checked: true }, { id: 'r2', value: 'two', checked: false }, { id: 'r3', value: 'three', checked: false }],
    checkItems: [], // [{ id: 'c1', name: 'uno', value: 'one', checked: true }, { id: 'c2', name: 'dos', value: 'two', checked: false }]
    showMissing: false,
    statisticInfo: {}
};

export default InfoBox;
