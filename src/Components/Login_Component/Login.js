import React, {Component} from 'react';
import './login.css'
import authService from '../../Services/auth.service'
import {NavLink, withRouter} from "react-router-dom";
import PropTypes from "prop-types";


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
        errors: {
            email: '',
            password: ''
        },
        type: 'input',
    };

    constructor(props) {
        super(props);
        this.showHide = this.showHide.bind(this);
    }

    handleValidation() {
        const fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (typeof fields["password"] !== "undefined") {
            if (!fields["password"].match(/^(?=.*[A-Za-z])(?=.*\d)([A-Za-z\d@$!%*#?&]?){4,50}$/)) {
                formIsValid = false;
                errors["password"] = "Password is not valid";
            }
        }


        if (typeof fields["email"] !== "undefined") {
            if (!fields["email"].match(/^[\w.-]+@[a-zA-Z]+\.[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
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
                }
                if (login.status === 400) {
                    const errors = {
                        email: '',
                        password: 'Wrong email of password!'
                    }
                    this.setState({errors})
                }
                if (login.status === 500) {
                    const errors = {
                        email: '',
                        password: 'Unknown server error'
                    }
                    this.setState({errors})
                }
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

                    <span className={'login-form-spam'}>Email</span>

                    <input id={'in1'} className={'login-input'} required={true}
                           onChange={this.handleChange.bind(this, "email")}
                    />

                    <span className='login-form-spam red'>{this.state.errors.email}</span>
                    <div>
                        <span className={'login-form-spam'}>Password</span>
                        <span className="password__show" onClick={this.showHide}>
                            {this.state.type === "input" ? "Hide Password" : "Show Password"}
                     </span>
                    </div>
                    <input type={this.state.type} className="password__input" required={true}
                           onChange={this.handleChange.bind(this, "password")}
                    />

                    <span className='login-form-spam red'>{this.state.errors.password}</span>

                    <div className="wrap">
                        <button className="button">Log In</button>
                    </div>

                    <NavLink to={'/forgotPassword/emailForm/'}>
                        <span className='login-form-spam blue'>You forgot your password? Click here!</span>
                    </NavLink>
                </form>
            </div>
        );
    }
}

export default withRouter(Login);
