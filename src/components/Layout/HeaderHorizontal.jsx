/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, { Component } from 'react';
import pubsub from 'pubsub-js';
import HeaderRun from './Header.run';
import { NavDropdown, MenuItem, NavItem } from 'react-bootstrap';
import { IndexLinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutAndRedirect } from '../../login/actions';

class HeaderHorizontal extends Component {

	constructor(props){
		super();
		this.state = {
			activemanage: '',
			activereports: ''
		};

		this.onClickListener = this.onClickListener.bind(this);
	}

    componentDidMount() {
        HeaderRun();
    }

    toggleUserblock(e) {
        e.preventDefault();
        pubsub.publish('toggleUserblock');
    }

    onClickListener(event){
		if (event.target.href.indexOf('new-reports') >= 0) {
    		this.setState({'activemanage': ''});
    		this.setState({'activereports': 'active'});
		}
		else if (event.target.href.indexOf('manage') >= 0) {
    		this.setState({'activemanage': 'active'});
    	 	this.setState({'activereports': ''});
		}
    }

    render() {

        const ddAlertTitle = (
            <span>
                <span className="margin-right-10">{this.props.username}</span>
				<i className="fa fa-caret-down"></i>
			</span>
		);
		
		return (
			<header className="topnavbar-wrapper">
				<nav role="navigation" className="navbar topnavbar">
					<div className="navbar-header">
						<a href="#/" className="navbar-brand">
							<div className="brand-logo">
								<img src="img/gmp-logo-white.png" alt="App Logo" className="img-responsive width-60" />
							</div>
							<div className="brand-logo-collapsed">
								<img src="img/gmp-logo-white.png" alt="App Logo" className="img-responsive width-60" />
							</div>
						</a>
					</div>

					<div className="navbar-collapse collapse">
						<ul className="nav navbar-nav">
						{
							this.props.showReport ? <IndexLinkContainer to="/new-reports?reportType=value-card" onClick={this.onClickListener}>
                                <NavItem activeHref="active" className={this.state.activereports} ref="navreports" >Reports</NavItem>
                            </IndexLinkContainer> : ""
							
						}

						{
							this.props.showManage ? <IndexLinkContainer to="/manage" onClick={this.onClickListener}>
                                <NavItem activeHref="active"  className={this.state.activemanage} ref="navmanage">Manage</NavItem>
                            </IndexLinkContainer> : ""
						}
						</ul>

						<ul className="nav navbar-nav navbar-right margin-right-10">
							<NavDropdown noCaret eventKey={ 3 } title={ ddAlertTitle } id="basic-nav-dropdown">
                                <MenuItem className="animated flipInX" eventKey={ 3.1 }>Add User</MenuItem>
                                <MenuItem className="animated flipInX" eventKey={ 3.2 }>Profile</MenuItem>
                                <MenuItem divider />
                                <MenuItem className="animated flipInX" eventKey={ 3.3 } onClick={() => this.props.logoutAndRedirect()}>Logout</MenuItem>
                            </NavDropdown>
						</ul>
					</div>
				</nav>
			</header>
		);
	}

}

function mapStateToProps(state) {
	
	let doesStateExist = state.user && state.user.userAccess;
	
	let adminManage = doesStateExist ? state.user.userAccess.userAccesses.filter(function(object) {
		return object.accessTitle === "ADMIN_MANAGE";
	}) : [];
    
	let adminReport = doesStateExist ? state.user.userAccess.userAccesses.filter(function(object) {
		return  object.accessTitle === "ADMIN_REPORT";
	}) : [];
		
	return {
		username : state.user.userName,
		showManage: adminManage.length == 1,
		showReport : adminReport.length == 1 
	}

}

function mapDispatchToProps(dispatch) {
    return (bindActionCreators({logoutAndRedirect}, dispatch));
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderHorizontal);

