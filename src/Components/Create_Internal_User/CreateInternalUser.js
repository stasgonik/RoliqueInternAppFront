import React, {useRef, useState} from 'react';
import classes from './CreateInternalUser.module.css';
import info from '../Items/Icons/info-button.svg';
import Tooltip from '../Items/Tooltip/Tooltip'
import {INFO} from '../../Constants/messages';
import Dropdown from '../Items/Dropdown/Dropdown';
import Header from '../Items/Header/Header';
import Sidebar from '../Items/Sidebar/Sidebar'
import leftArrow from '../Items/Icons/arrow-left.svg';
import {EMAIL_REGEXP, FIRST_LAST_NAME_REGEXP, PASSWORD_REGEXP, PHONE_REGEXP} from '../../Constants/regexp.enum';
import userService from "../../Services/userService";



const role = [
	{value: 'admin', label: 'Admin'},
	{value: 'manager', label: 'Manager'},
	{value: 'employee', label: 'Employee'},
];

const User = () => {
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




	// const optionsRole = (role) => {
	// 	role.map((value) => {
	// 		if (value.label === 'Admin') {
	// 			return ['admin', 'manager', 'employee']
	// 		}
	// 		if (value.label === 'Manager') {
	// 			return ['admin', 'manager', 'employee']
	// 		}
	// 		else {
	// 			return null;
	// 		}
	// 	})
	//
	// }
	const saveChanges = async () => {
		const formData = new FormData();
		for (const value in values) {
			formData.append(value, values[value])
		}
		await userService.postUsers(formData);
		console.log(formData)
	}

	return (

		<form className={classes.mainBlock} onSubmit={(e) => handleSubmit(e)}>
			<Sidebar/>
			<Header name={'Create'} leftArrow={leftArrow} button={(e) => saveChanges(e)}/>

			<div className={classes.mainContainer}>
				<section className={classes.leftContainer}>
					<h3 className={classes.general}>General</h3>
					<p className={classes.profile}>Profile Picture</p>
					<input type='file'
						   name = 'avatar'
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


					<label className={classes.input_title}>First Name</label>
					<input className={classes.input_info}
						   type='text'
						   name='first_name'
						   value={values.firstName}
						   pattern={FIRST_LAST_NAME_REGEXP}
						   required="required"
						   onChange={(e) => handleChange(e)}
						   />

					<label className={classes.input_title}>Last Name</label>
					<input className={classes.input_info}
						   type='text'
						   name='last_name'
						   required="required"
						   pattern={FIRST_LAST_NAME_REGEXP}
						   onChange={(e) => handleChange(e)}/>


					<label className={classes.input_title}>Email</label>
					<input className={classes.input_info}
						   type='email'
						   name='email'
						   required="required"
						   pattern={EMAIL_REGEXP}
						   onChange={(e) => handleChange(e)}/>

					<label className={classes.input_title}>Phone</label>
					<input className={`${classes.input_info} ${classes.phone}`}
						   type='text'
						   name='phone'
						   pattern={PHONE_REGEXP}
						   onChange={(e) => handleChange(e)}/>

				</section>

				<section className={classes.rightContainer}>
					<div className={classes.role}>

						<h3 className={classes.rightContainer_title}>Role & Permissions</h3>
						<img src={info} alt="info" className={classes.infoBtn}/>
						<div className={classes.tooltip}>
							<Tooltip align='center' text={INFO.message}/>
						</div>
					</div>

					<label className={classes.input_title}>Role</label>
					<Dropdown required="required"
							  options={role}
							  name='role'
							  onChange={(e) => handleChangeRole(e)}/>

					<h3 className={`${classes.rightContainer_title} ${classes.rightContainer_title_password}`}>Password</h3>
					<label className={`${classes.input_title} ${classes.input_password}`}>Set Password</label>
					<input className={`${classes.input_info}`}
						   type='text'
						   name='password'
						   pattern={PASSWORD_REGEXP}
						   required="required"
						   onChange={(e) => handleChange(e)}/>

				</section>
			</div>
		</form>
	)
}

export default User;
