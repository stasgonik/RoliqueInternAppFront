import React, {Component} from 'react';

import configFront from "../../Constants/configFront";
import Error from "../Items/Messages/Messages";
import './forgotPassForm.css'
import {INFO} from "../../Constants/messages";
import regexp from '../../Constants/regexp.enum'
import userService from "../../Services/userService";

class ForgotPassForm extends Component {

    state = {
        fields: {
            password: '',
            confirmPassword: ''
        },
        errors: '',
        type: 'password',
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
            if (!fields["password"].match(regexp.PASSWORD_REGEXP)) {
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
                    return
                }
                if (result.status === 400) {
                    this.setState({errors: INFO.TOKEN_EXPIRE});
                    return
                }
                if (result.status === 500) {
                    this.setState({errors: INFO.SERVER_ERROR});
                    console.log(result);
                    return
                }
                this.setState({errors: INFO.UNKNOWN_ERROR})
                console.log(result);
                return
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

                        {this.state.errors ?
                            <Error color={{backgroundColor: '#FEEFEF', marginLeft: '32px', marginBottom: '24px'}}
                                   colorRound={'colorRound ErrorColor'} className={'ErrorPosition'}
                                   message={this.state.errors}/> : ''}

                        <div className={'PasswordForm'}>
                            <span className={'login-form-spam'}>Password</span>
                            <span className="login-form-spam clickPassword" onClick={this.showHide}>
                            {this.state.type === "input" ? "Hide Password" : "Show Password"}</span>
                        </div>

                        <input id={'in1'} className={'password__input'} required={true}
                               type={this.state.type}
                               onChange={this.handleChange.bind(this, "password")}
                               value={this.state.fields["password"]}/>

                        <div className={'PasswordForm'}>
                            <span className={'login-form-spam'}>Confirm Password</span>
                        </div>

                        <input id={'in2'} className={'password__input'} required={true}
                               type={this.state.type}
                               onChange={this.handleChange.bind(this, "confirmPassword")}
                               value={this.state.fields["confirmPassword"]}/>

                        <div className="wrapMain">
                            <button className="buttonSend">Send</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default ForgotPassForm;
