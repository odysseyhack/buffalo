import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ControlPanel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: ''
        };

        this.onSearchTitleChanged = this.onSearchTitleChanged.bind(this);
    }

    onSearchTitleChanged(event) {
        const name = event.target.value;
        this.setState({name});
    }

    render () {
        return (
            <div>
                <div className="input-group input-group-lg">
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="button" onClick={this.props.openAddNoteModal}>
                            <i className="fa fa-plus"></i>
                        </button>
                    </span>

                </div>
            </div>
        );
    }
}

ControlPanel.propTypes = {
    openAddNoteModal: PropTypes.func,
    onFindNotes: PropTypes.func
};

export default ControlPanel;
