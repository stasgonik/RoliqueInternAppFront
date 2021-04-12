import React, {useState} from 'react';
import classes from './CreateInternalUser.module.css';


const User = () => {

	const [values, setValues] = useState({
		avatar: '',

		firstName: '',	lastName: '',
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


	return (
		<form className={classes.mainBlock} onSubmit={(e) => handleSubmit(e)}>
			<header className={classes.header}>
				<h1 className={classes.title}>Create Internal User</h1>
				<button className={classes.btn}><span className={classes.titleBtn}>Save Changes</span></button>
			</header>

			<div className={classes.mainContainer}>
				<section className={classes.leftContainer}>
					<h3 className={classes.general}>General</h3>
					<p className={classes.profile}>Profile Picture</p>
					<img className={classes.avatar}/>

					<label className={classes.input_title}>First Name</label>
					<input className={classes.input_info} type='text'  onChange={(e) => handleChange(e)}/>

					<label className={classes.input_title}>Last Name</label>
					<input className={classes.input_info} type='text'  onChange={(e) => handleChange(e)}/>

					<label className={classes.input_title}>Email</label>
					<input className={classes.input_info} type='email'  onChange={(e) => handleChange(e)}/>

					<label className={classes.input_title}>Phone</label>
					<input className={`${classes.input_info} ${classes.phone}`} type='text'  onChange={(e) => handleChange(e)}/>
				</section>

				<section className={classes.rightContainer}>
					TODO Do this section
				</section>
			</div>
		</form>


	)
}

export default User;
