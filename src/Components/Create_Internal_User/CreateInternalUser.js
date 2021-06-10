import React, {useRef, useState} from 'react';

import AuthService from "../../Services/auth.service";
import classes from './CreateInternalUser.module.css';
import configFront from "../../Constants/configFront";
import Dropdown from '../Items/Dropdown/Dropdown';
import Header from '../Items/Header/Header';
import info from '../Items/Icons/info-button.svg';
import {INFO} from '../../Constants/messages';
import leftArrow from '../Items/Icons/arrow-left.svg';
import regexp from '../../Constants/regexp.enum';
import routes from "../../Constants/routes.enum";
import Sidebar from '../Items/Sidebar/Sidebar';
import Tooltip from '../Items/Tooltip/Tooltip'
import topArrow from '../Items/Icons/top-arrow-black.svg';
import userService from "../../Services/userService";
import Input from '../Items/Input/Input';

let role = [
    {value: 'admin', label: 'Admin'},
    {value: 'manager', label: 'Manager'},
    {value: 'employee', label: 'Employee'},
];

function setRoles() {
    const user_role = AuthService.getUserRole();
    if (user_role === 'employee') {
        role = [
            {value: 'employee', label: 'Employee'}
        ];
    }
    if (user_role === 'manager') {
        role = [
            {value: 'manager', label: 'Manager'},
            {value: 'employee', label: 'Employee'}
        ];
    }
    return role;
}

