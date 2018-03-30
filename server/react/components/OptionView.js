import React from 'react';
import PropTypes from 'prop-types';
import { formatLabel } from '../utils'

// ---------- FIELDSET ---------------------------------------------
export default class OptionView extends React.Component {
    constructor(props) {
        // console.log('props', props);
        super(props);
        this.state = {
            selectedOption: props.items[0].id || 'ONE',
            items: props.items || [{ id: 'ONE', value: 'one' }, { id: 'TWO', value: 'two' }, { id: 'THREE', value: 'three' }]
        };
        this.handleChange = this.handleChange.bind(this);
    }

    // npm install --save-dev babel-preset-stage-1
    // handleChange = (e) => {
    //     const { name, value } = e.target;
    //     this.setState({
    //         [name]: value
    //     });
    // }

    handleChange(e) {
        if (e.target.type === 'radio') {
            // const { id, value } = e.target;
            this.setState({
                selectedOption: e.target.id
            });

            if (this.props.selectedOption) {
                this.props.selectedOption(e.target.id);
            }
        }
    }

    // componentDidMount() {
    //     if (this.props.selectedOption) {
    //         this.props.selectedOption(this.state.selectedOption);
    //     }
    // }

    render() {
        return (
            <div className="radio-group container">
                <div className="panel panel-primary">
                    <div className="panel-body">
                        <h4 className="text-on-panel text-primary"><strong className="text-uppercase">Choice:</strong></h4>
                        {this.state.items.map((i) => {
                            return <div key={i.id}>
                                <input type='radio' name='choice' id={i.id} value={i.value} checked={this.state.selectedOption === i.id} onChange={this.handleChange} />
                                <label htmlFor={i.id}>{formatLabel(i.value)}</label>
                            </div>;
                        })}
                        {/* <input type='checkbox' name='ccc' id='iid' value={false} onChange={this.handleChange} />
                        <label htmlFor='iid'>Missing</label> */}
                    </div>
                </div>
            </div>
        );
    }
}

OptionView.propTypes = {
    selectedOption: PropTypes.func,
    items: PropTypes.array
};
