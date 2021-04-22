import React, {Component} from 'react';
import './forgotPassEmailForm.css'
import EmailService from "../../Services/email.service";

class ForgotPassEmailForm extends Component {

    state = {
        fields: {
            email: '',
        },
        errors: {
            email: ''
        },
        success: false
    };

    myForm = React.createRef();

    handleValidation() {
        const fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (typeof fields["email"] !== "undefined") {
            if (!fields["email"].match(/^[\w.-]+@[a-zA-Z]+\.[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            }
        }

        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "Cannot be empty";
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    send = async (e) => {
        e.preventDefault();
        try {
            const body = this.state.fields;

            console.log(body)

            if (this.handleValidation()) {
                const result = await EmailService.sendForgotPasswordEmail(body);

                if (result.status === 200) {
                    // this.props.history.push('forgotPassword/notify/')
                    // window.location.href = configFront.URL + 'forgotPassword/notify/';
                    this.setState({success: true})
                }
                if (result.status === 400) {
                    const errors = {
                        email: 'Email is not valid'
                    }
                    this.setState({errors})
                }
                if (result.status === 500) {
                    const errors = {
                        email: 'Unknown server error'
                    }
                    this.setState({errors})
                }
            }


        } catch (e) {
            console.log(e);
        }
    };


    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({fields});
    }

    render() {
        return (
            <div>
                {!this.state.success ?
                    <div className={'main-flex-login'}>
                        <form className={'login-form'} onSubmit={this.send} ref={this.myForm}>
                            <h3 className={'login-form-h3'}>We need your email to change your password</h3>

                            <span className={'login-form-spam'}>Email</span>

                            <input id={'in1'} className={'login-input'}
                                   onChange={this.handleChange.bind(this, "email")}
                                   value={this.state.fields["email"]}
                                   required={true}/>

                            <span className='login-form-spam red'>{this.state.errors["email"]}</span>

                            <div className="wrap">
                                <button className="button">Send</button>
                            </div>
                        </form>
                    </div>
                    :
                    <div className={'main-flex-login'}>
                        <form className={'login-form'} onSubmit={this.send} ref={this.myForm}>
                            <div>
                                <span className='login-form-spam red'>Please check your email, we send special link to it.</span>
                            </div>
                        </form>
                    </div>}

                {/*<h3 className={'login-form-h3'}>We need your email to change your password</h3>*/}

                {/*<span className={'login-form-spam'}>Email</span>*/}

                {/*<input id={'in1'} className={'login-input'}*/}
                {/*       onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]}*/}
                {/*       required={true} />*/}

                {/*<span  className='login-form-spam red'>{this.state.errors["email"]}</span>*/}

                {/*<div className="wrap">*/}
                {/*    <button className="button">Send</button>*/}
                {/*</div>*/}
                {/*    </form>*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default ForgotPassEmailForm;
