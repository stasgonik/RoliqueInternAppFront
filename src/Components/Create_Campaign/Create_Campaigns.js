import React, {Component, useEffect, useRef, useState} from 'react';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
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
import {ToggleSwitch} from 'react-dragswitch';
import 'react-dragswitch/dist/index.css';
import arrow from '../Items/Icons/caret-down.svg';
// import {element} from "prop-types";
import ChipInput from 'material-ui-chip-input';
import Chip from '@material-ui/core/Chip';
import Error from "../Items/Messages/Messages";
// import {classNames} from "react-select/src/utils";

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
		value: 'Not set',
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
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

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
		start_date: null,
		end_date: null,
		status: '',
		effort: '',
		hashtags: [],
		_brand: '',
		_team_lead: '',
		budget: {
			totalBudget: 0,
			subBudgets: {}
		}
	});

	const [errors, setErrors] = useState({
		avatar: '',
		title: '',
		status: '',
		effort: '',
		date: '',
		_brand: '',
		_team_lead: '',
		budget: ''
	});


	useEffect(() => {

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

	const handleTotalBudgetChange = (e) => {
		let value = +e.target.value;

		if (value < 0) {
			value = value * (-1);
			e.target.value = value;
		}

		setValues({...values, budget: {...values.budget, totalBudget: value}})
	}

	const handleSubBudgetChange = (e) => {
		let value = +e.target.value;

		if (value < 0) {
			value = value * (-1);
			e.target.value = value;
		}

		setValues({...values, budget: {...values.budget, subBudgets: {...values.budget.subBudgets, [e.target.name]: value}}})
	}

	const wheelClean = (e) => {
		e.preventDefault();
		e.target.blur();
	}

	const handleChange = (e) => {
		const value = e.target.value;
		setValues({...values, [e.target.name]: value});

	}

	const handleSubmit = (e) => {
		e.preventDefault()
	}

	const handleChangeDropdown = (e, name) => {
		const value = e.value;
		setValues({...values, [name]: value})
		console.log(values)
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
			title: '',
			status: '',
			effort: '',
			date: '',
			_brand: '',
			_team_lead: '',
			budget: ''
		};
		let formIsValid = true;

		// if (typeof values["password"] !== "undefined") {
		// 	if (!values["password"].match(regexp.PASSWORD_REGEXP)) {
		// 		formIsValid = false;
		// 		errors["password"] = INFO.INVALID_PASSWORD_PATTERN
		// 	}
		// }

		if (!values["title"] || !values["title"].length) {
			formIsValid = false;
			errors["title"] = INFO.EMPTY_FIELD
		}

		if (!values["status"] || !values["status"].length) {
			formIsValid = false;
			errors["status"] = INFO.EMPTY_FIELD
		}

		if (!values["effort"] || !values["effort"].length) {
			formIsValid = false;
			errors["effort"] = INFO.EMPTY_FIELD
		}

		if (!values["_brand"] || !values["_brand"].length) {
			formIsValid = false;
			errors["_brand"] = INFO.EMPTY_FIELD
		}

		if (!values["_team_lead"] || !values["_team_lead"].length) {
			formIsValid = false;
			errors["_team_lead"] = INFO.EMPTY_FIELD
		}

		if ((values.start_date && ! values.end_date) || (!values.start_date && values.end_date)) {
			formIsValid = false;
			errors["date"] = INFO.DATE_ERROR;
		}

		if ((values["start_date"] && values["end_date"]) && (values["start_date"] > values["end_date"])) {
			formIsValid = false;
			errors["date"] = INFO.DATE_VALID_ERROR;
		}

		if (values['budget']) {
			let bud = typeof values['budget'] === "string"? JSON.parse(values.budget) : values.budget
			let sum = 0;
			for (const keys in bud.subBudgets) {
				sum += +bud.subBudgets[keys]
			}
			if (bud.totalBudget !== sum && Object.keys(bud.subBudgets).length) {
				formIsValid = false
				errors['budget'] = sum > bud.totalBudget? `Budgets below are $${sum - bud.totalBudget} over the Total Budget` : `Budgets below are $${bud.totalBudget - sum} less then the Total Budget`
			}
		}



		setErrors(errors);
		if (!formIsValid) {
			setIsSending(false)
		}
		return formIsValid;
	}

	const check = (e, setter, name) => {
		setter(e);
		if (!e) {
			const v = values;
			delete v.budget.subBudgets[name];
			setValues({...v})
		}
	}

	const saveChanges = async () => {
		setIsSending(true)
		const formData = new FormData();

		if (values["avatar"] === "") {
			delete values["avatar"]
		}

		if (values.start_date === null) {
			delete values.start_date
		}

		if (values.end_date === null) {
			delete values.end_date
		}
		let h = values.hashtags;
		if (!values.hashtags.length) {
			delete values.hashtags
		}

		let b = values.budget;
		if (values.budget) {
			values.budget = JSON.stringify(values.budget)
		}

		if (values.hashtags) {
			values.hashtags = JSON.stringify(values.hashtags)
		}


		for (const value in values) {
			formData.append(value, values[value])
		}

		let ht = h.length ? h : [];
		let st = values.start_date ? values.start_date : null;
		let en = values.end_date ? values.end_date : null;
		let av = values["avatar"] ? values['avatar'] : "";
		const restore = {avatar: av, start_date: st, end_date: en, hashtags: ht}
		if (b) {
			restore.budget = b
		}
		setValues({...values, ...restore})

		if (handleValidation()) {
			const result = await CampaignService.postCampaign(formData);
			if (result) {
				setIsSending(false)
				console.log(result)
				if (result.status === 200) {
					window.location.href = configFront.URL + `${routes.CAMPAIGNS}`;
					return
				}

				let errors = {
					avatar: '',
					title: '',
					status: '',
					effort: '',
					date: '',
					_brand: '',
					_team_lead: '',
					budget: ''
				};

				if (result.status === 403) {
					window.location.href = configFront.URL + `${routes.CAMPAIGNS}`;
					return
				}

				if (typeof result.data !== "undefined") {

					if (result.data.customCode === 4005) {
						errors["avatar"] = INFO.TOO_BIG_PHOTO
						setErrors(errors);
						return
					}

					if (result.data.customCode === 40012) {
						errors["title"] = INFO.CAMPAIGN_ALREADY_EXIST
						setErrors(errors);
						return
					}
				}

				if (result.status === 500) {
					errors["title"] = INFO.SERVER_ERROR
					setErrors(errors);
					console.log(result);
					return
				}

				if (result.status !== 200) {
					errors["title"] = INFO.UNKNOWN_ERROR
					setErrors(errors);
					console.log(result);
					return
				}
			}
		}
	}

	const checkBox = ({target: {checked}}) => {
		let clear = document.getElementById('xxx');
		let v = values;
		if (checked) {
			delete v.budget;
			setValues({...v})

			clear.style.visibility = 'hidden'
		} else {
			v.budget = {
				totalBudget: 0,
				subBudgets: {}
			}
			setValues({...v})
			clear.style.visibility = 'visible'
		}
	}
	const checkboxHash = ({target: {checked}}) => {
		let input = document.getElementById('hashTagdisabled');
		let v = values;
		v.hashtags = []
		setValues({...v})
		if (checked) {
			input.setAttribute('disabled', true);
		} else {
			input.removeAttribute('disabled');
		}
	}

	const handleTextInput = (e) => {
		e.preventDefault();
		const value = e.target.value;
		const v = values;
		if (value === '') {
			delete v[e.target.name];
		} else {
			v[e.target.name] = value;
		}
		setValues({...v})
	}


	const handleAddChip = (chip) => {

		const v = values;
		v.hashtags.push(chip)
		setValues({...v})
	}

	const handleDeleteChip = (chip) => {
		const v = values;
		let arr = values.hashtags.filter((value, i) => value !== chip)
		v.hashtags = arr;
		setValues({...v})
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
						<input className={!values.title ? classes.input_info : `${classes.input_info_valid} ${classes.input_info_valid_title}`}
							   type='text'
							   name='title'
							   value={values.title}
							   onInput={(e) => handleChange(e)}
						/>

						{errors.title && errors.title.length ?
							<div className={`${classes.errorDiv} ${classes.roleErrorPos}`}>{errors.title}</div> : ''}


						<label className={classes.input_title}>Status</label>
						<Dropdown required
								  options={status}
								  name='status'
								  valid={!!values.status}
								  onChange={(e) => handleChangeDropdown(e, 'status')}
						/>

						{errors.status && errors.status.length ?
							<div className={`${classes.errorDiv} ${classes.roleErrorPos}`}>
								{errors.status}</div> : ''}

						<label className={classes.input_title}>Effort</label>
						<Dropdown required
								  options={effort}
								  name='Effort'
								  valid={!!values.effort}
								  onChange={(e) => handleChangeDropdown(e, 'effort')}
						/>

						{errors.effort && errors.effort.length ?
							<div className={`${classes.errorDiv} ${classes.roleErrorPos}`}>
								{errors.effort}</div> : ''}

						<div className={classes.wrapper}>
							<div className={classes.wrapperColumn}>
								<label className={classes.input_title}>Start Date</label>

								<div className={classes.arrow_down}>
									<img src={arrow} alt="arrow"/>
								</div>
								<DatePicker
									className={classes.myDatePicker}
									selected={values.start_date}
									onChange={(date) => setValues({...values, start_date: date})}
									popperClassName={classes.properClass}
									placeholderText={'Select...'}
								/>
							</div>

							<div className={classes.wrapperColumn}>
								<label className={classes.input_title}>End Date</label>

								<div className={classes.arrow_down}>
									<img src={arrow} alt="arrow"/>
								</div>

								<DatePicker
									className={classes.myDatePicker}
									selected={values.end_date}
									onChange={(date) => setValues({...values, end_date: date})}
									popperClassName={classes.properClass}
									calendarClassName={classes.calendar}
									placeholderText={'Select...'}
								/>
							</div>
						</div>

						{errors.date && errors.date.length ?
							<div className={`${classes.errorDiv} ${classes.roleErrorPos} ${classes.positionDate}`}>
								{errors.date}</div> : ''}

						<label className={classes.input_title}>Hashtags</label>
						<ChipInput
							value={values.hashtags}
							onAdd={(chip) => handleAddChip(chip)}
							onDelete={(chip) => handleDeleteChip(chip)}
							className={classes.hashtagInput}
							disableUnderline={true}
							id={'hashTagdisabled'}
						/>

						{/*{errors.title && errors.title.length ?*/}
						{/*	<div className={classes.errorDiv}>{errors.title}</div> : ''}*/}

						<div className={classes.checkBoxDiv}>
							<input
								type='checkbox'
								className={classes.customCheckbox}
								id='check1'
								onChange={checkboxHash}
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
									  name='_brand'
									  valid={!!values._brand}
									  onChange={(e) => handleChangeDropdown(e, '_brand')}
							/>

							{errors._brand && errors._brand.length ?
								<div className={`${classes.errorDiv} ${classes.roleErrorPos}`}>
									{errors._brand}</div> : ''}

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
							  name='_team_lead'
							  valid={!!values._team_lead}
							  onChange={(e) => handleChangeDropdown(e, '_team_lead')}
					/>

					{errors._team_lead && errors._team_lead.length ?
						<div className={`${classes.errorDiv} ${classes.roleErrorPos}`}>
							{errors._team_lead}</div> : ''}

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
							minWidth: 64,
							minHeight: 64,
							borderRadius: 50
						}} alt={'alt'}/> : '+'}
					</button>

					{errors.avatar && errors.avatar.length ?
						<div className={classes.errorDiv}>{errors.avatar}</div> : ''}

					<label className={classes.input_title}>Client Description</label>
					<div className={classes.clientDesc}>
						<textarea name={'client_description'} onInput={(e) => handleTextInput(e)} className={classes.textarea} wrap="hard" rows={3}/>
					</div>


					<label className={classes.input_title}>Internal Notes</label>
					<div className={classes.clientDesc}>
						<textarea name={'internal_note'} onInput={(e) => handleTextInput(e)} className={classes.textarea} wrap="hard" rows={3}/>
					</div>

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
						onChange={checkBox}
						id='check2'
					/>
					<label For='check2' className={classes.input_title}>Campaign won’t have a budget</label>
				</div>
				<div id={'xxx'}>
					<div className={classes.inputTotalBudget}>
						<label className={classes.input_title}>Total Budget</label>
					</div>
					<div className={`${classes.input_info_valid} ${classes.inputBox}`}>
						<span className="prefix">$</span>
						<input className={`${classes.input_info_budget}`}
							   type={'number'}
							   min="0"
							   value={!values.budget || !values.budget.totalBudget ? '' : values.budget.totalBudget}
							   onInput={(e) => handleTotalBudgetChange(e)}
							   onWheel={(e) => wheelClean(e)}
							   />
					</div>

					{errors.budget && errors.budget.length  ?
					<Error color={{backgroundColor: '#FEEFEF', margin: '8px 0'}}
						   colorRound={'colorRound'}  message={errors.budget}/> : ''}

					<div className={classes.containerBudget}>

						<div className={classes.mainToggleSwitch}>
							<ToggleSwitch className={classes.toggleSwitch}
										  onColor={'#FF650E'}
										  checked={toggleInfluencerBudget}
										  onChange={(e) => check(e, setToggleInfluencerBudget, 'influencerBudget')}
							/>
							<ToggleSwitch onColor={'#FF650E'}
										  className={classes.toggleSwitch}
										  checked={toggleSocialBudget}
										  onChange={(e) => check(e, setToggleSocialBudget, 'socialAdsMediaBudget')}
							/>
							<ToggleSwitch onColor={'#FF650E'}
										  className={classes.toggleSwitch}
										  checked={toggleProductionBudget}
										  onChange={(e) => check(e, setToggleProductionBudget, 'productionBudget')}
							/>
							<ToggleSwitch onColor={'#FF650E'}
										  className={classes.toggleSwitch}
										  checked={toggleTravelBudget}
										  onChange={(e) => check(e, setToggleTravelBudget, 'travelBudget')}
							/>
							<ToggleSwitch onColor={'#FF650E'}
										  className={classes.toggleSwitch}
										  checked={toggleHandlingFee}
										  onChange={(e) => check(e, setToggleHandlingFee, 'handlingFee')}
							/>
							<ToggleSwitch onColor={'#FF650E'}
										  className={classes.toggleSwitch}
										  checked={toggleOtherBudget}
										  onChange={(e) => check(e, setToggleOtherBudget, 'otherBudget')}
							/>
						</div>


						<div className={classes.inputBudget}>
							<div className={!toggleInfluencerBudget ? classes.inputDisabled : ''}>
								<label className={classes.input_title}>Influencer Budget</label>
								<div className={`${classes.input_info_valid} ${classes.inputBox} ${classes.inputBoxSize}`}>
									<span className="prefix">$</span>
									<input className={`${classes.input_info_budget}`}
										   type={'number'}
										   min="0"
										   disabled={!toggleInfluencerBudget}
										   name='influencerBudget'
										   value={!values.budget || !values.budget.subBudgets['influencerBudget'] ? '' : values.budget.subBudgets['influencerBudget']}
										   onInput={(e) => handleSubBudgetChange(e)}/>
								</div>
							</div>

							<div className={!toggleSocialBudget ? classes.inputDisabled : ''}>
								<label className={classes.input_title}>Social Ads Media Budget</label>
								<div className={`${classes.input_info_valid} ${classes.inputBox} ${classes.inputBoxSize}`}>
									<span className="prefix">$</span>
									<input className={`${classes.input_info_budget}`}
										   disabled={!toggleSocialBudget}
										   type={'number'}
										   min="0"
										   name='socialAdsMediaBudget'
										   value={!values.budget || !values.budget.subBudgets['socialAdsMediaBudget'] ? '' : values.budget.subBudgets['socialAdsMediaBudget']}
										   onInput={(e) => handleSubBudgetChange(e)}/>
								</div>
							</div>

							<div className={!toggleProductionBudget ? classes.inputDisabled : ''}>
								<label className={classes.input_title}>Production Budget</label>
								<div className={`${classes.input_info_valid} ${classes.inputBox} ${classes.inputBoxSize}`}>
									<span className="prefix">$</span>
									<input className={`${classes.input_info_budget}`}
										   disabled={!toggleProductionBudget}
										   type={'number'}
										   min="0"
										   name='productionBudget'
										   value={!values.budget || !values.budget.subBudgets['productionBudget'] ? '' : values.budget.subBudgets['productionBudget']}
										   onInput={(e) => handleSubBudgetChange(e)}
									/>
								</div>
							</div>

							<div className={!toggleTravelBudget ? classes.inputDisabled : ''}>
								<label className={classes.input_title}>Travel Budget</label>
								<div className={`${classes.input_info_valid} ${classes.inputBox} ${classes.inputBoxSize}`}>
									<span className="prefix">$</span>
									<input className={`${classes.input_info_budget}`}
										   disabled={!toggleTravelBudget}
										   type={'number'}
										   min="0"
										   name='travelBudget'
										   value={!values.budget || !values.budget.subBudgets['travelBudget'] ? '' : values.budget.subBudgets['travelBudget']}
										   onInput={(e) => handleSubBudgetChange(e)}
									/>
								</div>
							</div>

							<div className={!toggleHandlingFee ? classes.inputDisabled : ''}>
								<label className={classes.input_title}>Handling Fee</label>
								<div className={`${classes.input_info_valid} ${classes.inputBox} ${classes.inputBoxSize}`}>
									<span className="prefix">$</span>
									<input className={`${classes.input_info_budget}`}
										   disabled={!toggleHandlingFee}
										   type={'number'}
										   min="0"
										   name='handlingFee'
										   value={!values.budget || !values.budget.subBudgets['handlingFee'] ? '' : values.budget.subBudgets['handlingFee']}
										   onInput={(e) => handleSubBudgetChange(e)}
									/>
								</div>
							</div>

							<div className={!toggleOtherBudget ? classes.inputDisabled : ''}>
								<label className={classes.input_title}> Other Budget</label>
								<div className={`${classes.input_info_valid} ${classes.inputBox} ${classes.inputBoxSize}`}>
									<span className="prefix">$</span>
									<input className={`${classes.input_info_budget}`}
										   disabled={!toggleOtherBudget}
										   type={'number'}
										   min="0"
										   name='otherBudget'
										   value={!values.budget || !values.budget.subBudgets['otherBudget'] ? '' : values.budget.subBudgets['otherBudget']}
										   onWheel={(e) => wheelClean(e)}
										   onInput={(e) => handleSubBudgetChange(e)}
									/>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
	</form>
);
}

export default Create_Campaigns;