const User = () => {
    const [isSending, setIsSending] = useState(false);
    setRoles();
    const fileInput = useRef(null);
    const [values, setValues] = useState({
        avatar: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        role: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        avatar: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        role: '',
        password: '',
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setValues({...values, [e.target.name]: value});

    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleChangeRole = (e) => {

        const value = e.value;
        setValues({...values, role: value})
    };

    const selected = (e) => {
        let img = e.target.files[0];
        if (!img) {
            setValues({...values, avatar: ''})
            return
        }
        img.preview = URL.createObjectURL(img)
        setValues({...values, [e.target.name]: img})
    }

    const handleValidation = () => {
        let errors = {
            avatar: '',
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            role: '',
            password: '',
        };
        let formIsValid = true;

        if (typeof values["password"] !== "undefined") {
            if (!values["password"].match(regexp.PASSWORD_REGEXP)) {
                formIsValid = false;
                errors["password"] = INFO.INVALID_PASSWORD_PATTERN
            }
        }

        if (!values["password"] || !values["password"].length) {
            formIsValid = false;
            errors["password"] = INFO.EMPTY_FIELD
        }

        if (typeof values["email"] !== "undefined") {
            if (!values["email"].match(regexp.EMAIL_REGEXP)) {
                formIsValid = false;
                errors["email"] = INFO.INVALID_EMAIL_PATTERN
            }
        }

        if (!values["email"] || !values["email"].length) {
            formIsValid = false;
            errors["email"] = INFO.EMPTY_FIELD
        }

        if (typeof values["first_name"] !== "undefined") {
            if (!values["first_name"].match(regexp.FIRST_LAST_NAME_REGEXP)) {
                formIsValid = false;
                errors["first_name"] = INFO.INVALID_NAME_PATTERN
            }
        }

        if (!values["first_name"] || !values["first_name"].length) {
            formIsValid = false;
            errors["first_name"] = INFO.EMPTY_FIELD
        }

        if (typeof values["last_name"] !== "undefined") {
            if (!values["last_name"].match(regexp.FIRST_LAST_NAME_REGEXP)) {
                formIsValid = false;
                errors["last_name"] = INFO.INVALID_NAME_PATTERN
            }
        }

        if (!values["last_name"] || !values["last_name"].length) {
            formIsValid = false;
            errors["last_name"] = INFO.EMPTY_FIELD
        }

        if (!values["role"] || !values["role"].length) {
            formIsValid = false;
            errors["role"] = INFO.EMPTY_FIELD
        }

        if (typeof values["phone"] !== "undefined" && values["phone"] && values["phone"].length) {
            if (!values["phone"].match(regexp.PHONE_REGEXP)) {
                formIsValid = false;
                errors["phone"] = INFO.INVALID_PHONE_PATTERN
            }
        }

        setErrors(errors);
        if (!formIsValid) {
            setIsSending(false)
        }
        return formIsValid;
    }

    const saveChanges = async () => {
        setIsSending(true)
        const formData = new FormData();
        if (!values["phone"].length) {
            delete values["phone"]
        }

        if (values["avatar"] === "") {
            delete values["avatar"]
        }

        for (const value in values) {
            formData.append(value, values[value])
        }

        let av = values["avatar"] ? values['avatar'] : "";
        setValues({...values, phone: '', avatar: av})



        if (handleValidation()) {
            const result = await userService.postUsers(formData);
            if (result) {
                setIsSending(false)
                if (result.status === 200) {
                    window.location.href = configFront.URL + `${routes.USERS}`;
                    return
                }

                let errors = {
                    avatar: '',
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone: '',
                    role: '',
                    password: '',
                };

                if (result.status === 403) {
                    window.location.href = configFront.URL + `${routes.USERS}`;
                    return
                }

                if (typeof result.data !== "undefined") {
                    if (result.data.customCode === 4000) {
                        errors["email"] = INFO.DATA_INCORRECT
                        setErrors(errors);
                        return
                    }
                    if (result.data.customCode === 4002) {
                        errors["email"] = INFO.EMAIL_ALREADY_EXIST
                        setErrors(errors);
                        return
                    }
                    if (result.data.customCode === 4005) {
                        errors["avatar"] = INFO.TOO_BIG_PHOTO
                        setErrors(errors);
                        return
                    }
                }

                if (result.status === 500) {
                    errors["email"] = INFO.SERVER_ERROR
                    setErrors(errors);
                    console.log(result);
                    return
                }

                if (result.status !== 200) {
                    errors["email"] = INFO.UNKNOWN_ERROR
                    setErrors(errors);
                    console.log(result);
                    return
                }
            }
        }
    }


    return (
        <form className={classes.mainBlock} onSubmit={(e) => handleSubmit(e)}>
            <Header name={'Create'} titleHeader={classes.title}
                    titleBtn={isSending? "Sending" : 'Save Changes'}
                    title='Create Internal User'
                    leftArrow={leftArrow}
                    btnHeader={isSending? classes.btnHeaderDisabled : classes.btnHeader}
                    button={(e) => saveChanges(e)}
                    isSending={isSending}
            />

            <div className={classes.mainContainer}>
                <section className={classes.leftContainer}>
                    <h3 className={classes.general}>General</h3>
                    <p className={classes.profile}>Profile Picture</p>
                    <input type='file'
                           name='avatar'
                           className={classes.avatarPhoto}
                           style={{display: 'none'}}
                           onChange={(e) => selected(e)}
                           ref={fileInput}

                    />
                    <button className={classes.avatar} onClick={() => fileInput.current.click()}>
                        {values.avatar ? <img src={values.avatar.preview} style={{
                            width: 64,
                            height: 64,
                            borderRadius: 50
                        }} alt={'alt'}/> : '+'}
                    </button>

                    {errors.avatar && errors.avatar.length ?
                        <div className={classes.errorDiv}>{errors.avatar}</div> : ''}

                   <Input type='text'
                          name='first_name'
                          label='First Name'
                          className={!values.first_name ? classes.inputInfo : `${classes.inputInfo} ${classes.inputInfoInvalid}`}
                          value={values.first_name}
                          onInput={(e) => handleChange(e)}
                         />


                    {errors.first_name && errors.first_name.length ?
                        <div className={classes.errorDiv}>{errors.first_name}</div> : ''}

                    <Input type='text'
                           name='last_name'
                           label='Last Name'
                           className={!values.last_name ? classes.inputInfo : `${classes.inputInfo} ${classes.inputInfoInvalid}`}
                           value={values.last_name}
                           onInput={(e) => handleChange(e)}
                    />

                    {errors.last_name && errors.last_name.length ?
                        <div className={classes.errorDiv}>{errors.last_name}</div> : ''}

                    <Input type='text'
                           name='email'
                           label='Email'
                           className={!values.email ? classes.inputInfo : `${classes.inputInfo} ${classes.inputInfoInvalid}`}
                           value={values.email}
                           onInput={(e) => handleChange(e)}
                    />

                    {errors.email && errors.email.length ?
                        <div className={classes.errorDiv}>{errors.email}</div> : ''}

                    <Input type='number'
                           name='phone'
                           label='Phone'
                           className={`${classes.inputInfo} ${classes.inputInfoInvalid}`}
                           value={values.phone}
                           onInput={(e) => handleChange(e)}
                    />

                    {errors.phone && errors.phone.length ?
                        <div className={classes.errorDiv}>{errors.phone}</div> : ''}

                </section>
                <section className={classes.rightContainer}>
                    <div className={classes.role}>

                        <h3 className={classes.rightContainer_title}>Role & Permissions</h3>
                        <img src={info} alt="info" className={classes.infoBtn}/>
                        <div className={classes.tooltip}>
                            <Tooltip align='center' Arrow={topArrow} text={INFO.message}/>
                        </div>
                    </div>

                    <Dropdown required
                              label='Role'
                              options={role}
                              name='role'
                              valid={!!values.role}
                              onChange={(e) => handleChangeRole(e)}
                    />

                    {errors.role && errors.role.length ?
                        <div className={`${classes.errorDiv} ${classes.roleErrorPos}`}>
                            {errors.role}</div> : ''}

                    <h3 className={`${classes.rightContainer_title} ${classes.rightContainer_title_password}`}>Password</h3>

                    <Input type='text'
                           name='password'
                           label='Set Password'
                           className={!values.password ? classes.inputInfo : `${classes.inputInfo} ${classes.inputInfoInvalid}`}
                           value={values.password}
                           onInput={(e) => handleChange(e)}
                    />

                    {errors.password && errors.password.length ?
                        <div className={classes.errorDiv}>{errors.password}</div> : ''}

                </section>
            </div>
        </form>
    )
}

export default User;
