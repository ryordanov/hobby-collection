import React from 'react';
import PropTypes from 'prop-types';
import { formatLabel } from '../utils'

const OptionView = (props) => {
    function handleChange(e) {
        props.selectedOption(e.target.type, e.target.id)
    }

    return (
        <div className="radio-group container">
            <div className="panel panel-primary">
                <div className="panel-body">
                    <h4 className="text-on-panel text-primary"><strong className="text-uppercase">Choice:</strong></h4>
                    {props.radioItems.map((i) => {
                        return <div key={i.id}>
                            <input type='radio' name='choice' id={i.id} value={i.value} onChange={handleChange} checked={i.checked ? 'checked' : ''} />
                            <label htmlFor={i.id}>{formatLabel(i.value)}</label>
                        </div>;
                    })}
                    {props.checkItems.map((i) => {
                        return <div key={i.id}>
                            <input type='checkbox' name={i.name} id={i.id} value={i.value} onChange={handleChange} checked={i.checked ? 'checked' : ''} />
                            <label htmlFor={i.id}>{formatLabel(i.name)}</label>
                        </div>;
                    })}
                </div>
            </div>
        </div>
    );
}

OptionView.propTypes = {
    selectedOption: PropTypes.func,
    radioItems: PropTypes.array,
    checkItems: PropTypes.array
};

OptionView.defaultProps = {
    radioItems: [], //[{ id: 'r1', value: 'one', checked: true }, { id: 'r2', value: 'two', checked: false }, { id: 'r3', value: 'three', checked: false }],
    checkItems: [] // [{ id: 'c1', name: 'uno', value: 'one', checked: true }, { id: 'c2', name: 'dos', value: 'two', checked: false }]
}

export default OptionView;
