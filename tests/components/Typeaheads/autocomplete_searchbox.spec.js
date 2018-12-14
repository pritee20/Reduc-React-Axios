import React, {Component} from 'react';
import {AutocompleteSearchBox} from '../../../src/core';
import sinon from 'sinon';
import {mount} from 'enzyme';

describe('(Component) AutocompleteSearchBox', function () {
    let rows, fetchSuggestions, clearSuggestions, suggestionSelectedListener, id, placeholder, renderSuggestions;

    beforeEach(() => {
        rows = [{'id': "0", 'prop': 'val', 'prop2': 'val2', 'prop3': 'val3', 'prop4': 'val4'},
            {'id': "1", 'prop': 'val', 'prop2': 'val2', 'prop3': 'val3', 'prop4': 'val4'},
            {'id': "2", 'prop': 'val', 'prop2': 'val2', 'prop3': 'val3', 'prop4': 'val4'},
            {'id': "3", 'prop': 'val', 'prop2': 'val2', 'prop3': 'val3', 'prop4': 'val4'},
            {'id': "4", 'prop': 'val', 'prop2': 'val2', 'prop3': 'val3', 'prop4': 'val4'},
            {'id': "5", 'prop': 'val', 'prop2': 'val2', 'prop3': 'val3', 'prop4': 'val4'},
            {'id': "6", 'prop': 'val', 'prop2': 'val2', 'prop3': 'val3', 'prop4': 'val4'},
            {'id': "7", 'prop': 'val', 'prop2': 'val2', 'prop3': 'val3', 'prop4': 'val4'},
            {'id': "8", 'prop': 'val', 'prop2': 'val2', 'prop3': 'val3', 'prop4': 'val4'},
            {'id': "9", 'prop': 'val', 'prop2': 'val2', 'prop3': 'val3', 'prop4': 'val4'}];


        fetchSuggestions = sinon.spy();
        clearSuggestions = sinon.spy();
        suggestionSelectedListener = sinon.spy();
        id = "unit_test_search_id";
        placeholder = "unit_test";

        renderSuggestions = suggestion => (<span>{suggestion.name}</span>);
    });

    it('renders correctly', function () {
        let wrapper = mount(<AutocompleteSearchBox searchSuggestions={rows} id={id} objKey="id"
                                                   renderSuggestion={renderSuggestions}
                                                   suggestionSelectedListener={suggestionSelectedListener}
                                                   placeholder={placeholder} fetchSuggestions={fetchSuggestions}
                                                   clearSuggestions={clearSuggestions}/>);
        wrapper.length.should.be.equal(1);

    });

});
