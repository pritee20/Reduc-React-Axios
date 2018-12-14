/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';

class AutocompleteSearchBox extends Component {

    constructor(props) {
        super(props);
        this.onSearchInputChange = this.onSearchInputChange.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
        this.state = {
            value: ''
        };
    }

    getSuggestionValue(suggestion) {
        console.log('key is inside getSuggestionValue ', this.props.objKey);
        return suggestion[this.props.objKey];
    }


    onSearchInputChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    onSuggestionsFetchRequest = ({value}) => {
        if (value != undefined && value.length > 0) {
            this.props.fetchSuggestions(value);
        }
    };

    clearSuggestionsRequest = () => {
        this.props.clearSuggestions();
    };


    shouldRenderSuggestions = (value) => {
        return value != undefined && value.trim().length > 2;
    };

    onSuggestionSelected(event, {suggestion, suggestionValue, suggestionIndex, sectionIndex, method}) {
        event.preventDefault();
        console.log('suggestion is ', suggestion);
        let outerThis = this;
        this.setState({
            'value': suggestion[outerThis.props.objKey]
        });
        this.props.suggestionSelectedListener(suggestion);
    }


    render() {

        const {value} = this.state;
        const inputProps = {placeholder: this.props.placeholder, value, onChange: this.onSearchInputChange};

        return (
            <Autosuggest suggestions={this.props.searchSuggestions}
                         inputProps={inputProps} renderSuggestion={this.props.renderSuggestion}
                         getSuggestionValue={this.getSuggestionValue}
                         onSuggestionsFetchRequested={this.onSuggestionsFetchRequest}
                         onSuggestionsClearRequested={this.clearSuggestionsRequest}
                         onSuggestionSelected={this.onSuggestionSelected}
                         id={this.props.id} shouldRenderSuggestions={this.shouldRenderSuggestions}
                         className="row"
            />
        );
    }
}

AutocompleteSearchBox.propTypes = {
    id: React.PropTypes.string.isRequired,
    searchSuggestions: React.PropTypes.array.isRequired,
    placeholder: React.PropTypes.string.isRequired,
    fetchSuggestions: React.PropTypes.func.isRequired,
    clearSuggestions: React.PropTypes.func.isRequired,
    objKey: React.PropTypes.string.isRequired,
    suggestionSelectedListener: React.PropTypes.func.isRequired,
    renderSuggestion: React.PropTypes.func.isRequired
};

export default AutocompleteSearchBox;
