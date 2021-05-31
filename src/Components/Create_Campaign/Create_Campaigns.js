import React, {Component, useEffect, useRef, useState} from 'react';
import classes from "./Create_Campaign.module.css";
import Sidebar from "../Items/Sidebar/Sidebar";
import Header from "../Items/Header/Header";
import leftArrow from "../Items/Icons/arrow-left.svg";
import {INFO} from "../../Constants/messages";
import Modal from '../Items/Modal_PopUp/Modal_PopUp';
import Dropdown from "../Items/Dropdown/Dropdown";
import DropdownSmall from '../Items/Dropdown_Small/Dropdown-Small';
import regexp from "../../Constants/regexp.enum";
import userService from "../../Services/userService";
import configFront from "../../Constants/configFront";
import routes from "../../Constants/routes.enum";
import AuthService from "../../Services/auth.service";
import plus from '../../img/Create_Campaign/Icon.svg';
import CampaignService from "../../Services/campaign.service";
import UserService from "../../Services/userService";
import BrandService from "../../Services/brand.service";
import { ToggleSwitch } from 'react-dragswitch';
import 'react-dragswitch/dist/index.css';

let status = [
	{
		value: 'Requested',
		label: <div style={{display: "flex", alignItems: "center"}}>
			<div style={{
				height: "10px",
				width: "10px",
				backgroundColor: '#D9AD42',
				borderRadius: '50%',
				marginRight: '4px'
			}}/>
			Requested </div>
	},
	{
		value: 'Pre-phase',
		label: <div style={{display: "flex", alignItems: "center"}}>
			<div style={{
				height: "10px",
				width: "10px",
				backgroundColor: '#B14AC2',
				borderRadius: '50%',
				marginRight: '4px'
			}}/>
			Pre-phase</div>
	},
	{
		value: 'Running',
		label: <div style={{display: "flex", alignItems: "center"}}>
			<div style={{
				height: "10px",
				width: "10px",
				backgroundColor: '#1778B0',
				borderRadius: '50%',
				marginRight: '4px'
			}}/>
			Running </div>
	},
	{
		value: 'Done',
		label: <div style={{display: "flex", alignItems: "center"}}>
			<div style={{
				height: "10px",
				width: "10px",
				backgroundColor: '#54A880',
				borderRadius: '50%',
				marginRight: '4px'
			}}/>
			Done </div>
	}
];

let effort = [
	{
		value: 'NotSet',
		label: <div style={{display: "flex", alignItems: "center"}}>
			<div style={{
				height: "10px",
				width: "10px",
				backgroundColor: '#FFFFFF',
				border: '1px solid #CCCCCC',
				boxSizing: 'border-box',
				borderRadius: '50%',
				marginRight: '4px'
			}}/>
			Not set </div>
	},
	{
		value: 'Low',
		label: <div style={{display: "flex", alignItems: "center"}}>
			<div style={{
				height: "10px",
				width: "10px",
				backgroundColor: '#5DC983',
				borderRadius: '50%',
				marginRight: '4px'
			}}/>
			Low</div>
	},
	{
		value: 'Medium',
		label: <div style={{display: "flex", alignItems: "center"}}>
			<div style={{
				height: "10px",
				width: "10px",
				backgroundColor: '#FBA63C',
				borderRadius: '50%',
				marginRight: '4px'
			}}/>
			Medium </div>
	},
	{
		value: 'High',
		label: <div style={{display: "flex", alignItems: "center"}}>
			<div style={{
				height: "10px",
				width: "10px",
				backgroundColor: '#ED6B3E',
				borderRadius: '50%',
				marginRight: '4px'
			}}/>
			High </div>
	}
];

const campaignDate = [
	{Created: '-'},
	{Updated: '-'}
]


