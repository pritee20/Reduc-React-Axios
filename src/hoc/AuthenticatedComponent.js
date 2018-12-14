/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import getUserAccessObject from '../selectors/AccessSelector';
import accessConstants from '../constants/AccessConstants';
import {saveRedirectPath} from '../login/actions';
/**
 *
 * @param Component Accepts a react component and checks rendering of component on basis of auth credentials.
 *  @returns Renders the Component or return an empty div.
 */


export function requireAuthentication(Component, componentType) {
    
    class AuthenticatedComponent extends React.Component {
        
        componentWillMount() {
            this.checkAuth(this.props.isAuthenticated);
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth(nextProps.isAuthenticated);
        }

        checkAuth(isAuthenticated) {
            if (!isAuthenticated) {
                let path = this.props.location.pathname;
                if (this.props.location.search && this.props.location.search.length != 0) {
                    path = path + this.props.location.search;
                }
                this.props.dispatch(saveRedirectPath(path));
                this.props.dispatch(push('/'));
            }
        }

        render() {
            return (
                <div>
                    {
                        (
                            this.props.isAuthenticated === true
                            && (
                                (
                                    this.props.userAccessObject.canViewManage
                                    && componentType == accessConstants.TYPE_MANAGE
                                )
                            ||  (
                                    this.props.userAccessObject.canViewReports
                                    && componentType == accessConstants.TYPE_REPORT
                                )
                            ||  (
                                    this.props.userAccessObject.canViewReports
                                    && componentType == accessConstants.TYPE_DASHBOARD
                                )
                            )
                        )
                            ?
                            <Component {...this.props}/>
                            :
                            (
                                !this.props.userAccessObject.canViewManage
                                && componentType == accessConstants.TYPE_MANAGE
                            ) ? 'You are not Authorized.'
                            : (
                                !this.props.userAccessObject.canViewReports
                                && componentType == accessConstants.TYPE_REPORT
                            ) ? 'You are not Authorized.' : ''
                    }
                </div>
            );

        }
    }

    const mapStateToProps = (state) => ({
        token: state.user.token,
        userName: state.user.userName,
        isAuthenticated: state.user.isAuthenticated,
        userAccessObject: getUserAccessObject(state)
    });

    return connect(mapStateToProps)(AuthenticatedComponent);

}

