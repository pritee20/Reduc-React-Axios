import

    React, {
    Component
} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ContentWrapper from '../../../components/Layout/ContentWrapper';
import {Row, Col, Panel, FormGroup, Button, DropdownButton, MenuItem} from 'react-bootstrap';
import {ParkingRevenueReportFilter, ParkingRevenueReportTable, ParkingRevenueReportGraph} from './index';
import {getRevenueReportParkingData} from '../action';
import {filter, table, graph} from '../selector';

export class ParkingRevenueReportContainer extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getRevenueReportParkingData(true);
    }

    render() {
        return (<ContentWrapper>
            <div className="content-heading">
                <h3>Revenue Report by Parking</h3>
            </div>

            <Row>
                <Col xs={12}>
                    <ParkingRevenueReportFilter data={this.props.filterData}/>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <ParkingRevenueReportTable data={this.props.tableData}/>
                </Col>
            </Row>

            <Row>
                <Col xs={12}>
                    <ParkingRevenueReportGraph data={this.props.graphData}/>
                </Col>
            </Row>

        </ContentWrapper>);
    }

}
function mapStateToProps(state) {

    return {
        filterData: filter(state),
        tableData: table(state),
        graphData: graph(state)
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getRevenueReportParkingData}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ParkingRevenueReportContainer);
