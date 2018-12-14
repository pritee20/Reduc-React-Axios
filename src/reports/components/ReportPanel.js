/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, { Component } from 'react';
import GetReportContainer from './GetReportContainer';
import DisplayReportContainer from './DisplayReportContainer';
import { Panel} from 'react-bootstrap';
import flow from 'lodash/flow';
import {DragSource, DropTarget} from 'react-dnd';
import ItemTypes from '../ItemTypes';

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
};


const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};
/**
 * React Component that encapsulates GetReportContainer and DisplayReportContainer.
 */
class ReportPanel extends Component {


	render() {
	const { isDragging, connectDragSource, connectDropTarget } = this.props;

		return connectDragSource(connectDragSource(
				<div>
					<Panel>
                        <h4>{this.props.header}</h4>
                        <br/>
						<GetReportContainer reportType={this.props.reportType}/>
						<br/>
						<DisplayReportContainer reportType={this.props.reportType}/>
					</Panel>
				</div>
			));
	}
}

export default flow(
	DragSource(ItemTypes.REPORT, cardSource, (connect, monitor) => ({
	  connectDragSource: connect.dragSource(),
  	  isDragging: monitor.isDragging()
	})),
	DropTarget(ItemTypes.REPORT, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
)(ReportPanel);