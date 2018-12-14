/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React from 'react';
import pubsub from 'pubsub-js';
import HeaderRun from './Header.run';
import { NavDropdown, MenuItem, NavItem } from 'react-bootstrap';
import { IndexLinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutAndRedirect } from '../../login/actions';

class Header extends React.Component {

	constructor(props){
        console.log(props);
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
		if (event.target.href.indexOf('reports') >= 0) {
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
				<em className="icon-bell"></em>
				<span className="label label-danger">{this.props.username}</span>
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
					<div className="nav-wrapper">
						<ul className="nav navbar-nav">
                            {
                                this.props.showReport ? <IndexLinkContainer to="/reports" onClick={this.onClickListener}>
                                    <NavItem activeHref="active" className={this.state.activereports} ref="navreports" >Reports</NavItem>
                                </IndexLinkContainer> : ""

                            }

                            {
                                this.props.showManage ? <IndexLinkContainer to="/manage" onClick={this.onClickListener}>
                                    <NavItem activeHref="active"  className={this.state.activemanage} ref="navmanage">Manage</NavItem>
                                </IndexLinkContainer> : ""
                            }
							<li>
								<a id="user-block-toggle" href="#" onClick={ this.toggleUserblock }>
									<em className="icon-user"></em>
								</a>
							</li>
						</ul>
						<ul className="nav navbar-nav navbar-right">
							<li>
								<a href="" data-search-open="">
									<em className="icon-magnifier"></em>
								</a>
							</li>
							<NavDropdown noCaret eventKey={ 3 } title={ ddAlertTitle } id="basic-nav-dropdown" >
								<MenuItem className="animated flipInX" eventKey={3.1}>Login</MenuItem>
								<MenuItem className="animated flipInX" eventKey={3.2}>Profile</MenuItem>
								<MenuItem className="animated flipInX" eventKey={3.3}>Dashboard</MenuItem>
								<MenuItem divider />
								<MenuItem className="animated flipInX" eventKey={3.3} onClick={() => this.props.logoutAndRedirect()}>Logout</MenuItem>
							</NavDropdown>
							<li>
								<a href="" data-toggle-state="offsidebar-open" data-no-persist="true">
									<em className="icon-notebook"></em>
								</a>
							</li>
							{ /* END Offsidebar menu */ }
						</ul>
						{ /* END Right Navbar */ }
					</div>
					{ /* END Nav wrapper */ }
					{ /* START Search form */ }
					<form role="search" action="search.html" className="navbar-form">
						<div className="form-group has-feedback">
							<input type="text" placeholder="Type and hit enter ..." className="form-control" />
							<div data-search-dismiss="" className="fa fa-times form-control-feedback"></div>
						</div>
						<button type="submit" className="hidden btn btn-default">Submit</button>
					</form>
					{ /* END Search form */ }
				</nav>
				{ /* END Top Navbar */ }
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
	return (bindActionCreators({ logoutAndRedirect },dispatch));
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
