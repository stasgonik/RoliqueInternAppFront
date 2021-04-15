import React, {Component} from 'react';
import './forgotPassNotify.css'


class ForgotPassNotify extends Component {

    render() {
        return (
            <div className={'main-flex-login'}>
                <div className={'login-form'} >
                    <h3 className={'login-form-h3'}>Please check your email</h3>
                    <span className='login-form-spam green'>We send special link to it for you to gain new password</span>
                </div>
            </div>
        );
    }
}

export default ForgotPassNotify;
