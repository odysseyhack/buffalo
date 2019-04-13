import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';


class AddNoteForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            seed: '',
            name: '',
            location: '',
            validationErrors: []
        };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onSeedChange = this.onSeedChange.bind(this);
        this.onContentChange = this.onContentChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onSeedChange(event) {
        const seed = event.target.value.trim();

        this.validateSeed(seed);

        this.setState({ seed: seed });
    }


    onTitleChange(event) {
        const name = event.target.value.trim();

        this.validateTitle(name);

        this.setState({ name: name });
    }


    onContentChange(event) {
        const location = event.target.value.trim();

        this.validateContent(location);

        this.setState({ location: location });
    }


    onSave(event) {
        event.preventDefault();

        if (this.state.validationErrors && this.state.validationErrors.length === 0) {
            const { name, location } = this.state;

            if (this.validateTitle(name) && this.validateContent(location)) {
                this.props.onSaveNote(this.state);
            }
        }
    }

    validateSeed(seed) {
        const message = 'Seed is required';

        if (seed === '') {
            this.addValidationError(message);
            return false;
        } else {
            this.removeValidationError(message);
            return true;
        }
    }


    validateTitle(name) {
        const message = 'Name is required';

        if (name === '') {
            this.addValidationError(message);
            return false;
        } else {
            this.removeValidationError(message);
            return true;
        }
    }


    validateContent(location) {
        const message = 'Location is required';

        if (location === '') {
            this.addValidationError(message);
            return false;
        } else {
            this.removeValidationError(message);
            return true;
        }
    }


    addValidationError(message) {
        this.setState((previousState) => {
            const validationErrors = [...previousState.validationErrors];
            validationErrors.push({message});
            return {
                validationErrors: validationErrors
            };
        });
    }


    removeValidationError(message) {
        this.setState((previousState) => {
            const validationErrors = previousState
                .validationErrors
                .filter(error => error.message !== message);

            return {
                validationErrors: validationErrors
            };
        });
    }


    render() {
        const validationErrorSummary = this.state.validationErrors.map(error =>
            <div key={uuidv1()} className="alert alert-danger alert-dismissible fade show">
                {error.message}
                <button type="button" className="close" data-dismiss="alert">
                    <span>&times;</span>
                </button>
            </div>
        );

        return (
            <div className="card card-body">
                <div className="mb-2">
                    <span className="h4 my-auto"><i className="fa fa-file-text-o fa-lg"></i> New Product</span>
                    <a className="float-right ml-auto" onClick={this.props.onCloseModal}>
                        <i className="fa fa-remove fa-2x mr-2 text-danger"></i>
                    </a>
                </div>
                {validationErrorSummary}
                <form onSubmit={this.onSave} className="mt-2">
                    <div className="form-group">
                        <label htmlFor="seed">Seed</label>
                        <input type="password" className="form-control" name="seed" autoFocus onChange={this.onSeedChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" name="name" autoFocus onChange={this.onTitleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input type="text" className="form-control" name="location" onChange={this.onContentChange}></input>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-4 col-md-3 col-xl-2 ml-auto">
                            <button type="submit" className="btn btn-success btn-lg btn-block">
                                <i className="fa fa-save mr-2"></i>Save
                            </button>
                        </div>
                        <div className="col-sm-4 col-md-3 col-xl-2">
                            <button className="btn btn-danger btn-lg btn-block mt-2 mt-sm-0"
                                onClick={this.props.onCloseModal}
                                type="button">
                                <i className="fa fa-remove mr-2"></i>Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

AddNoteForm.propTypes = {
    onCloseModal: PropTypes.func,
    onSaveNote: PropTypes.func
};

export default AddNoteForm;
