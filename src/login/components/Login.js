/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */


import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser } from '../actions';
/**
 * React Component for Login Module that accepts username,password
 * and emits loginUser action upon valid input.
 */
class Login extends Component {

	constructor(props) {
		super(props);

		this.state = {
			user: "",
			password: "",
			statusText: props.statusText
		};

		this.onEmailInputChange = this.onEmailInputChange.bind(this);
		this.onPasswordInputChange = this.onPasswordInputChange.bind(this);
		this.onLoginFormSubmit = this.onLoginFormSubmit.bind(this);
	}
	
	onEmailInputChange(event){

		this.setState({
			user : event.target.value,
			statusText : null
		});
	}

	onPasswordInputChange(event){
		this.setState({ 
			password : event.target.value,
			statusText : null
		});
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			statusText: nextProps.statusText
		});
	}

	onLoginFormSubmit(event){
		event.preventDefault();
		// console.log(this.state.user, this.state.password);
		this.props.loginUser(this.state.user, this.state.password);
	}


	render() {
		return (
			<div className="block-center mt-xl wd-xl">
				{ /* START panel */ }
				<div className="panel panel-dark panel-flat">
					<div className="panel-heading text-center">
						<a href="#">
							<img src="img/gmp-logo-white.png" alt="Image" className="width-40 block-center img-rounded" />
						</a>
					</div>
					<div className="panel-body">
						<p className="text-center pv">SIGN IN TO CONTINUE.</p>
						<form role="form"  onSubmit={this.onLoginFormSubmit} >
							<div className="form-group has-feedback">
								<input id="exampleInputEmail1" type="text" value={this.state.user} onChange={this.onEmailInputChange} placeholder="Enter Username" autoComplete="off" required="required" className="form-control" />
								<span className="fa fa-envelope form-control-feedback text-muted"></span>
							</div>
							<div className="form-group has-feedback">
								<input id="exampleInputPassword1" type="password" value={this.state.password} onChange={this.onPasswordInputChange} placeholder="Password" required="required" className="form-control" />
								<span className="fa fa-lock form-control-feedback text-muted"></span>
							</div>
							{
								(this.state.statusText === null) ? "" :
								<div id="panel-anim-bounce" className="panel panel-default" >
									<div className="panel-heading">{this.state.statusText}</div>
								</div>
							}
							<button type="submit" className="btn btn-block btn-primary mt-lg">Login</button>
						</form>
					</div>
				</div>
				{ /* END panel */ }
			</div>
			);
	}

}

function mapStateToProps(state) {
	return {
		statusText : state.user.statusText
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ loginUser }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);

