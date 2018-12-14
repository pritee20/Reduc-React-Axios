import React, {Component} from 'react';

import {LineChart, BarChart, PieChart} from '../core';


const data = [
    {name: 'Jan', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Feb', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Mar', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Apr', uv: 2780, pv: 3908, amt: 2000},
    {name: 'May', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Jun', uv: 2390, pv: 3800, amt: 2500},
    {name: 'Jul ', uv: 3490, pv: 4300, amt: 2100},
    {name: 'Aug', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Sep', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Oct', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Nov', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Dec', uv: 2390, pv: 3800, amt: 2500}
];


const lineChartStyle = {
    height: 500, width: 600, marginLeft: 5, marginRight: 5, marginTop: 5, marginBottom: 5
};

const lines = [
    {
        key: "uv", 
        color: "#8884d8"
    }, 
    {
        key: "pv", 
        color: "#00FF00"
    }
];

const pieData = [
    {"name": "John", value: 50},
    {"name": "Paul", value: 10},
    {"name": "George", value: 60},
    {"name": "Ringo", value: 20},
    {"name": "Pete", value: 50}
];

const pieCells = [
    {"color": "#0000FF"},
    {"color": "#000000"},
    {"color": "#FFF0FF"},
    {"color": "#FF0000"},
    {"color": "#00FFFF"}
];

export class ChartsDemo extends Component {


    render() {
        return (
            <div>
                <LineChart data={data} style={lineChartStyle} lines={lines} xAxisKey="name"/>
                <BarChart data={data} style={lineChartStyle} bars={lines} xAxisKey="name" yAxisKey="Getmyparking" />
                <PieChart data={pieData} cells={pieCells}/>
            </div>
        );
    }
}