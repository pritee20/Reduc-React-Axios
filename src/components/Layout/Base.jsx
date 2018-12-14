/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import Header from './Header';
import Sidebar from './Sidebar';
import Offsidebar from './Offsidebar';
import Footer from './Footer';

class Base extends React.Component {

	render() {

		// Animations supported
		//      'rag-fadeIn'
		//      'rag-fadeInUp'
		//      'rag-fadeInDown'
		//      'rag-fadeInRight'
		//      'rag-fadeInLeft'
		//      'rag-fadeInUpBig'
		//      'rag-fadeInDownBig'
		//      'rag-fadeInRightBig'
		//      'rag-fadeInLeftBig'
		//      'rag-zoomBackDown'

		const animationName = 'rag-fadeIn';

		return (
		
			this.props.isAuthenticated ? 
			<div className="wrapper">
				<Header />

				<Sidebar />

				<Offsidebar />

				<ReactCSSTransitionGroup
				component="section"
				transitionName={animationName}
				transitionEnterTimeout={500}
				transitionLeaveTimeout={500}
				>
				{React.cloneElement(this.props.children, {
					key: Math.random()
				})}
				</ReactCSSTransitionGroup>

				<Footer />
			</div>
			:
			<div>
				<ReactCSSTransitionGroup
				component="section"
				transitionName={animationName}
				transitionEnterTimeout={500}
				transitionLeaveTimeout={500}
				>
				{React.cloneElement(this.props.children, {
					key: Math.random()
				})}
				</ReactCSSTransitionGroup>
			</div>	
		);
	}

}
function mapStateToProps(state) {
	return {
		isAuthenticated: state.user.isAuthenticated
	};
}

export default connect(mapStateToProps)(Base);

