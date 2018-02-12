import React from 'react';
import PropTypes from 'prop-types';

// ---------- FIELDSET ---------------------------------------------
export default class OptionView extends React.Component {
    constructor(props) {
        // console.log('props', props);
        super(props);
        this.state = {
            selectedOption: props.items[0].value || 'ONE',
            items: props.items || [{ id: 'one', value: 'ONE' }, { id: 'two', value: 'TWO' }, { id: 'three', value: 'THREE' }]
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
        // const { id, value } = e.target;
        this.setState({
            selectedOption: e.target.value
        });

        if (this.props.selectedOption) {
            this.props.selectedOption(e.target.value);
        }
    }

    // componentDidMount() {
    //     if (this.props.selectedOption) {
    //         this.props.selectedOption(this.state.selectedOption);
    //     }
    // }

    render() {
        return (
            <form>
                <fieldset className='radio-buttons'>
                    <legend>Choice:</legend>
                    {this.state.items.map((i) => {
                        return <div key={i.id}>
                            <input type='radio' name='choice' id={i.id} value={i.value} checked={this.state.selectedOption === i.value} onChange={this.handleChange} />
                            <label htmlFor={i.id}>{i.id.charAt(0).toUpperCase() + i.id.slice(1)}</label>
                        </div>;
                    })}
                </fieldset>
            </form>
        );
    }
};

OptionView.propTypes = {
    selectedOption: PropTypes.func,
    items: PropTypes.array
};