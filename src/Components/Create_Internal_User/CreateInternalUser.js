import React, {useState} from 'react';
import classes from './CreateInternalUser.module.css';
import profileIcon from '../Items/Icons/profileIcon.svg';
import info from '../Items/Icons/info-button.svg';
import Tooltip from '../Items/Tooltip/Tooltip'
import {INFO} from '../../Constants/messages';
import Dropdown from '../Items/Dropdown/Dropdown';
import Header from '../Items/Header/Header';
import Sidebar from '../Items/Sidebar/Sidebar'
import leftArrow from '../Items/Icons/arrow-left.svg';

const options = [
	{value: 'admin', label: 'Admin'},
	{value: 'manager', label: 'Manager'},
	{value: 'employee', label: 'Employee'},
];
const User = () => {

	const [values, setValues] = useState({
		avatar: '',
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		role: '',
		password: '',
	});

	const handleChange = (e) => {
		const value = e.target.value;
		setValues({...values, [e.target.id]: value});
		console.log(value);

	};
	const handleSubmit = (e) => {
		e.preventDefault()
	}
	const [selectedOption, setOptions] = useState(null);
	const handleChangeRole = (selectedOption) => {
		setOptions({selectedOption});
		console.log(`Option selected:`, selectedOption);
	};

	// const optionsRole = (role) => {
	// 	if (role === 'ADMIN') {
	// 		return ['admin', 'manager', 'employee']
	// 	}
	// 	if (role === 'MANAGER {
	// 		return ['admin', 'manager', 'employee']
	// 	}
	// }

	return (

		<form className={classes.mainBlock} onSubmit={(e) => handleSubmit(e)}>
			<Sidebar/>
			<Header leftArrow={leftArrow}/>

			<div className={classes.mainContainer}>
				<section className={classes.leftContainer}>
					<h3 className={classes.general}>General</h3>
					<p className={classes.profile}>Profile Picture</p>
					<img className={classes.avatar} src={profileIcon} alt="avatar"/>

					<label className={classes.input_title}>First Name</label>
					<input className={classes.input_info} type='text' required="required" onChange={(e) => handleChange(e)}/>

					<label className={classes.input_title}>Last Name</label>
					<input className={classes.input_info} type='text' required="required" onChange={(e) => handleChange(e)}/>

					<label className={classes.input_title}>Email</label>
					<input className={classes.input_info} type='email' required="required" onChange={(e) => handleChange(e)}/>

					<label className={classes.input_title}>Phone</label>
					<input className={`${classes.input_info} ${classes.phone}`} type='text' onChange={(e) => handleChange(e)}/>
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
							  options={optionsRole(role)}
							  onChange={handleChangeRole}
							  value={selectedOption}
							  name='SelectRole'/>
					<h3 className={`${classes.rightContainer_title} ${classes.rightContainer_title_password}`}>Password</h3>
					<label className={`${classes.input_title} ${classes.input_password}`}>Set Password</label>
					<input className={`${classes.input_info}`} type='text' required="required" onChange={(e) => handleChange(e)}/>
				</section>
			</div>
		</form>

	)

}

export default User;
