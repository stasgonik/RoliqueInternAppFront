import React, {Component, useEffect, useState} from 'react';
import {NavLink, withRouter, useHistory} from "react-router-dom";

import AuthService from '../../Services/auth.service'
import './login.css'
import Error from '../Items/Messages/Messages';
import {INFO} from '../../Constants/messages'
import regexp from '../../Constants/regexp.enum';
import routes from "../../Constants/routes.enum";

const Login = () => {

    const history = useHistory();

    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState('')
    const [type, setType] = useState('password')
    const [isSending, setIsSending] = useState(false)

    const handleValidation = () => {
        let formIsValid = true;
        setError('')

        if ((typeof values.password !== "undefined") || (typeof values.email !== "undefined")) {
            if (!values.password.match(regexp.PASSWORD_REGEXP) || !values.email.match(regexp.EMAIL_REGEXP)) {
                formIsValid = false;
                setError(INFO.INVALID_EMAIL_OR_PASSWORD)
                setIsSending(false)
            }
        }

        return formIsValid;
    }

    const showHide = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const newType = type === 'input' ? "password" : "input"
        setType(newType)
    }

    const send = async (e) => {
        e.preventDefault();
        setIsSending(true)
        try {

            const body = {
                email: values.email,
                password: values.password
            }

            if (handleValidation()) {
                const login = await AuthService.login(body);
                if (login) {
                    setIsSending(false)
                }
                if (login.status === 200) {
                    console.log("AAA")
                    history.push(`/${routes.USERS}`)
                    return
                }
                if (login.status === 400) {
                    setError(INFO.INVALID_EMAIL_OR_PASSWORD)
                    return
                }
                if (login.status === 500) {
                    setError(INFO.SERVER_ERROR)
                    console.log(login)
                    return
                }
                setError(INFO.UNKNOWN_ERROR)
                console.log(login)
            }

        } catch (e) {
            console.log(e)
        }
    };

    const handleChange = (e, field) => {
        e.preventDefault();
        values[field] = e.target.value;
        setValues({...values})
    }

    return (
        <div className={'main-flex-login'}>
            <form className={'login-form'} onSubmit={(e) => send(e)}>

                <h3 className={'login-form-h3'}>Log into your account</h3>

                {error ?
                    <Error color={{backgroundColor: '#FEEFEF', marginLeft: '32px', marginBottom: '24px'}}
                           colorRound={'colorRound'} className={'ErrorPosition'} message={error}/> : ''}
                <span className={'login-form-spam'}>Email</span>

                <input id={'in1'} className={'loginInput'} required={true}
                       onInput={(e) => handleChange(e, 'email')}
                />

                <div className={'PasswordForm'}>
                    <span className={'login-form-spam'}>Password</span>
                    <span className="login-form-spam clickPassword" onClick={(e) => showHide(e)}>
                            {type === "input" ? "Hide Password" : "Show Password"}
                     </span>
                </div>
                <input type={type} className="password__input" required={true}
                       onInput={(e) => handleChange(e, 'password')}
                />

                <div className="wrap">
                    <button className={isSending? "button disabled" : "button"} disabled={!!isSending}>{isSending? 'Sending' : 'Log In'}</button>
                </div>

                <NavLink to={`/${routes.FORGOT_PASSWORD}/${routes.EMAIL_FORM}`}>
                    <p className='login-form-spam blue'>You forgot your password? Click here!</p>
                </NavLink>
            </form>
        </div>
    );

}

export default withRouter(Login);
