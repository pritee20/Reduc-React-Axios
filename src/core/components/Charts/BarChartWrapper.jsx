/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {
    Component
} from 'react';
import {es6BindAll} from '../../../manage/helper';
import {constants} from '../../../constants';
import  {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import _ from 'lodash';

export class BarChartWrapper extends Component {

    constructor(props) {
        super(props);
        es6BindAll(this, ['getStyle']);
        this.defaultStyle = {
            height: 400,
            width: 800,
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 5,
            marginTop: 5
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

        if (this.props.bars && this.props.bars.length > 0 && this.props.data && this.props.data.length > 0) {
            return (
                <BarChart width={style.width} height={style.height} data={this.props.data}
                          margin={{top: style.marginTop, right: style.marginRight,
                        left: style.marginLeft, bottom: style.marginBottom}}
                          barGap={this.props.gap ? this.props.gap: 0}>
                    <XAxis dataKey={this.props.xAxisKey ? this.props.xAxisKey : ''}/>
                    <YAxis dataKey={this.props.yAxisKey ? this.props.yAxisKey : ''}/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    {
                        this.props.bars.map(function (bar) {
                            return (<Bar key={_.random(0, 100000)} dataKey={bar.key}
                                         fill={bar.color}/>);

                        })
                    }
                </BarChart>);
        } else {
            return (<p>{constants.placeHolderConstants.noDataToRenderChart}</p>);
        }
    }


}