import React, {Component} from 'react';
import './forgotPassForm.css'
import configFront from "../../Constants/config";
import userService from "../../Services/userService";
import {NavLink} from "react-router-dom";
import {INFO} from "../../Constants/messages";


class ForgotPassForm extends Component {

    state = {
        fields: {
            password: '',
            confirmPassword: ''
        },
        errors: '',
        type: 'input',
        token: '',
    };

    constructor(props) {
        super(props);
        const search = props.location.search;
        const params = new URLSearchParams(search);
        const token = params.get('token');
        if (!token) {
            window.location.href = configFront.URL;
        }
        this.setState({token})
        this.showHide = this.showHide.bind(this);
    }

    showHide(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            type: this.state.type === "input" ? "password" : "input"
        });
    }

    myForm = React.createRef();

    handleValidation() {
        const fields = this.state.fields;
        let errors = '';
        let formIsValid = true;

        if (typeof fields["password"] !== "undefined") {
            if (!fields["password"].match(/^(?=.*[A-Za-z])(?=.*\d)([A-Za-z\d@$!%*#?&]?){4,50}$/)) {
                formIsValid = false;
                errors = INFO.INVALID_PASSWORD_PATTERN;
            }
        }

        if (fields["confirmPassword"] !== fields["password"]) {
            formIsValid = false;
            errors = INFO.CONFIRM_MUST_BE_SAME;
        }

        if (!fields["password"]) {
            formIsValid = false;
            errors = INFO.EMPTY_FIELD;
        }

        if (!fields["confirmPassword"]) {
            formIsValid = false;
            errors = INFO.EMPTY_FIELD;
        }

        this.setState({errors});
        return formIsValid;
    }

    send = async (e) => {
        e.preventDefault();
        try {
            const search = this.props.location.search;
            const params = new URLSearchParams(search);
            const token = params.get('token');
            if (!token) {
                window.location.href = configFront.URL;
            }
            const body = {password: this.state.fields['password'], forgot_token: token}

            if (this.handleValidation()) {
                const result = await userService.changePassword(body);
                if (result.status === 200) {
                    window.location.href = configFront.URL;
                }
                if (result.status === 400) {
                    this.setState({errors: INFO.TOKEN_EXPIRE});
                }
                if (result.status === 500) {
                    this.setState({errors: INFO.SERVER_ERROR});
                    console.log(result);
                }
                this.setState({errors: INFO.UNKNOWN_ERROR})
                console.log(result);
            }

        } catch (e) {
            console.log(e);
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
            <div>
                <div className={'main-flex-login'}>
                        <form className={'login-form'} onSubmit={this.send} ref={this.myForm}>
                            <h3 className={'login-form-h3'}>Please set new password</h3>

                            <div>
                        <span className="password__show" onClick={this.showHide}>
                    {this.state.type === "input" ? "Hide Password" : "Show Password"}
                        </span>
                                <span className={'login-form-spam'}>Password</span>
                            </div>

                            <input id={'in1'} className={'password__input'} required={true}
                                   type={this.state.type}
                                   onChange={this.handleChange.bind(this, "password")}
                                   value={this.state.fields["password"]}/>

                            <span className={'login-form-spam'}>Confirm Password</span>

                            <input id={'in2'} className={'password__input'} required={true}
                                   type={this.state.type}
                                   onChange={this.handleChange.bind(this, "confirmPassword")}
                                   value={this.state.fields["confirmPassword"]}/>

                            <div className="wrap">
                                <button className="button">Send</button>
                            </div>
                        </form>
                    </div>
            </div>
        );
    }
}

export default ForgotPassForm;
