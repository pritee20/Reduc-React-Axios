/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */


import React from 'react';
import {Router, Route, Link, History} from 'react-router';
import pubsub from 'pubsub-js';
import {Collapse} from 'react-bootstrap';
import SidebarRun from './Sidebar.run';
import {constants} from '../../constants';


class Sidebar extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            userBlockCollapse: false,
            collapse: {
                singleview: this.routeActive(['singleview']),
                submenu: this.routeActive(['submenu'])
            }
        };
        this.pubsub_token = pubsub.subscribe('toggleUserblock', () => {
            this.setState({
                userBlockCollapse: !this.state.userBlockCollapse
            });
        });
    };

    componentDidMount() {
        SidebarRun();
        $('body').removeClass('layout-h');
    }

    componentWillUnmount() {
        // React removed me from the DOM, I have to unsubscribe from the pubsub using my token
        pubsub.unsubscribe(this.pubsub_token);
        $('body').addClass('layout-h');
    }

    routeActive(paths) {
        paths = Array.isArray(paths) ? paths : [paths];
        for (let p in paths) {
            if (this.context.router.isActive(paths[p]) === true)
                return true;
        }
        return false;
    }

    toggleItemCollapse(stateName) {
        var newCollapseState = {};
        for (let c in this.state.collapse) {
            if (this.state.collapse[c] === true && c !== stateName)
                this.state.collapse[c] = false;
        }
        this.setState({
            collapse: {
                [stateName]: !this.state.collapse[stateName]
            }
        });
    }

    render() {

        let parkingRevenueReports = constants.pathConstants.NEW_REPORTS + constants.pathConstants.REVENUE_REPORTS.parking.query;

        return (
            <aside className='aside'>
                <div className="aside-inner">
                    <nav data-sidebar-anyclick-close="" className="sidebar">
                        <ul className="nav">
                            <li className="has-user-block">
                                <Collapse id="user-block" in={ this.state.userBlockCollapse }>
                                    <div className="item user-block">
                                        <div className="user-block-picture">
                                            <div className="user-block-status">
                                                <img src="img/user/02.jpg" alt="Avatar" width="60" height="60"
                                                     className="img-thumbnail img-circle"/>
                                                <div className="circle circle-success circle-lg"></div>
                                            </div>
                                        </div>
                                        <div className="user-block-info">
                                            <span className="user-block-name">Hello, Mike</span>
                                            <span className="user-block-role">Designer</span>
                                        </div>
                                    </div>
                                </Collapse>
                            </li>

                            <li className="nav-heading ">
                                <span data-localize="sidebar.heading.HEADER"> </span>
                            </li>

                            <li className={ this.routeActive('/new-reports?reportType=value-card') ? 'active' : '' }>
                                <Link to="/new-reports?reportType=value-card" title="Value Card">
                                    {/*<em className="icon-grid"></em>*/}
                                    <span data-localize="sidebar.nav.VALUECARD">Value Card</span>
                                </Link>
                            </li>

                            <li className={ this.routeActive([
                                '/new-reports?reportType=by-vehicle-type',
                                '/new-reports?reportType=by-time-duration',
                                '/new-reports?reportType=by-mode-of-payment',
                                parkingRevenueReports
                                ])
                            ? 'active' : ''
                            }>
                                <div className="nav-item"
                                     onClick={ this.toggleItemCollapse.bind(this, 'byvehicletype') }>
                                    {/*<div className="pull-right label label-info"></div>*/}
                                    {/*<em className="icon-speedometer"></em>*/}
                                    <span data-localize="sidebar.nav.REVENUEREPORT">Revenue Report</span>
                                </div>
                                <Collapse in={ this.state.collapse.byvehicletype } timeout={ 100 }>
                                    <ul id="byVehicleType" className="nav sidebar-subnav">
                                        <li className={ this.routeActive('/new-reports?reportType=by-vehicle-type') ? 'active' : '' }>
                                            <Link to="/new-reports?reportType=by-vehicle-type" title="ByVehicleType">
                                                <span data-localize="sidebar.nav.BYVEHICLETYPE">By Vehicle Type</span>
                                            </Link>
                                        </li>
                                        <li className={ this.routeActive('/new-reports?reportType=by-time-duration') ? 'active' : '' }>
                                            <Link to="/new-reports?reportType=by-time-duration" title="ByTimeDuration">
                                                <span data-localize="sidebar.nav.BYTIMEDURATION">By Time Duration</span>
                                            </Link>
                                        </li>

                                        <li className={ this.routeActive('/new-reports?reportType=by-mode-of-payment') ? 'active' : '' }>
                                            <Link to="/new-reports?reportType=by-mode-of-payment"
                                                  title="ByModeOfPayment">
                                                <span
                                                    data-localize="sidebar.nav.BYMODEOFPAYMENT">By Mode of Payment</span>
                                            </Link>
                                        </li>
                                        <li className={ this.routeActive(parkingRevenueReports) ? 'active' : '' }>
                                                <Link to={parkingRevenueReports}
                                                      title="ByParking">
                                                <span
                                                    data-localize="sidebar.nav.BYPARKING">By PARKING</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </Collapse>
                            </li>
                            <li className={ this.routeActive('/new-reports?reportType=current-status') ? 'active' : '' }>
                                <Link to="/new-reports?reportType=current-status" title="Current Status">
                                    {/*<em className="icon-grid"></em>*/}
                                    <span data-localize="sidebar.nav.CURRENTSTATUS">Current Status</span>
                                </Link>
                            </li>
                            <li className={ this.routeActive('/new-reports?reportType=data-dump') ? 'active' : '' }>
                                <Link to="/new-reports?reportType=data-dump" title="Data Dump">
                                    {/*<em className="icon-grid"></em>*/}
                                    <span data-localize="sidebar.nav.DATADUMP">Data Dump</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        );
    }

}

Sidebar.contextTypes = {
    router: React.PropTypes.object
};

export default Sidebar;
