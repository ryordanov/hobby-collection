import React from 'react';
import PropTypes from 'prop-types';

// ---------- FIELDSET -----------------------------------------------------------------------
export default class OptionView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: 'ORG'
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
        const { id, value } = e.target;
        this.setState({
            selectedOption: e.target.value
        });

        if (this.props.selectedView) {
            this.props.selectedView(value);
        }
    }

    render() {
        return (
            <form>
                <fieldset className='radio-buttons'>
                    <legend>Choice:</legend>
                    <input type='radio' name='choice' id='original' value='ORG' checked={this.state.selectedOption === 'ORG'} onChange={this.handleChange} />
                    <label htmlFor='original'>Original</label>

                    <input type='radio' name='choice' id='collapse' value='CLLPS' checked={this.state.selectedOption === 'CLLPS'} onChange={this.handleChange} />
                    <label htmlFor='collapse'>Collapse</label>

                    <input type='radio' name='choice' id='expand' value='EXPND' checked={this.state.selectedOption === 'EXPND'} onChange={this.handleChange} />
                    <label htmlFor='expand'>Expand</label>

                </fieldset>
            </form>
        );
    }
};

OptionView.propTypes = {
    selectedView: PropTypes.func
};
