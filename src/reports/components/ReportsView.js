/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import ContentWrapper from '../../components/Layout/ContentWrapper';
import ReportPanel from './ReportPanel';
import companyReports from '../companyReports';
import dayWiseReports from '../dayWiseReports';
import OperatorApp from '../operatorAppStatus/components/operatorAppStatus.js';
import _ from 'lodash';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

/**
 * React Component that contains container for both type of reports.
 */
class ReportView extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        $('body').removeClass('layout-h');
    }

    render() {

		return (
			<ContentWrapper>
				<ReportPanel header={_.startCase(companyReports.constants.NAME)} reportType={companyReports.constants.NAME}/>
				<ReportPanel header={_.startCase(dayWiseReports.constants.NAME)} reportType={dayWiseReports.constants.NAME}/>
				<OperatorApp />
			</ContentWrapper>
		);
	}
}

export default DragDropContext(HTML5Backend)(ReportView);

