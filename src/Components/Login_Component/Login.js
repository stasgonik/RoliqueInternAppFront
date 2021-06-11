import PropTypes from "prop-types";
import React, {Component} from 'react';
import {NavLink, withRouter} from "react-router-dom";

import authService from '../../Services/auth.service'
import './login.css'
import Error from '../Items/Messages/Messages';
import {INFO} from '../../Constants/messages'
import regexp from '../../Constants/regexp.enum';
import routes from "../../Constants/routes.enum";

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
        type: 'password',
        isSending: false
    };

    constructor(props) {
        super(props);
        this.showHide = this.showHide.bind(this);
    }

    async componentDidMount() {
        if (authService.getAccessToken() && authService.getRefreshToken()) {
            const result = await authService.refresh()
            if (result.status === 200) {
                this.props.history.push(`/${routes.USERS}`)
            } else {
                localStorage.clear()
            }
        }
    }

    handleValidation() {
        const fields = this.state.fields;
        let formIsValid = true;

        if ((typeof fields.password !== "undefined") || (typeof fields.email !== "undefined")) {
            if (!fields.password.match(regexp.PASSWORD_REGEXP) || !fields.email.match(regexp.EMAIL_REGEXP)) {
                formIsValid = false;
                this.setState({errors: INFO.INVALID_EMAIL_OR_PASSWORD, isSending: false})
            }
        }

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
        this.setState({isSending: true})
        try {
            const fields = this.state.fields;

            const body = {
                email: fields.email,
                password: fields.password
            }

            if (this.handleValidation()) {
                const login = await authService.login(body);
                if (login) {
                    this.setState({isSending: false})
                }
                if (login.status === 200) {
                    this.props.history.push(`/${routes.USERS}`)
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
                    {this.state.errors ?
                        <Error color={{backgroundColor: '#FEEFEF', marginLeft: '32px', marginBottom: '24px'}}
                               colorRound={'colorRound'} className={'ErrorPosition'} message={this.state.errors}/> : ''}
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
                        <button className={this.state.isSending? "button disabled" : "button"} disabled={!!this.state.isSending}>{this.state.isSending? 'Sending' : 'Log In'}</button>
                    </div>

                    <NavLink to={`/${routes.FORGOT_PASSWORD}/${routes.EMAIL_FORM}`}>
                        <p className='login-form-spam blue'>You forgot your password? Click here!</p>
                    </NavLink>
                </form>
            </div>
        );
    }
}

export default withRouter(Login);
