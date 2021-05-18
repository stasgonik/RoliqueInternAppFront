import React, {useRef, useState} from 'react';

import classes from './CreateInfluencer.module.css';
import configFront from "../../Constants/configFront";
import Header from '../Items/Header/Header';
import influencersService from "../../Services/influencers.service";
import {INFO} from '../../Constants/messages';
import leftArrow from '../Items/Icons/arrow-left.svg';
import Sidebar from '../Items/Sidebar/Sidebar'
import Tooltip from '../Items/Tooltip/Tooltip'
import regexp from "../../Constants/regexp.enum";
import routes from "../../Constants/routes.enum";

const CreateInfluencer = () => {
	const fileInput = useRef(null);
	const instagram_profile = useRef(null);
	const instagram_followers = useRef(null);
	const youtube_profile = useRef(null);
	const youtube_followers = useRef(null);
	const facebook_profile = useRef(null);
	const facebook_followers = useRef(null);
	const tiktok_profile = useRef(null);
	const tiktok_followers = useRef(null);
	const twitter_profile = useRef(null);
	const twitter_followers = useRef(null);
	const blog_profile = useRef(null);
	const blog_followers = useRef(null);

	const ref = {
		instagram_followers,
		instagram_profile,
		youtube_followers,
		youtube_profile,
		facebook_profile,
		facebook_followers,
		tiktok_profile,
		tiktok_followers,
		twitter_profile,
		twitter_followers,
		blog_profile,
		blog_followers,
	}

	const [values, setValues] = useState({
		first_name: '',
		last_name: '',
		profession: '',
		birthdate: '',
	});

	const [errors, setErrors] = useState({
		avatar: '',
		first_name: '',
		last_name: '',
		profession: '',
		birthdate: ''
	});

	const handleChange = (e) => {
		let value = e.target.value;
		const strArr = e.target.name.split('_')
		const socialName = strArr.shift()
		const target = strArr.pop();


		if (target === 'profile') {
			const inputFollower = socialName + '_followers'
			const input = ref[inputFollower]
			const inputFocus = ref[e.target.name]
			inputFocus.current.style.borderColor = ''
			inputFocus.current.required = false
			if (!input.current.value) {
				input.current.style.borderColor = 'red'
				input.current.required = true
				if (value !== '') {
					let errProf = '';
					if (!value.match(regexp.PROFILE_REGEXP)) {
						errProf = INFO.PROFILE_REGEX
					}
					setErrors({...errors, [inputFollower]: INFO.PROFILES_ERROR, [e.target.name]: errProf})
				}

			} else {
				input.current.style.borderColor = ''

				if (value !== '') {
					let errProf = '';
					let errFoll = '';
					let normalFoll = input.current.value.split('.').join('')

					if (!value.match(regexp.PROFILE_REGEXP)) {
						errProf = INFO.PROFILE_REGEX
					}
					if (!normalFoll.match(regexp.FOLLOWERS_REGEXP)) {
						errFoll = INFO.FOLLOWERS_REGEX
					}
					setErrors({...errors, [e.target.name]: errProf, [inputFollower]: errFoll})
				} else {
					let errFoll = '';
					let normalFoll = input.current.value.split('.').join('')
					if (!normalFoll.match(regexp.FOLLOWERS_REGEXP)) {
						errFoll = INFO.FOLLOWERS_REGEX
					}
					setErrors({...errors, [inputFollower]: errFoll})
				}
			}
		}

		if (target === 'followers') {
			const inputProfile = socialName + '_profile'
			const input = ref[inputProfile]
			const inputFocus = ref[e.target.name]
			inputFocus.current.style.borderColor = ''
			inputFocus.current.required = false
			if (!input.current.value) {
				input.current.style.borderColor = 'red'
				input.current.required = true
				if (value !== '') {
					let errFoll = '';
					let normalFoll = value.split('.').join('')
					if (!normalFoll.match(regexp.FOLLOWERS_REGEXP)) {
						errFoll = INFO.FOLLOWERS_REGEX
					}
					setErrors({...errors, [inputProfile]: INFO.PROFILES_ERROR, [e.target.name]: errFoll})
				}
			} else {
				input.current.style.borderColor = ''

				if (value !== '') {
					let errFoll = '';
					let errProf = '';
					let normalFoll = value.split('.').join('');
					if (!normalFoll.match(regexp.FOLLOWERS_REGEXP)) {
						errFoll = INFO.FOLLOWERS_REGEX
					}
					if (!input.current.value.match(regexp.PROFILE_REGEXP)) {
						errProf = INFO.PROFILE_REGEX
					}

					setErrors({...errors, [e.target.name]: errFoll, [inputProfile]: errProf})
				} else {
					let errProf = '';
					if (!input.current.value.match(regexp.PROFILE_REGEXP)) {
						errProf = INFO.PROFILE_REGEX
					}
					setErrors({...errors, [inputProfile]: errProf})
				}
			}
		}


		if (target === 'followers') {
			const inputProfile = socialName + '_profile'
			const input = ref[inputProfile]
			const inputFocus = ref[e.target.name]
			value = value.toString().split('.').join('').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
			inputFocus.current.style.borderColor = ''
			inputFocus.current.required = false


			if (!input.current.value) {
				input.current.style.borderColor = 'red'
				input.current.required = true
			} else {
				input.current.style.borderColor = ''
			}

			if (value === '' || !value) {
				if (input.current.value === '' || !input.current.value) {
					inputFocus.current.style.borderColor = ''
					inputFocus.current.required = false
					input.current.style.borderColor = ''
					input.current.required = false
					setErrors({...errors, [e.target.name]: '', [inputProfile]: ''})

				} else {
					inputFocus.current.style.borderColor = 'red'
					inputFocus.current.required = true
					let errProf = '';
					if (!input.current.value.match(regexp.PROFILE_REGEXP)) {
						errProf = INFO.PROFILE_REGEX
					}
					setErrors({...errors, [inputProfile]: errProf, [e.target.name]: INFO.PROFILES_ERROR})
				}
			}

		}
		if (target === 'profile') {
			const inputFollower = socialName + '_followers'
			const input = ref[inputFollower]
			const inputFocus = ref[e.target.name]
			inputFocus.current.style.borderColor = ''
			inputFocus.current.required = false


			if (value === '' || !value) {
				if (input.current.value === '' || !input.current.value) {
					inputFocus.current.style.borderColor = ''
					inputFocus.current.required = false
					input.current.style.borderColor = ''
					input.current.required = false
					setErrors({...errors, [e.target.name]: '', [inputFollower]: ''})
				} else {
					inputFocus.current.style.borderColor = 'red'
					inputFocus.current.required = true
					let errFoll = '';
					let normalFoll = input.current.value.split('.').join('')
					if (!normalFoll.match(regexp.FOLLOWERS_REGEXP)) {
						errFoll = INFO.FOLLOWERS_REGEX
					}
					setErrors({...errors, [inputFollower]: errFoll, [e.target.name]: INFO.PROFILES_ERROR})
				}
			}
		}

		if (value.length < 1) {
			delete values[e.target.name]
			setValues({...values});
			return
		}

		setValues({...values, [e.target.name]: value});
	}

	const handleSubmit = (e) => {
		e.preventDefault()
	}

	const selected = (e) => {
		let img = e.target.files[0];
		if (!img) {
			delete values["avatar"]
			setValues({...values});
			return
		}

		img.preview = URL.createObjectURL(img)
		setValues({...values, [e.target.name]: img})
	}

	const handleValidation = () => {
		let formIsValid = true;
		console.log(errors)
		if (Object.keys(errors).length > 5) {
			for (let i = 0; i < Object.keys(errors).length; i++) {
				const key = Object.keys(errors)[i];
				const words = key.split('_')
				const target = words.pop();

				if (target === 'profile' && errors[key].length) {
					console.log(key)
					console.log(errors[key])
					formIsValid = false
				}

				if (target === 'followers' && errors[key].length) {
					console.log(key)
					console.log(errors[key])
					formIsValid = false
				}
			}
		}
		let error = {
			avatar: '',
			first_name: '',
			last_name: '',
			profession: '',
			birthdate: ''
		};

		if (typeof values["first_name"] !== "undefined") {
			if (!values["first_name"].match(regexp.FIRST_LAST_NAME_REGEXP)) {
				formIsValid = false;
				error["first_name"] = INFO.INVALID_NAME_PATTERN
			}
		}

		if (!values["first_name"] || !values["first_name"].length) {
			formIsValid = false;
			error["first_name"] = INFO.EMPTY_FIELD
		}

		if (typeof values["last_name"] !== "undefined") {
			if (!values["last_name"].match(regexp.FIRST_LAST_NAME_REGEXP)) {
				formIsValid = false;
				error["last_name"] = INFO.INVALID_NAME_PATTERN
			}
		}

		if (!values["last_name"] || !values["last_name"].length) {
			formIsValid = false;
			error["last_name"] = INFO.EMPTY_FIELD
		}

		if (typeof values["profession"] !== "undefined") {
			if (!values["profession"].match(regexp.FIRST_LAST_NAME_REGEXP)) {
				formIsValid = false;
				error["profession"] = INFO.INVALID_NAME_PATTERN
			}
		}

		if (!values["profession"] || !values["profession"].length) {
			formIsValid = false;
			error["profession"] = INFO.EMPTY_FIELD
		}

		if (!values["birthdate"]) {
			formIsValid = false;
			error["birthdate"] = INFO.EMPTY_FIELD
		}


		setErrors({...errors, ...error});
		// if (!formIsValid) {
		// 	setIsSending(false)
		// }
		console.log(formIsValid)
		return formIsValid;
	}


	const saveChanges = async () => {
		const formData = new FormData();
		// const arr = []
		let bd;
		if (values.birthdate) {
			bd = values.birthdate
		}
		let pp;
		if (values.avatar) {
			pp = values.avatar;
		}

		for (const value in values) {
			if (value.includes('followers')) {
				values[value] = values[value].split('.').join('')
			}

			// arr.push(values[value])
			// if (values[value] === '') {
			// 	values[value] = null
			// }

			formData.append(value, values[value])
			if (values[value]) {
				values[value] = values[value].toString().split('.').join('').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
			}
		}


		if (values) {
			if (bd) {
				// formData.set('profile_picture', pp, 'avatar.jpg')
				if (pp) {
					setValues({...values, avatar: pp, birthdate: bd})
				} else {
					setValues({...values, birthdate: bd})
				}

			} else if (pp) {
				// formData.set('profile_picture', pp, 'avatar.jpg')
				setValues({...values, avatar: pp})
			}
			if (handleValidation()) {

				const result = await influencersService.postInfluencer(formData);
				if (result) {
					// setIsSending(false)
					if (result.status === 200) {
						window.location.href = configFront.URL + `${routes.INFLUENCERS}`;
						return
					}

					let errors = {
						avatar: '',
						first_name: '',
						last_name: '',
						profession: ''
					};

					// if (result.status === 403) {
					// 	window.location.href = configFront.URL + `${routes.INFLUENCERS}`;
					// 	return
					// }
					// if (result.data.customCode === 4005) {
					// 	errors["avatar"] = INFO.TOO_BIG_PHOTO
					// 	setErrors(errors);
					// 	return
					// }
					// if (typeof result.data !== "undefined") {
					// 	if (result.data.customCode === 4000) {
					// 		errors["email"] = INFO.DATA_INCORRECT
					// 		setErrors(errors);
					// 		return
					// 	}
					// 	if (result.data.customCode === 4002) {
					// 		errors["email"] = INFO.EMAIL_ALREADY_EXIST
					// 		setErrors(errors);
					// 		return
					// 	}
					//
					// }
					//
					// if (result.status === 500) {
					// 	errors["email"] = INFO.SERVER_ERROR
					// 	setErrors(errors);
					// 	console.log(result);
					// 	return
					// }

					// if (result.status !== 200) {
					// 	errors["email"] = INFO.UNKNOWN_ERROR
					// 	setErrors(errors);
					// 	console.log(result);
					// 	return
					// }
				}
			}
		}

	}

	return (
		<form className={classes.mainBlock} onSubmit={(e) => handleSubmit(e)}>
			<Sidebar/>
			<Header name={'Create'} titleHeader={classes.title}
					titleBtn='Save Changes'
					title='Create Influencer'
					leftArrow={leftArrow}
					btnHeader={classes.btnHeader}
					button={(e) => saveChanges(e)}/>

			<div className={classes.mainContainer}>
				<section className={classes.leftContainer}>
					<h3 className={classes.general}>General</h3>
					<label className={classes.input_title}>First Name</label>
					<input className={classes.input_info_left}
						   type='text'
						   name='first_name'
						   onInput={(e) => handleChange(e)}
					/>

					{errors.first_name && errors.first_name.length ?
						<div className={classes.errorDiv}>{errors.first_name}</div> : ''}

					<label className={classes.input_title}>Last Name</label>
					<input className={classes.input_info_left}
						   type='text'
						   name='last_name'
						   onInput={(e) => handleChange(e)}/>

					{errors.last_name && errors.last_name.length ?
						<div className={classes.errorDiv}>{errors.last_name}</div> : ''}

					<label className={classes.input_title}>Birthdate</label>
					<input className={classes.input_info_left}
						   type='date'
						   defaultValue={false}
						   name='birthdate'
						   placeholder={''}
						   onChange={(e) => handleChange(e)}/>

					{errors.birthdate && errors.birthdate.length ?
						<div className={classes.errorDiv}>{errors.birthdate}</div> : ''}

					<label className={classes.input_title}>Profession</label>
					<input className={`${classes.input_info_left}`}
						   type='text'
						   name='profession'
						   onChange={(e) => handleChange(e)}/>

					{errors.profession && errors.profession.length ?
						<div className={classes.errorDiv}>{errors.profession}</div> : ''}

					<p className={classes.profile}>Profile Picture</p>
					<input type='file'
						   name='avatar'
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

				</section>

				<section className={classes.rightContainer}>
					<div className={`${classes.div_helper}`}>
						<h3 className={classes.rightContainer_title}>Social Profiles</h3>
						<div className={classes.tooltip}>
							<Tooltip align='center' text={INFO.message}/>
						</div>
						<label className={`${classes.input_title}`}>Instagram</label>
						<input className={`${classes.input_info}`}
							   type='text'
							   name='instagram_profile'
							   disabled={false}
							   ref={instagram_profile}
							   onChange={(e) => handleChange(e)}
						/>


						{errors['instagram_profile'] && errors['instagram_profile'].length ?
							<div className={classes.errorDiv}>{errors['instagram_profile']}</div> : ''}

						<label className={`${classes.input_title}`}>YouTube</label>
						<input className={`${classes.input_info}`}
							   type='text'
							   name='youtube_profile'
							   ref={youtube_profile}
							   onChange={(e) => handleChange(e)}/>

						{errors['youtube_profile'] && errors['youtube_profile'].length ?
							<div className={classes.errorDiv}>{errors['youtube_profile']}</div> : ''}

						<label className={`${classes.input_title}`}>Facebook</label>
						<input className={`${classes.input_info}`}
							   type='text'
							   name='facebook_profile'
							   ref={facebook_profile}
							   onChange={(e) => handleChange(e)}/>

						<label className={`${classes.input_title}`}>Tiktok</label>
						<input className={`${classes.input_info}`}
							   type='text'
							   name='tiktok_profile'
							   ref={tiktok_profile}
							   onChange={(e) => handleChange(e)}/>


						{errors['tiktok_profile'] && errors['tiktok_profile'].length ?
							<div className={classes.errorDiv}>{errors['tiktok_profile']}</div> : ''}

						<label className={`${classes.input_title}`}>Twitter</label>
						<input className={`${classes.input_info}`}
							   type='text'
							   name='twitter_profile'
							   ref={twitter_profile}
							   onChange={(e) => handleChange(e)}/>

						{errors['twitter_profile'] && errors['twitter_profile'].length ?
							<div className={classes.errorDiv}>{errors['twitter_profile']}</div> : ''}

						<label className={`${classes.input_title}`}>Blog</label>
						<input className={`${classes.input_info}`}
							   type='text'
							   name='blog_profile'
							   ref={blog_profile}
							   onChange={(e) => handleChange(e)}/>

						{errors['blog_profile'] && errors['blog_profile'].length ?
							<div className={classes.errorDiv}>{errors['blog_profile']}</div> : ''}

					</div>
					<div className={`${classes.div_helper}`} style={{paddingTop: '58px'}}>
						<label className={`${classes.input_title}`}>Instagram Followers</label>
						<input className={`${classes.input_info}`}
							   type='text'
							   disabled={false}
							   name='instagram_followers'
							   ref={instagram_followers}
							   value={values.instagram_followers ? values.instagram_followers : values.instagram_followers === '' ? values.instagram_followers : values.instagram_followers}
							   onChange={(e) => handleChange(e)}
						/>


						{errors['instagram_followers'] && errors['instagram_followers'].length ?
							<div className={classes.errorDiv}>{errors['instagram_followers']}</div> : ''}

						<label className={`${classes.input_title}`}>YouTube Subscribers</label>
						<input className={`${classes.input_info}`}
							   type='text'
							   name='youtube_followers'
							   ref={youtube_followers}
							   value={values.youtube_followers ? values.youtube_followers : values.youtube_followers === '' ? values.youtube_followers : values.youtube_followers}
							   onChange={(e) => handleChange(e)}/>

						{errors['youtube_followers'] && errors['youtube_followers'].length ?
							<div className={classes.errorDiv}>{errors['youtube_followers']}</div> : ''}

						<label className={`${classes.input_title}`}>Facebook Followers</label>
						<input className={`${classes.input_info}`}
							   type='text'
							   name='facebook_followers'
							   ref={facebook_followers}
							   value={values.facebook_followers ? values.facebook_followers : values.facebook_followers === '' ? values.facebook_followers : values.facebook_followers}
							   onChange={(e) => handleChange(e)}/>

						{errors['facebook_followers'] && errors['facebook_followers'].length ?
							<div className={classes.errorDiv}>{errors['facebook_followers']}</div> : ''}

						<label className={`${classes.input_title}`}>Tiktok Followers</label>
						<input className={`${classes.input_info}`}
							   type='text'
							   name='tiktok_followers'
							   ref={tiktok_followers}
							   value={values.tiktok_followers ? values.tiktok_followers : values.tiktok_followers === '' ? values.tiktok_followers : values.tiktok_followers}
							   onChange={(e) => handleChange(e)}/>

						{errors['tiktok_followers'] && errors['tiktok_followers'].length ?
							<div className={classes.errorDiv}>{errors['tiktok_followers']}</div> : ''}

						<label className={`${classes.input_title}`}>Twitter Followers</label>
						<input className={`${classes.input_info}`}
							   type='text'
							   name='twitter_followers'
							   ref={twitter_followers}
							   value={values.twitter_followers ? values.twitter_followers : values.twitter_followers === '' ? values.twitter_followers : values.twitter_followers}
							   onChange={(e) => handleChange(e)}/>

						{errors['twitter_followers'] && errors['twitter_followers'].length ?
							<div className={classes.errorDiv}>{errors['twitter_followers']}</div> : ''}

						<label className={`${classes.input_title}`}>Blog Views</label>
						<input className={`${classes.input_info}`}
							   type='text'
							   name='blog_followers'
							   ref={blog_followers}
							   value={values.blog_followers ? values.blog_followers : values.blog_followers === '' ? values.blog_followers : values.blog_followers}
							   onChange={(e) => handleChange(e)}/>

						{errors['blog_followers'] && errors['blog_followers'].length ?
							<div className={classes.errorDiv}>{errors['blog_followers']}</div> : ''}

					</div>
				</section>
			</div>
		</form>
	)
}

export default CreateInfluencer;
