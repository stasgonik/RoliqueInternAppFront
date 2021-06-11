import React, {useRef, useState} from 'react';
import {useParams} from 'react-router-dom';

import AuthService from '../../Services/auth.service';
import UserService from '../../Services/user.service';

import classes from './EditInternalUser.module.css';
import configFront from '../../Constants/configFront';
import Dropdown from '../Items/Dropdown/Dropdown';
import Error from '../Items/Error/Error';
import Header from '../Items/Header/Header';
import Input from '../Items/Input/Input';
import Loading from '../Items/Loading/Loading';
import Tooltip from '../Items/Tooltip/Tooltip';

import {INFO} from '../../Constants/messages';
import routes from '../../Constants/routes.enum';
import regexp from '../../Constants/regexp.enum';

import info from '../Items/Icons/info-button.svg';
import leftArrow from '../Items/Icons/arrow-left.svg';
import loading from '../../img/Loading.gif';
import topArrow from '../Items/Icons/top-arrow-black.svg';


let role = [
	{value: 'admin', label: 'Admin'},
	{value: 'manager', label: 'Manager'},
	{value: 'employee', label: 'Employee'}
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

const EditUser = () => {
	const [isSending, setIsSending] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	setRoles()
	const params = useParams();
	if (!params[routes.USER_ID]) {
		window.location.href = configFront.URL + `${routes.USERS}`
	}

	const [user, setUser] = useState(async () => {
		setIsLoading(true)
		const initialState = await UserService.getSingleUser(params[routes.USER_ID])
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
		setIsLoading(false)
	});

	const fileInput = useRef(null);
	const [values, setValues] = useState({});

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
		console.log(errors)
		if (!formIsValid) {
			setIsSending(false)
		}
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
		setIsSending(true)
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
			const result = await UserService.editUser(formData, params[routes.USER_ID]);
			if (result) {
				setIsSending(true)
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
				if (result.status !== 200) {
					errors["email"] = INFO.UNKNOWN_ERROR
					setErrors(errors);
					console.log(result);
					return
				}
			}
		}
	}

	const path = user.profile_picture;

	return (
		<form name={'myForm'} className={classes.mainBlock} onSubmit={(e) => handleSubmit(e)}>
			<Header name='Edit'
					titleHeader={classes.title}
					title='Edit User'
					titleBtn={isSending ? 'Sending' : 'Save Changes'}
					leftArrow={leftArrow}
					btnHeader={isSending ? classes.btnHeaderDisabled : classes.btnHeader}
					button={(e) => saveChanges(e)}
					isSending={isSending}
			/>
			{isLoading ? <Loading message='Please wait...'/>
				: <main className={classes.mainContainer}>
					<section className={classes.leftContainer}>
						<h3 className={classes.general}>General</h3>
						<p className={classes.profile}>Profile Picture</p>
						<input type='file'
							   name='profile_picture'
							   style={{display: 'none'}}
							   onChange={(e) => selected(e)}
							   ref={fileInput}
						/>

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
							<Error message={errors.avatar}/> : ''}

						<Input type='text'
							   name='first_name'
							   label='First Name'
							   className={classes.inputInfo}
							   defaultValue={user.first_name}
							   onInput={(e) => handleChange(e)}
						/>

						{errors.first_name && errors.first_name.length ?
							<Error message={errors.first_name}/> : ''}

						<Input type='text'
							   name='last_name'
							   label='Last Name'
							   className={classes.inputInfo}
							   defaultValue={user.last_name}
							   onInput={(e) => handleChange(e)}
						/>

						{errors.last_name && errors.last_name.length ?
							<Error message={errors.last_name}/> : ''}


						<Input type='email'
							   name='email'
							   label='Email'
							   className={classes.inputInfo}
							   defaultValue={user.email}
							   onInput={(e) => handleChange(e)}
						/>

						{errors.email && errors.email.length ?
							<Error message={errors.email}/> : ''}

						<Input type='text'
							   name='phone'
							   label='phone'
							   className={classes.inputInfo}
							   defaultValue={user.phone}
							   onInput={(e) => handleChange(e)}
						/>

						{errors.phone && errors.phone.length ?
							<Error message={errors.phone}/> : ''}

					</section>

					<section className={classes.rightContainer}>
						<div className={classes.role}>

							<h3 className={classes.rightContainer_title}>Role & Permissions</h3>
							<img src={info} alt="info" className={classes.infoBtn}/>
							<div className={classes.tooltip}>
								<Tooltip align='center' Arrow={topArrow} text={INFO.message}/>
							</div>
						</div>

						<Dropdown options={role}
								  label='Role'
								  valid={user.role}
								  name='role'
								  defaultValue={user.role}
								  onChange={(e) => handleChangeRole(e)}/>

						<h3 className={`${classes.rightContainer_title} ${classes.rightContainer_title_password}`}>Password</h3>

						<Input type='text'
							   name='password'
							   label='New Password'
							   className={classes.inputInfo}
							   onInput={(e) => handleChange(e)}
						/>

						{errors.password && errors.password.length ?
							<Error message={errors.password}/> : ''}

					</section>
				</main>
			}
		</form>
	)
}

export default EditUser;
