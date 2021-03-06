import React, {Component} from 'react';

import EmailService from "../../Services/email.service";
import Error from "../Items/Messages/Messages";
import './forgotPassEmailForm.css'
import {INFO} from '../../Constants/messages';
import regexp from '../../Constants/regexp.enum'

class ForgotPassEmailForm extends Component {
    state = {
        fields: {
            email: '',
        },
        errors: '',
        success: false,
        isSending: false
    };

    myForm = React.createRef();

    handleValidation() {
        const fields = this.state.fields;
        this.setState({success: false})
        let errors = '';
        let formIsValid = true;

        if (typeof fields["email"] !== "undefined") {
            if ((!fields["email"]) || (!fields["email"].match(regexp.EMAIL_REGEXP))) {
                formIsValid = false;
                errors = INFO.INVALID_EMAIL;
            }
        }

        this.setState({errors});
        if (!formIsValid) {
            this.setState({isSending: false})
        }
        return formIsValid;
    }

    send = async (e) => {
        e.preventDefault();
        this.setState({isSending: true})
        try {
            const body = this.state.fields;

            if (this.handleValidation()) {
                const result = await EmailService.sendForgotPasswordEmail(body);
                if (result) {
                    this.setState({isSending: false})
                }

                if (result.status === 200) {
                    this.setState({success: true})
                    return
                }

                if (result.status === 400) {
                    this.setState({errors: INFO.INVALID_EMAIL});
                    return
                }

                if (result.status === 500) {
                    this.setState({errors: INFO.SERVER_ERROR})
                    console.log(result)
                    return
                }

                this.setState({errors: INFO.UNKNOWN_ERROR})
                console.log(result)
                return
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
                <div className={'main-flex-login'}>
                    <form className={'login-form'} onSubmit={this.send} ref={this.myForm}>
                        <h3 className={'login-form-h3'}>Write your email</h3>

                        {this.state.errors ?
                            <Error color={{backgroundColor: '#FEEFEF', marginLeft: '32px', marginBottom: '24px'}}
                                   colorRound={'colorRound ErrorColor'} className={'ErrorPosition'}
                                   message={this.state.errors}/> : ''}

                        {this.state.success ?
                            <Error color={{backgroundColor: '#EDF9F0', marginLeft: '32px', marginBottom: '24px'}}
                                   colorRound={'colorRound SuccessColor'} className={'ErrorPosition'}
                                   message={INFO.SUCCESS_EMAIL_FORGOT}/> : ''}


                        <span className={'login-form-spam'}>Email</span>

                        <input id={'in1'} className={'loginInput'}
                               onChange={this.handleChange.bind(this, "email")}
                               value={this.state.fields["email"]}
                               required={true}/>

                        <div className="wrapMain">
                            <button className={this.state.isSending? "buttonSend disabled" : "buttonSend"} disabled={!!this.state.isSending}>{this.state.isSending? 'Sending' : 'Send'}</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default ForgotPassEmailForm;
