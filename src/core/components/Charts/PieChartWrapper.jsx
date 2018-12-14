import React, {Component} from 'react';
import {es6BindAll} from '../../../manage/helper';
import {constants} from '../../../constants';
import  {PieChart, Pie, Cell, Legend, Tooltip} from 'recharts';
import {Row, Col} from 'react-bootstrap';
import _ from 'lodash';

export class PieChartWrapper extends Component {

    constructor(props) {
        super(props);
        es6BindAll(this, ['getStyle']);

        this.defaultStyle = {
            height: 650,
            width: 800,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
            marginTop: 0,
            x: 0
        };

    }

    getStyle() {
        let style = this.props.style || {};
        return {
            height: style.height !== undefined ? style.height : this.defaultStyle.height,
            width: style.width !== undefined ? style.width : this.defaultStyle.width,
            marginLeft: style.marginLeft !== undefined ? style.marginLeft : this.defaultStyle.marginLeft,
            marginRight: style.marginRight !== undefined ? style.marginRight : this.defaultStyle.marginRight,
            marginTop: style.marginTop !== undefined ? style.marginTop : this.defaultStyle.marginTop,
            marginBottom: style.marginBottom !== undefined ? style.marginBottom : this.defaultStyle.marginBottom
        };
    }

    render() {
        let style = this.getStyle();
        if (this.props.cells && this.props.cells.length > 0 && this.props.data && this.props.data.length > 0) {
            return (
                <Row>
                    <Col lg={12}>
                        <PieChart width={style.width} height={style.height} data={this.props.data}
                                  margin={{top: style.marginTop, right: style.marginRight,
                                left: style.marginLeft, bottom: style.marginBottom}} align="left"
                                veritcalAlign="bottom">
                                <Pie data={this.props.data} innerRadius={40} outerRadius={80}>

                                    {
                                        this.props.cells.map(function (cell) {
                                            return (<Cell key={_.random(0, 100000)} fill={cell.color}/>);
                                        })
                                    }

                            </Pie>
                            {
                                (!this.props.isLegend) ?
                                    <Legend
                                        align="right"
                                        verticalAlign="top"
                                        layout="vertical"
                                        wrapperStyle={{maxHeight : 250+"px", overflow : "scroll"}}
                                    /> : ""
                            }
                            <Tooltip />
                        </PieChart>
                    </Col>
                </Row>
        );
        } else {
            return (<p>{constants.placeHolderConstants.noDataToRenderChart}</p>)
        }
        }

        }