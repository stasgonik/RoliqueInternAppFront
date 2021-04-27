import React, {useRef, useState} from 'react';
import classes from './CreateInternalUser.module.css';

import Tooltip from '../Items/Tooltip/Tooltip'
import Dropdown from '../Items/Dropdown/Dropdown';
import Header from '../Items/Header/Header';
import Sidebar from '../Items/Sidebar/Sidebar';

import userService from "../../Services/userService";
import AuthService from "../../Services/auth.service";
import info from '../Items/Icons/info-button.svg';
import leftArrow from '../Items/Icons/arrow-left.svg';
import topArrow from '../Items/Icons/top-arrow-black.svg'
import {EMAIL_REGEXP, FIRST_LAST_NAME_REGEXP, PASSWORD_REGEXP, PHONE_REGEXP} from '../../Constants/regexp.enum';
import {INFO} from '../../Constants/messages';
import Error from "../Items/Messages/Messages";
import configFront from "../../Constants/config";


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
		const value = e.target.value;
		setValues({...values, [e.target.name]: value})
	};

	const selected = (e) => {
		let img = e.target.files[0];
		img.preview = URL.createObjectURL(img)
		setValues({...values, [e.target.name]: img})
		console.log(img)
		console.log(values)
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
			if (!values["password"].match(/^(?=.*[A-Za-z])(?=.*\d)([A-Za-z\d@$!%*#?&]?){4,50}$/)) {
				formIsValid = false;
				errors["password"] = INFO.INVALID_PASSWORD_PATTERN
			}
		}

		if (!values["password"] || !values["password"].length ) {
			formIsValid = false;
			errors["password"] = INFO.EMPTY_FIELD
		}

		if (typeof values["email"] !== "undefined") {
			if (!values["email"].match(/^[\w.-]+@[a-zA-Z]+\.[a-zA-Z]+$/)) {
				formIsValid = false;
				errors["email"] = INFO.INVALID_EMAIL_PATTERN
			}
		}

		if (!values["email"] || !values["email"].length ) {
			formIsValid = false;
			errors["email"] = INFO.EMPTY_FIELD
		}

		if (typeof values["first_name"] !== "undefined") {
			if (!values["first_name"].match(/^[a-zA-Z ,.'-]{2,50}$/)) {
				formIsValid = false;
				errors["first_name"] = INFO.INVALID_NAME_PATTERN
			}
		}

		if (!values["first_name"] || !values["first_name"].length ) {
			formIsValid = false;
			errors["first_name"] = INFO.EMPTY_FIELD
		}

		if (typeof values["last_name"] !== "undefined") {
			if (!values["last_name"].match(/^[a-zA-Z ,.'-]{2,50}$/)) {
				formIsValid = false;
				errors["last_name"] = INFO.INVALID_NAME_PATTERN
			}
		}

		if (!values["last_name"] || !values["last_name"].length ) {
			formIsValid = false;
			errors["last_name"] = INFO.EMPTY_FIELD
		}

		if (!values["role"] || !values["role"].length ) {
			formIsValid = false;
			errors["role"] = INFO.EMPTY_FIELD
		}

		if (typeof values["phone"] !== "undefined" && values["phone"] && values["phone"].length) {
			if (!values["phone"].match(/^[\d+()-]*$/)) {
				formIsValid = false;
				errors["phone"] = INFO.INVALID_PHONE_PATTERN
			}
		}


		setErrors(errors);
		return formIsValid;
	}

	const saveChanges = async () => {
		const formData = new FormData();
		if(!values["phone"].length) {
			delete values["phone"]
		}
		if(!values["avatar"].length) {
			delete values["avatar"]
		}
		for (const value in values) {
			formData.append(value, values[value])
		}
		setValues({...values, avatar: '', phone: ''})
		if(handleValidation()) {
			const result = await userService.postUsers(formData);
			if(result) {
				if(result.status === 200) {
					window.location.href = configFront.URL + 'users/';
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
				if(result.status === 403) {
					window.location.href = configFront.URL + 'users/';
					return
				}
				if(result.data.customCode === 4000) {
					errors["email"] = INFO.DATA_INCORRECT
					setErrors(errors);
					return
				}
				if(result.data.customCode === 4002) {
					errors["email"] = INFO.EMAIL_ALREADY_EXIST
					setErrors(errors);
					return
				}
				if(result.data.customCode === 4005) {
					errors["avatar"] = INFO.TOO_BIG_PHOTO
					setErrors(errors);
					return
				}
				if(result.status === 500) {
					errors["email"] = INFO.SERVER_ERROR
					setErrors(errors);
					console.log(result);
					return
				}
				errors["email"] = INFO.UNKNOWN_ERROR
				setErrors(errors);
				console.log(result);
			}
		}
		// console.log(formData)
	}

	return (

		<form className={classes.mainBlock} onSubmit={(e) => handleSubmit(e)}>
			<Sidebar/>
			<Header name={'Create'} titleHeader={classes.title}
					titleBtn='Save Changes'
					title='Create Internal User'
					leftArrow={leftArrow}
					btnHeader={classes.btnHeader}
					button={(e) => saveChanges(e)}/>

			<div className={classes.mainContainer}>
				<section className={classes.leftContainer}>
					<h3 className={classes.general}>General</h3>
					<p className={classes.profile}>Profile Picture</p>
					<input type='file'
						   name = 'avatar'
						   className={classes.avatarPhoto}
						   style={{display:'none'}}
						   onChange={(e)=>selected(e)}
						   ref={fileInput}

					/>
					<button className={classes.avatar} onClick={() => fileInput.current.click()}>
						{values.avatar ? <img src={values.avatar.preview} style={{
							width: 64,
							height: 64,
							borderRadius: 50
						}} alt={'alt'}/> : '+'}
					</button>

					{errors.avatar && errors.avatar.length ? <Error color={{backgroundColor: '#FEEFEF', marginLeft: '32px', marginBottom: '24px'}} colorRound={'colorRound'} className={'ErrorPosition'} message={errors.avatar}/> : ''}

					<label className={classes.input_title}>First Name</label>
					<input className={!values.first_name ? classes.input_info : classes.input_info_valid}
						   type='text'
						   name='first_name'
						   value={values.firstName}
						   // pattern={FIRST_LAST_NAME_REGEXP}
						   required
						   onChange={(e) => handleChange(e)}
						   />

					{errors.first_name && errors.first_name.length ? <Error color={{backgroundColor: '#FEEFEF', marginLeft: '32px', marginBottom: '24px'}} colorRound={'colorRound'} className={'ErrorPosition'} message={errors.first_name}/> : ''}

					<label className={classes.input_title}>Last Name</label>
					<input className={!values.last_name ? classes.input_info : classes.input_info_valid}
						   type='text'
						   name='last_name'
						   required
						   // pattern={FIRST_LAST_NAME_REGEXP}
						   onChange={(e) => handleChange(e)}/>

					{errors.last_name && errors.last_name.length ? <Error color={{backgroundColor: '#FEEFEF', marginLeft: '32px', marginBottom: '24px'}} colorRound={'colorRound'} className={'ErrorPosition'} message={errors.last_name}/> : ''}

					<label className={classes.input_title}>Email</label>
					<input className={!values.email ? classes.input_info : classes.input_info_valid}
						   type='email'
						   name='email'
						   required
						   // pattern={EMAIL_REGEXP}
						   onChange={(e) => handleChange(e)}/>

					{errors.email && errors.email.length ? <Error color={{backgroundColor: '#FEEFEF', marginLeft: '32px', marginBottom: '24px'}} colorRound={'colorRound'} className={'ErrorPosition'} message={errors.email}/> : ''}

					<label className={classes.input_title}>Phone</label>
					<input className={classes.input_info_valid}
						   type='text'
						   name='phone'
						   // pattern={PHONE_REGEXP}
						   onChange={(e) => handleChange(e)}/>

					{errors.phone && errors.phone.length ? <Error color={{backgroundColor: '#FEEFEF', marginLeft: '32px', marginBottom: '24px'}} colorRound={'colorRound'} className={'ErrorPosition'} message={errors.phone}/> : ''}

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
					<Dropdown required
							  options={role}
							  name='role'
							  title={'Select...'}
							  valid = {!!values.role}
							  onChange={(e) => handleChangeRole(e)}/>

					{errors.role && errors.role.length ? <Error color={{backgroundColor: '#FEEFEF', marginLeft: '32px', marginBottom: '24px'}} colorRound={'colorRound'} className={'ErrorPosition'} message={errors.role}/> : ''}

					<h3 className={`${classes.rightContainer_title} ${classes.rightContainer_title_password}`}>Password</h3>
					<label className={`${classes.input_title} ${classes.input_password}`}>Set Password</label>
					<input className={!values.password ? classes.input_info : classes.input_info_valid}
						   type='text'
						   name='password'
						   // pattern={PASSWORD_REGEXP}
						   required
						   onChange={(e) => handleChange(e)}/>

					{errors.password && errors.password.length ? <Error color={{backgroundColor: '#FEEFEF', marginLeft: '32px', marginBottom: '24px'}} colorRound={'colorRound'} className={'ErrorPosition'} message={errors.password}/> : ''}

				</section>
			</div>
		</form>
	)
}

export default User;
