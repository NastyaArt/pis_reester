import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './DropUp.css';

class DropUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: props.selectedOption,
            open: false
        };
        this.setDropUpElement = this.setDropUpElement.bind(this);
        this.renderOption = this.renderOption.bind(this);
        this.toggleOpen = this.toggleOpen.bind(this);
        this.close = this.close.bind(this);
    }

    setDropUpElement(dropUpElement) {
        this.dropUpElement = dropUpElement;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            selectedOption: nextProps.selectedOption
        });
    }

    render() {
        let icon = this.state.open ? 'expand_more' : 'expand_less';
        return (
            <div className="drop-up" tabIndex="-1" onBlur={this.close} ref={this.setDropUpElement}>
                <div className="selected-option" onClick={this.toggleOpen}>
                    <span>{this.state.selectedOption}</span>
                    <span className="material-icons">{icon}</span>
                </div>
                {this.renderOptions()}
            </div>
        );
    }

    renderOptions() {
        if (!this.state.open) {
            return null;
        }
        return (
            <ul className="options">
                {this.props.options.map(this.renderOption)}
            </ul>
        );
    }

    renderOption(option) {
        return (
            <li key={option}
                className={option === this.state.selectedOption ? 'selected' : ''}
                onClick={() => this.selectOption(option)}>{option}</li>
        );
    }

    componentDidUpdate() {
        if (!this.state.open) {
            this.dropUpElement.blur();
        }
    }

    toggleOpen() {
        this.setState({open: !this.state.open});
    }

    close() {
        if (this.state.open) {
            this.setState({open: false});
        }
    }

    selectOption(option) {
        this.setState({
            open: false
        });
        this.props.onSelect(option);
    }
}

DropUp.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedOption: PropTypes.string,
    onSelect: PropTypes.func.isRequired
};

export default DropUp;