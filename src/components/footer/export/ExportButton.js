import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ExportButton extends Component {
    render() {
        return (
            <a href={this.props.uri}>
                <span className="material-icons">file_download</span>Export
            </a>
        );
    }
}

ExportButton.propTypes = {
    uri: PropTypes.string.isRequired
};

export default ExportButton;