const Create_Campaigns = () => {
	const [TL, setTL] = useState([]);
	const [isSending, setIsSending] = useState(false);
	const [initial, setInitial] = useState(true);
	const [isLoading, setIsLoading] = useState(true);
	const [brands, setBrands] = useState([]);

	const [toggleInfluencerBudget, setToggleInfluencerBudget] = useState(false);
	const [toggleSocialBudget, setToggleSocialBudget] = useState(false);
	const [toggleProductionBudget, setToggleProductionBudget] = useState(false);
	const [toggleTravelBudget, setToggleTravelBudget] = useState(false);
	const [toggleHandlingFee, setToggleHandlingFee] = useState(false);
	const [toggleOtherBudget, setToggleOtherBudget] = useState(false);

	const fileInput = useRef(null);
	// const toggleInfluencerBudget = useRef(null);
	// const toggleSocialBudget = useRef(null);
	// const toggleProductionBudget = useRef(null);
	// const toggleTravelBudget = useRef(null);
	// const toggleHandlingFee = useRef(null);
	// const toggleOtherBudget = useRef(null);

	const ref = {
		toggleInfluencerBudget,
		toggleSocialBudget,
		toggleProductionBudget,
		toggleTravelBudget,
		toggleHandlingFee,
		toggleOtherBudget,

	}
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


	useEffect(() => {
		window.focus();
		window.scrollTo(0, 0);

		async function Start() {
			setInitial(false);
			setIsLoading(true);

			const initialTL = await UserService.getUsers({role: 'manager'});
			if (initialTL) {
				const arr = [];
				initialTL.forEach((user) => {
					const tl = {value: user._id, label: user.full_name};
					arr.push(tl);
				})
				setTL(arr);
			}

			const initialBrands = await BrandService.getBrands();
			if (initialBrands) {
				const arr = [];
				initialBrands.forEach((brand) => {
					const br = {value: brand._id, label: brand.name};
					arr.push(br);
				})
				setBrands(arr);
			}

			setIsLoading(false);
		}


		if (initial) {
			Start();
		}
	})

	const loadBrands = async () => {
		const initialBrands = await BrandService.getBrands();
		if (initialBrands) {
			const arr = [];
			initialBrands.forEach((brand) => {
				const br = {value: brand._id, label: brand.name};
				arr.push(br);
			})
			setBrands(arr);
		}
	}

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
					title='Сreate Campaign'
					leftArrow={leftArrow}
					btnHeader={isSending ? classes.btnHeaderDisabled : classes.btnHeader}
					button={(e) => saveChanges(e)}
					isSending={isSending}
			/>
			<div>
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
									  options={status}
									  name='status'
									  valid={!!values.role}
									  onChange={(e) => handleChangeRole(e)}
							/>

							{errors.role && errors.role.length ?
								<div className={`${classes.errorDiv} ${classes.roleErrorPos}`}>
									{errors.role}</div> : ''}

							<label className={classes.input_title}>Effort</label>
							<Dropdown required
									  options={effort}
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
									<DropdownSmall requiredF
												   name='status'
												   valid={!!values.role}
												   onChange={(e) => handleChangeRole(e)}
									/>
								</div>
								<div className={classes.wrapperColumn}>
									<label className={classes.input_title}>End Date</label>
									<DropdownSmall required
												   className={classes.DropDown}
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
										  options={brands}
										  name='status'
										  valid={!!values.role}
										  onChange={(e) => handleChangeRole(e)}
								/>

								{errors.role && errors.role.length ?
									<div className={`${classes.errorDiv} ${classes.roleErrorPos}`}>
										{errors.role}</div> : ''}

								<div className={classes.flexRow} id={'main'}>
									<Modal loadBrands={loadBrands}/>
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
								  options={TL}
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
								campaignDate.map(value => value.Created)
							}
						</div>

						<label className={classes.input_title}>Last Campaign Update</label>
						<div>
							{
								campaignDate.map(value => value.Updated)
							}
						</div>

					</section>


				</div>
			</div>

			<div className={classes.mainContainerButton}>
				<div className={classes.mainContainerButtonLeft}>
					<div className={`${classes.labelBudget}`}>
						<label className={`${classes.input_title} `}>Budgets & Targets</label>
					</div>

					<div className={classes.checkBoxDiv}>
						<input
							type='checkbox'
							className={classes.customCheckbox}
							id='check1'
						/>
						<label htmlFor='check1' className={classes.input_title}>Campaign won’t have a budget</label>
					</div>

					<div className={classes.inputTotalBudget}>
						<label className={classes.input_title}>Total Budget</label>
					</div>
					<div className={`${classes.input_info_valid} ${classes.inputBox}`}>
						<span className="prefix">$</span>
						<input className={`${classes.input_info_budget}`} type='text'/>
					</div>


					<ToggleSwitch className={classes.toggleSwitch}
								  onColor={'#FF650E'}
								  checked={toggleInfluencerBudget}
								  onChange={(e) => setToggleInfluencerBudget(e)}
								  />
					<ToggleSwitch onColor={'#FF650E'}
								  className={classes.toggleSwitch}
								  checked={toggleSocialBudget}
								  onChange={(e) => setToggleSocialBudget(e)}
							/>
					<ToggleSwitch onColor={'#FF650E'}
								  className={classes.toggleSwitch}
								  checked={toggleProductionBudget}
								  onChange={(e) => setToggleProductionBudget(e)}
								 />
					<ToggleSwitch onColor={'#FF650E'}
								  className={classes.toggleSwitch}
								  checked={toggleTravelBudget}
								  onChange={(e) => setToggleTravelBudget(e)}
								  />
					<ToggleSwitch onColor={'#FF650E'}
								  className={classes.toggleSwitch}
								  checked={toggleHandlingFee}
								  onChange={(e) => setToggleHandlingFee(e)}
								/>
					<ToggleSwitch onColor={'#FF650E'}
								  className={classes.toggleSwitch}
								  checked={toggleOtherBudget}
								  onChange={(e) => setToggleOtherBudget(e)}
								 />
				</div>
			</div>
		</form>
	);
}

export default Create_Campaigns;
