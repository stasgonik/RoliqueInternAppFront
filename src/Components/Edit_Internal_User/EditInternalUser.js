import React, {useRef, useState} from 'react';
import {
	useParams
} from "react-router-dom";

import authService from '../../Services/auth.service';
import classes from './EditInternalUser.module.css';
import configFront from "../../Constants/configFront";
import Dropdown from '../Items/Dropdown/Dropdown';
import Header from '../Items/Header/Header';
import info from '../Items/Icons/info-button.svg';
import {INFO} from '../../Constants/messages';
import leftArrow from '../Items/Icons/arrow-left.svg';
import routes from "../../Constants/routes.enum";
import Sidebar from '../Items/Sidebar/Sidebar'
import Tooltip from '../Items/Tooltip/Tooltip'
import topArrow from "../Items/Icons/top-arrow-black.svg";
import userService from "../../Services/userService";
import regexp from "../../Constants/regexp.enum";

// import {EMAIL_REGEXP, FIRST_LAST_NAME_REGEXP, PASSWORD_REGEXP, PHONE_REGEXP} from '../../Constants/regexp.enum';

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
	const params = useParams();
	if (!params[routes.USER_ID]) {
		window.location.href = configFront.URL + `${routes.USERS}`
	}

	const [user, setUser] = useState(async () => {
		const initialState = await userService.getSingleUser(params[routes.USER_ID])
		if (initialState) {
			setUser({
				first_name: initialState.first_name,
				last_name: initialState.last_name,
				email: initialState.email,
				phone: initialState.phone,
				role: initialState.role.charAt(0).toUpperCase() + initialState.role.slice(1),
				profile_picture: initialState.profile_picture
			})
		}
	});

	const fileInput = useRef(null);
	const [values, setValues] = useState({});

	//
	const [errors, setErrors] = useState({
		avatar: '',
		first_name: '',
		last_name: '',
		email: '',
		phone: '',
		role: '',
		password: ''
	});
	const handleValidation = () => {
		let errors = {
			avatar: '',
			first_name: '',
			last_name: '',
			email: '',
			phone: '',
			role: '',
			password: ''
		};
		let formIsValid = true;


		if (typeof values["email"] !== "undefined") {
			if (!values["email"].match(regexp.EMAIL_REGEXP)) {
				formIsValid = false;
				errors["email"] = INFO.INVALID_EMAIL_PATTERN
			}

			if (!values["email"] || !values["email"].length) {
				formIsValid = false;
				errors["email"] = INFO.EMPTY_FIELD
			}
		}


		if (typeof values["first_name"] !== "undefined") {
			if (!values["first_name"].match(regexp.FIRST_LAST_NAME_REGEXP)) {
				formIsValid = false;
				errors["first_name"] = INFO.INVALID_NAME_PATTERN
			}

			if (!values["first_name"] || !values["first_name"].length) {
				formIsValid = false;
				errors["first_name"] = INFO.EMPTY_FIELD
			}

		}


		if (typeof values["last_name"] !== "undefined") {
			if (!values["last_name"].match(regexp.FIRST_LAST_NAME_REGEXP)) {
				formIsValid = false;
				errors["last_name"] = INFO.INVALID_NAME_PATTERN
			}

			if (!values["last_name"] || !values["last_name"].length) {
				formIsValid = false;
				errors["last_name"] = INFO.EMPTY_FIELD
			}
		}



		if (typeof values["phone"] !== "undefined" && values["phone"] && values["phone"].length) {
			if (!values["phone"].match(regexp.PHONE_REGEXP)) {
				formIsValid = false;
				errors["phone"] = INFO.INVALID_PHONE_PATTERN
			}
		}
		if (typeof values["password"] !== "undefined" && (values["password"] && values["password"].length)) {
			if (!values["password"].match(regexp.PASSWORD_REGEXP)) {
				formIsValid = false;
				errors["password"] = INFO.INVALID_PASSWORD_PATTERN
			}
		}

		setErrors(errors);
		return formIsValid;
	}


	const handleChange = (e) => {
		const value = e.target.value;
		setValues({...values, [e.target.name]: value});
	};

	const handleSubmit = (e) => {
		e.preventDefault()
	};

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
		//
		// const result = await userService.editUser(formData, params[routes.USER_ID]);
		// if (result) {
		//     if (result.status === 200) {
		//         window.location.href = configFront.URL + `${routes.USERS}`
		//     }
		// }

		if (handleValidation()) {
			const result = await userService.editUser(formData, params[routes.USER_ID]);
			if (result) {
				if (result.status === 200) {
					window.location.href = configFront.URL + `${routes.USERS}`;
				}

				let errors = {
					avatar: '',
					first_name: '',
					last_name: '',
					email: '',
					phone: '',
					role: '',
					password: ''
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
					// if (result.data.customCode === 4002) {
					//     errors["email"] = INFO.EMAIL_ALREADY_EXIST
					//     setErrors(errors);
					//     return
					// }
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

				// errors["email"] = INFO.UNKNOWN_ERROR
				setErrors(errors);
				console.log(result);
			}
		}
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

					{errors.avatar && errors.avatar.length ?
						<div className={classes.errorDiv}>{errors.avatar}</div> : ''}

					<label className={classes.input_title}>First Name</label>
					<input className={classes.input_info}
						   type='text'
						   name='first_name'
						//pattern={FIRST_LAST_NAME_REGEXP}
						   defaultValue={user.first_name}
						   onChange={(e) => handleChange(e)}
					/>
					{errors.first_name && errors.first_name.length ?
						<div className={classes.errorDiv}>{errors.first_name}</div> : ''}

					<label className={classes.input_title}>Last Name</label>
					<input className={classes.input_info}
						   type='text'
						   name='last_name'
						   defaultValue={user.last_name}
						//pattern={FIRST_LAST_NAME_REGEXP}
						   onChange={(e) => handleChange(e)}/>
					{errors.last_name && errors.last_name.length ?
						<div className={classes.errorDiv}>{errors.last_name}</div> : ''}

					<label className={classes.input_title}>Email</label>
					<input className={classes.input_info}
						   type='email'
						   name='email'
						   defaultValue={user.email}
						//pattern={EMAIL_REGEXP}
						   onChange={(e) => handleChange(e)}/>

					{errors.email && errors.email.length ?
						<div className={classes.errorDiv}>{errors.email}</div> : ''}

					<label className={classes.input_title}>Phone</label>
					<input className={`${classes.input_info} ${classes.phone}`}
						   type='text'
						   name='phone'
						   defaultValue={user.phone}
						//pattern={PHONE_REGEXP}
						   onChange={(e) => handleChange(e)}/>

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

					{errors.password && errors.password.length ?
						<div className={classes.errorDiv}>{errors.password}</div> : ''}

				</section>
			</div>
		</form>
	)
}

export default EditUser;
