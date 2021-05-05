import React, {useEffect, useRef, useState} from 'react';
import classes from './EditInternalUser.module.css';
import info from '../Items/Icons/info-button.svg';
import Tooltip from '../Items/Tooltip/Tooltip'
import {INFO} from '../../Constants/messages';
import Dropdown from '../Items/Dropdown/Dropdown';
import Header from '../Items/Header/Header';
import Sidebar from '../Items/Sidebar/Sidebar'
import leftArrow from '../Items/Icons/arrow-left.svg';
import {EMAIL_REGEXP, FIRST_LAST_NAME_REGEXP, PASSWORD_REGEXP, PHONE_REGEXP} from '../../Constants/regexp.enum';
import userService from "../../Services/userService";
import authService from '../../Services/auth.service';
import config from '../../Constants/configServer'
import topArrow from "../Items/Icons/top-arrow-black.svg";


let role = [
    {value: 'admin', label: 'Admin'},
    {value: 'manager', label: 'Manager'},
    {value: 'employee', label: 'Employee'}
];

function setRoles() {
    const user_role = authService.getUserRole();
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

const EditUser = () => {
    setRoles()

    const [user, setUser] = useState(async () => {
        const initialState = await userService.getSingleUsers(authService.getEditId())
        setUser({
            first_name: initialState.first_name,
            last_name: initialState.last_name,
            email: initialState.email,
            phone: initialState.phone,
            role: initialState.role.charAt(0).toUpperCase()+initialState.role.slice(1),
            profile_picture: initialState.profile_picture
        })
    });


    const fileInput = useRef(null);
    const [values, setValues] = useState({});

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
        if (img) {
            img.preview = URL.createObjectURL(img)
            setValues({...values, [e.target.name]: img})
            setUser({...user, [e.target.name]: img})
        }
    }

    const saveChanges = async () => {
        const formData = new FormData();
        for (const value in values) {
            formData.append(value, values[value])
        }

        await userService.editUser(formData, authService.getEditId());
    }

    const path = user.profile_picture;

    return (

        <form name={'myForm'} className={classes.mainBlock} onSubmit={(e) => handleSubmit(e)}>
            <Sidebar/>
            <Header name={'Edit'}
                    titleHeader={classes.title}
                    title='Edit User'
                    titleBtn='Save Changes'
                    leftArrow={leftArrow}
                    btnHeader={classes.btnHeader}
                    button={(e) => saveChanges(e)}/>
            <div className={classes.mainContainer}>
                <section className={classes.leftContainer}>
                    <h3 className={classes.general}>General</h3>
                    <p className={classes.profile}>Profile Picture</p>
                    <input type='file'
                           name='profile_picture'
                           style={{display: 'none'}}
                           onChange={(e) => selected(e)}
                           ref={fileInput}
                    />
                    {/*{config.URL + user.profile_picture}*/}
                    <button className={classes.avatar} onClick={() => fileInput.current.click()}>
                        {!user.profile_pictures ? <img
                            src={typeof user.profile_picture === 'object' ? user.profile_picture.preview : `${path}`}
                            style={{
                                width: 64,
                                height: 64,
                                borderRadius: 50,
                            }} alt={'alt'}/> : '+'}
                    </button>

                    <label className={classes.input_title}>First Name</label>
                    <input className={classes.input_info}
                           type='text'
                           name='first_name'
                           //pattern={FIRST_LAST_NAME_REGEXP}
                           defaultValue={user.first_name}
                           onChange={(e) => handleChange(e)}
                    />

                    <label className={classes.input_title}>Last Name</label>
                    <input className={classes.input_info}
                           type='text'
                           name='last_name'
                           defaultValue={user.last_name}
                           //pattern={FIRST_LAST_NAME_REGEXP}
                           onChange={(e) => handleChange(e)}/>


                    <label className={classes.input_title}>Email</label>
                    <input className={classes.input_info}
                           type='email'
                           name='email'
                           defaultValue={user.email}
                           //pattern={EMAIL_REGEXP}
                           onChange={(e) => handleChange(e)}/>

                    <label className={classes.input_title}>Phone</label>
                    <input className={`${classes.input_info} ${classes.phone}`}
                           type='text'
                           name='phone'
                           defaultValue={user.phone}
                           //pattern={PHONE_REGEXP}
                           onChange={(e) => handleChange(e)}/>

                </section>


                <section className={classes.rightContainer}>
                    <div className={classes.role}>

                        <h3 className={classes.rightContainer_title}>Role & Permissions</h3>
                        <img src={info} alt="info" className={classes.infoBtn}/>
                        <div className={classes.tooltip}>
                            <Tooltip align='center'  Arrow={topArrow} text={INFO.message}/>
                        </div>
                    </div>

                    <label className={classes.input_title}>Role</label>
                    <Dropdown options={role}
                              valid={user.role}
                              name='role'
                              defaultValue={user.role}
                              onChange={(e) => handleChangeRole(e)}/>

                    <h3 className={`${classes.rightContainer_title} ${classes.rightContainer_title_password}`}>Password</h3>
                    <label className={`${classes.input_title} ${classes.input_password}`}>New Password</label>
                    <input className={`${classes.input_info}`}
                           type='text'
                           name='password'
                           //pattern={PASSWORD_REGEXP}
                           onChange={(e) => handleChange(e)}/>

                </section>

            </div>
        </form>
    )
}

export default EditUser;
