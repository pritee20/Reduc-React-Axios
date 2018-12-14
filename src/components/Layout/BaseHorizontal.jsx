/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from 'react-redux';
import HeaderHorizontal from './HeaderHorizontal';
import Sidebar from './Sidebar';
import Offsidebar from './Offsidebar';
import Footer from './Footer';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';


class Base extends React.Component {
    
	componentDidMount(){

		if (this.props.isAuthenticated && this.props.location.pathname == '/') {
			this.props.push('/dashboard');
			$('body').addClass('layout-h');
		}

		if(this.props.location.pathname !== '/new-reports'){
			$('body').addClass('layout-h');
		}
	}

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

		const animationName = 'rag-zoomBackDown';

		return (
			this.props.isAuthenticated ? 
			<div className="wrapper">

				{
					this.props.location.pathname !== '/checkInCount' ? <HeaderHorizontal /> : ""
				}



                {
                    this.props.location.pathname == '/new-reports' ?  <Sidebar /> : ""
                }

				<Offsidebar />

				<ReactCSSTransitionGroup
				component="section"
				transitionName={animationName}
				transitionEnterTimeout={0}
				transitionLeaveTimeout={0}
				>
					{React.cloneElement(this.props.children, {
						key: Math.random()
					})}
				</ReactCSSTransitionGroup>

				<Footer />
			</div>
			:
			<div id="hero-bg" className="wrapper hero-image">
				<div className="login-cover-div">
					{React.cloneElement(this.props.children, {
						key: Math.random()
					})}
				</div>
			</div>
		);
	}

}

Base.contextTypes = {
    router: React.PropTypes.object
};


function mapStateToProps(state) {
    return {
        isAuthenticated: state.user.isAuthenticated
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({push}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Base);

