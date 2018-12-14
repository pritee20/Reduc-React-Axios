/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import Paginator from 'react-pagify';

const seperator = <span>...</span>;
const labels = {
    "previous": "Previous",
    "next": "Next"
};

class Pagination extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (<Paginator.Context className="pagify-pagination" onSelect={this.props.pageSelected}
                                   segments={this.props.pagination.segments}>
            <Paginator.Button
                className={this.props.pagination.page > 1 ? '' : 'disabled'}
                page={this.props.pagination.page - 1}
            >
                {labels.previous}
            </Paginator.Button>

            <Paginator.Segment field="beginPages"/>

            <Paginator.Ellipsis className="ellipsis"
                                previousField="beginPages" nextField="previousPages">{seperator}</Paginator.Ellipsis>

            <Paginator.Segment field="previousPages"/>
            <Paginator.Segment field="centerPage" className="selected"/>
            <Paginator.Segment field="nextPages"/>

            <Paginator.Ellipsis className="ellipsis"
                                previousField="nextPages" nextField="endPages">{seperator}</Paginator.Ellipsis>

            <Paginator.Segment field="endPages"/>

            <Paginator.Button
                className={this.props.pagination.page + 1 <= this.props.pagination.pages ? '' : 'disabled'}
                page={this.props.pagination.page + 1}
            >
                {labels.next}
            </Paginator.Button>


        </Paginator.Context>);
    }
}

Pagination.propTypes = {
    pagination: React.PropTypes.object.isRequired,
    pageSelected: React.PropTypes.func.isRequired
};

export default Pagination;
