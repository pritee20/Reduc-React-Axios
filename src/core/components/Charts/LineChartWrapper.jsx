/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {es6BindAll} from '../../../manage/helper';
import _ from 'lodash';
import {constants} from '../../../constants';

export class LineChartWrapper extends Component {


    constructor(props) {
        super(props);
        es6BindAll[this, ['getStyle']];
        /**
         * default style of the line chart, if no style is defined then the following values are used
         * @type {{width: number, height: number, marginLeft: number, marginRight: number, marginBottom: number, marginTop: number}}
         */
        this.defaultStyle = {
            width: 500,
            height: 500,
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 5,
            marginTop: 5
        };

    }


    /**
     * get the style object with height, width and margins defined
     * if any is not set then default value is used
     */

    getStyle() {

        let propsStyle = this.props.style || {};
        let style = {
            width: propsStyle.width !== undefined ? propsStyle.width : this.defaultStyle.width,
            height: propsStyle.height !== undefined ? propsStyle.height : this.defaultStyle.height,
            marginLeft: propsStyle.marginLeft !== undefined ? propsStyle.marginLeft : this.defaultStyle.marginLeft,
            marginRight: propsStyle.marginRight !== undefined ? propsStyle.marginRight : this.defaultStyle.marginRight,
            marginBottom: propsStyle.marginBottom !== undefined ? propsStyle.marginBottom : this.defaultStyle.marginBottom,
            marginTop: propsStyle.marginTop !== undefined ? propsStyle.marginTop : this.defaultStyle.marginTop
        };
        return style;
    }

    render() {
        let style = this.getStyle();
        if (this.props.lines && this.props.lines.length > 0 && this.props.data && this.props.data.length > 0) {
            return (
                <LineChart width={style.width}
                           height={style.height}
                           data={this.props.data}
                           margin={{top: style.marginTop, right: style.marginRight,left: style.marginLeft, bottom: style.marginBottom}}
                           style={{width : 100+"%"}}
                >
                    <XAxis dataKey={this.props.xAxisKey ? this.props.xAxisKey : ''}/>
                    <YAxis dataKey={this.props.yAxisKey ? this.props.yAxisKey : ''}/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend />
                    {
                        this.props.lines.map(function (line) {
                            return <Line key={_.random(0, 100000)}
                                         type="monotone"
                                         dataKey={line.key}
                                         stroke={line.color}
                                         activeDot={{r: 8}}
                            />
                        })
                    }
                </LineChart>
            );
        } else {
            return (<p>{constants.placeHolderConstants.noDataToRenderChart}</p>)
        }

    };
}