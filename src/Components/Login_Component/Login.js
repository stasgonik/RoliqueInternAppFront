import React, {Component} from 'react';
import './login.css'
import authService from '../../Services/auth.service'
import {NavLink, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import Error from '../Items/Messages/Messages';
import {INFO} from '../../Constants/messages'


class Login extends Component {

	static propTypes = {
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	};

	state = {
		fields: {
			email: '',
			password: ''
		},
		errors: '',
		type: 'input',
	};

	constructor(props) {
		super(props);
		this.showHide = this.showHide.bind(this);
	}

	handleValidation() {
		const fields = this.state.fields;
		let errors = '';
		let formIsValid = true;

		if ((typeof fields["password"] !== "undefined") || (typeof fields["email"] !== "undefined")) {
			if (!fields["password"].match(/^(?=.*[A-Za-z])(?=.*\d)([A-Za-z\d@$!%*#?&]?){4,50}$/) || !fields["email"].match(/^[\w.-]+@[a-zA-Z]+\.[a-zA-Z]+$/)) {
				formIsValid = false;
				errors = INFO.INVALID_EMAIL_OR_PASSWORD
			}
		}

		this.setState({errors});
		return formIsValid;
	}

	showHide(e) {
		e.preventDefault();
		e.stopPropagation();
		this.setState({
			type: this.state.type === "input" ? "password" : "input"
		});
	}

	myForm = React.createRef();


	send = async (e) => {
		e.preventDefault();
		try {
			let in1 = this.myForm.current[0].value;
			let in2 = this.myForm.current[1].value;

			const body = {
				email: in1,
				password: in2
			}

			if (this.handleValidation()) {
				const login = await authService.login(body);
				if (login.status === 200) {
					this.props.history.push('/users')
					return
				}
				if (login.status === 400) {
					this.setState({errors: INFO.INVALID_EMAIL_OR_PASSWORD})
					return
				}
				if (login.status === 500) {
					this.setState({errors: INFO.SERVER_ERROR})
					console.log(login)
					return
				}
				this.setState({errors: INFO.UNKNOWN_ERROR})
				console.log(login)
				return
			}

		} catch (e) {
			console.log(e)
		}
	};

	handleChange(field, e) {
		e.preventDefault();
		let fields = this.state.fields;
		fields[field] = e.target.value;
		this.setState({fields});
	}

	render() {

		return (
			<div className={'main-flex-login'}>
				<form className={'login-form'} onSubmit={this.send} ref={this.myForm}>

					<h3 className={'login-form-h3'}>Log into your account</h3>
					{this.state.errors ? <Error color={{backgroundColor: '#FEEFEF', marginLeft: '32px', marginBottom: '24px'}} colorRound={'colorRound'} className={'ErrorPosition'} message={this.state.errors}/> : ''}
					<span className={'login-form-spam'}>Email</span>

					<input id={'in1'} className={'loginInput'} required={true}
						   onChange={this.handleChange.bind(this, "email")}
					/>

					<div className={'PasswordForm'}>
						<span className={'login-form-spam'}>Password</span>
						<span className="login-form-spam clickPassword" onClick={this.showHide}>
                            {this.state.type === "input" ? "Hide Password" : "Show Password"}
                     </span>
					</div>
					<input type={this.state.type} className="password__input" required={true}
						   onChange={this.handleChange.bind(this, "password")}
					/>

					<div className="wrap">
						<button className="button">Log In</button>
					</div>

					<NavLink to={'/forgotPassword/emailForm/'}>
						<p className='login-form-spam blue'>You forgot your password? Click here!</p>
					</NavLink>
				</form>
			</div>
		);
	}
}

export default withRouter(Login);
