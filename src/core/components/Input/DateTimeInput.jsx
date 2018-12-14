/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import {es6BindAll} from '../../../manage/helper';
export class DateTimeInput extends Component {


    constructor(props) {
        super(props);
        es6BindAll(this, ['onComponentBlurred']);
    }

    componentDidMount() {
        let id = '#' + this.props.id;
        let outerThis = this;

        /**
         * tests runs fine if I comment the following line
         */

        $(id).datetimepicker({
            icons: {
                time: 'fa fa-clock-o',
                date: 'fa fa-calendar',
                up: 'fa fa-chevron-up',
                down: 'fa fa-chevron-down',
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-crosshairs',
                clear: 'fa fa-trash'
            }
        });

        $(id).on('dp.change', (event)=> {
            outerThis.props.onChangeListener(event.date.toString());
        }).bind(this);

    }

    /**
     * a listener to trigger in case of blur event
     * @param event
     */
    onComponentBlurred(event) {
        if (this.props.blurListener) {
            this.props.blurListener(event.target.value, this.props.data);
        }
    }

    render() {
        return (
            <div id={this.props.id} className="input-group date" onBlur={this.onComponentBlurred}>
                <input type="text" className="form-control"
                       value={this.props.value ? this.props.value : ''}/>
                                    <span className="input-group-addon">
                                        <span className="fa fa-calendar"></span>
                                    </span>
            </div>

        );
    }

}