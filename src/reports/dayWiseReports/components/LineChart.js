/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React from 'react';
/**
 * React Component that renders graphical reports using Highcharts for the given data.
 */
class LineChart extends React.Component {

	constructor(props) {
		super(props);
		this.generateChartConfig = this.generateChartConfig.bind(this);
	}

	generateChartConfig(propsData){

		let graphTitle,yAxisTitle,tooltipPref,dataSeries;
		let xSeries = propsData.graphData.dates;
		
		if (propsData.isRev) {
			graphTitle = 'Revenue Stats';
			yAxisTitle = 'Revenue (Rupees)';
			tooltipPref = '₹ ';
			dataSeries = [{
				name: 'Check In',
				data: propsData.graphData.data.checkInRevenue
			}, {
				name: 'Check Out',
				data: propsData.graphData.data.checkOutRevenue
			}];
		} else {
			graphTitle = 'Transactions Count';
			yAxisTitle = 'Transactions (Count)';
			tooltipPref = '';
			dataSeries = [{
				name: 'Check In',
				data: propsData.graphData.data.checkInCount
			}, {
				name: 'Check Out',
				data: propsData.graphData.data.checkOutCount
			}, {
				name: 'FOC',
				data: propsData.graphData.data.focCount
			}, {
				name: 'TT',
				data: propsData.graphData.data.ttCount
			},{
				name: 'AC',
				data: propsData.graphData.data.acCount
			}];
		}
		
		return {
			title: {
				text: graphTitle,
				x: -20 //center
			},
			xAxis: {
				categories: xSeries
			},
			yAxis: {
				title: {
					text: yAxisTitle
				},
				plotLines: [{
					value: 0,
					width: 1,
					color: '#808080'
				}]
			},
			tooltip: {
				valuePrefix: tooltipPref
			},
			chart: {
				zoomType: 'x'
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle',
				borderWidth: 0
			},
			series: dataSeries
		};
	}

	componentWillReceiveProps(nextProps){
		let options = this.generateChartConfig(nextProps);
		$(`#${this.props.containerName}`).highcharts(options);
	}

	componentDidMount() {
		let options = this.generateChartConfig(this.props);
		$(`#${this.props.containerName}`).highcharts(options);
	}

	render() {
		return (
			<div className="row">
				<div id={this.props.containerName} className="col-sm-12 chartContainer">
				</div>
			</div>
		);
	}
}

export default LineChart;


