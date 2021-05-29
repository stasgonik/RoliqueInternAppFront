import React, {Component, useRef, useState} from 'react';
import classes from "./Create_Campaing.module.css";
import Sidebar from "../Items/Sidebar/Sidebar";
import Header from "../Items/Header/Header";
import leftArrow from "../Items/Icons/arrow-left.svg";
import info from "../Items/Icons/info-button.svg";
import Tooltip from "../Items/Tooltip/Tooltip";
import topArrow from "../Items/Icons/top-arrow-black.svg";
import {INFO} from "../../Constants/messages";
import Dropdown from "../Items/Dropdown/Dropdown";
import regexp from "../../Constants/regexp.enum";
import userService from "../../Services/userService";
import configFront from "../../Constants/configFront";
import routes from "../../Constants/routes.enum";
import AuthService from "../../Services/auth.service";
import plus from '../../img/Create_Campaing/Icon.svg';


const campaingDate = [
    {Created: '-'},
    {Updated: '-'}
]

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

const Create_Campaings = () => {

    const [isSending, setIsSending] = useState(false);
    setRoles();
    const fileInput = useRef(null);
    const [values, setValues] = useState({
        avatar: '',
        title: '',
        hashtag: '',
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
            <Sidebar/>
            <Header name={'Create'} titleHeader={classes.title}
                    titleBtn={isSending ? "Sending" : 'Save Changes'}
                    title='Сreate Campaing'
                    leftArrow={leftArrow}
                    btnHeader={isSending ? classes.btnHeaderDisabled : classes.btnHeader}
                    button={(e) => saveChanges(e)}
                    isSending={isSending}
            />

            <div className={classes.mainContainer}>
                <div className={classes.leftContainerHelper}>
                    <section className={classes.leftContainer}>
                        <h3 className={classes.general}>Basic Information</h3>

                        <label className={classes.input_title}>Title</label>
                        <input className={!values.title ? classes.input_info : classes.input_info_valid}
                               type='text'
                               name='title'
                               value={values.title}
                               onInput={(e) => handleChange(e)}
                        />

                        {errors.title && errors.title.length ?
                            <div className={classes.errorDiv}>{errors.title}</div> : ''}


                        <label className={classes.input_title}>Status</label>
                        <Dropdown required
                                  options={role}
                                  name='status'
                                  valid={!!values.role}
                                  onChange={(e) => handleChangeRole(e)}
                        />

                        {errors.role && errors.role.length ?
                            <div className={`${classes.errorDiv} ${classes.roleErrorPos}`}>
                                {errors.role}</div> : ''}

                        <label className={classes.input_title}>Effort</label>
                        <Dropdown required
                                  options={role}
                                  name='Effort'
                                  valid={!!values.role}
                                  onChange={(e) => handleChangeRole(e)}
                        />

                        {errors.role && errors.role.length ?
                            <div className={`${classes.errorDiv} ${classes.roleErrorPos}`}>
                                {errors.role}</div> : ''}

                        <div className={classes.wrapper}>
                            <div className={classes.wrapperColumn}>
                                <label className={classes.input_title}>Start Date</label>
                                <Dropdown required
                                          options={role}
                                          name='status'
                                          valid={!!values.role}
                                          onChange={(e) => handleChangeRole(e)}
                                />
                            </div>
                            <div className={classes.wrapperColumn}>
                                <label className={classes.input_title}>End Date</label>
                                <Dropdown required
                                          className={classes.DropDown}
                                          options={role}
                                          name='status'
                                          valid={!!values.role}
                                          onChange={(e) => handleChangeRole(e)}
                                />
                            </div>
                        </div>

                        <label className={classes.input_title}>Hashtags</label>
                        <input className={!values.hashtag ? classes.input_info : classes.input_info_valid}
                               type='text'
                               name='hashtag'
                               value={values.hashtag}
                               onInput={(e) => handleChange(e)}
                        />

                        {errors.title && errors.title.length ?
                            <div className={classes.errorDiv}>{errors.title}</div> : ''}

                        <div className={classes.checkBoxDiv}>
                            <input
                                type='checkbox'
                                className={classes.customCheckbox}
                                id='check1'
                            />
                            <label for='check1' className={classes.input_title}>Campaign won’t have a hashtag</label>
                        </div>

                    </section>

                    <section className={classes.leftContainer}>
                        <div>
                            <h3 className={classes.rightContainer_title}>Client</h3>

                            <label className={classes.input_title}>Brand</label>
                            <Dropdown required
                                      options={role}
                                      name='status'
                                      valid={!!values.role}
                                      onChange={(e) => handleChangeRole(e)}
                            />

                            {errors.role && errors.role.length ?
                                <div className={`${classes.errorDiv} ${classes.roleErrorPos}`}>
                                    {errors.role}</div> : ''}

                            <div className={classes.flexRow}>
                                <img src={plus} alt={'plus'}/>
                                <label className={classes.orangeText}>Add New Brand</label>
                            </div>

                        </div>
                    </section>
                </div>


                <section className={classes.rightContainer}>
                    <div className={classes.role}>
                        <h3 className={classes.rightContainer_title}>Roles</h3>
                    </div>
                    <label className={classes.input_title}>Team Lead</label>
                    <Dropdown required
                              options={role}
                              name='status'
                              valid={!!values.role}
                              onChange={(e) => handleChangeRole(e)}
                    />

                    <div className={classes.role}>
                        <h3 className={classes.rightContainer_title}>Misc.</h3>
                    </div>
                    <p className={classes.profile}>Campaign Logo</p>
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

                    <label className={classes.input_title}>Client Description</label>
                    <input className={classes.textarea} type='textarea'/>

                    <label className={classes.input_title}>Internal Notes</label>
                    <input className={classes.textarea} type='textarea'/>

                    <label className={classes.input_title}>Campaign Created</label>
                    <div>
                        {
                            campaingDate.map(value => value.Created)
                        }
                    </div>

                    <label className={classes.input_title}>Last Campaign Update</label>
                    <div>
                        {
                            campaingDate.map(value => value.Updated)
                        }
                    </div>

                </section>


            </div>
        </form>
    );
}

export default Create_Campaings;
