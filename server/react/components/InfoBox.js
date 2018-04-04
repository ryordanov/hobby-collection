import React from 'react';
import PropTypes from 'prop-types';
import { formatLabel } from '../utils'

const InfoBox = (props) => {
    return (
        <div className="container radio-group">
            <div className="panel panel-primary">
                <div className="panel-body">
                    <h4 className="text-on-panel text-primary"><strong className="text-uppercase">Statistic</strong></h4>
                    {/* <div className='info-box-content'> */}
                        <div className='info-box-row'>
                            <div className='info-box-col'>
                                {props.showMissing ? 'All items:' : 'Missing items:'}
                            </div>
                            <div className='info-box-col nums'>
                                {props.statisticInfo && props.statisticInfo.allItems}
                            </div>
                        </div>
                        {props.showMissing && <div className='info-box-row'>
                            <div className='info-box-col'>
                                Unique:
                            </div>
                            <div className='info-box-col nums'>
                            {props.statisticInfo && props.statisticInfo.unique}
                            </div>
                        </div>}
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
}

InfoBox.propTypes = {
    selectedOption: PropTypes.func,
    radioItems: PropTypes.array,
    checkItems: PropTypes.array
};

InfoBox.defaultProps = {
    radioItems: [], //[{ id: 'r1', value: 'one', checked: true }, { id: 'r2', value: 'two', checked: false }, { id: 'r3', value: 'three', checked: false }],
    checkItems: [] // [{ id: 'c1', name: 'uno', value: 'one', checked: true }, { id: 'c2', name: 'dos', value: 'two', checked: false }]
}

export default InfoBox;
