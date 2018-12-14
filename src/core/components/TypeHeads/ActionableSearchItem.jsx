import React, {Component} from 'react';
import {es6BindAll} from '../../../manage/helper';
import {Button} from '../../index';
export class ActionableSearchItem extends Component {

    constructor(props) {
        super(props);
        es6BindAll(this, ['actionClickEvent']);
    }

    actionClickEvent(event) {
        this.props.actionListener(this.props.data);
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-9">
                    <span>{this.props.displayText}</span>
                </div>
                <div className="col-lg-3">
                    <Button text={this.props.actionText} stopEventPropagation={true}
                            clickListener={this.actionClickEvent}/>
                </div>
            </div>

        );
    }

}

