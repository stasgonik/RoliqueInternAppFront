import React, { Component, useEffect, useRef, useState } from 'react';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import classes from "./EditCampaign.module.css";

import Sidebar from "../Items/Sidebar/Sidebar";
import Header from "../Items/Header/Header";
import leftArrow from "../Items/Icons/arrow-left.svg";
import { INFO } from "../../Constants/messages";
import Modal from '../Items/Modal_PopUp/Modal_PopUp';
import Dropdown from "../Items/Dropdown/Dropdown";
import configFront from "../../Constants/configFront";
import routes from "../../Constants/routes.enum";
// import plus from '../../img/Create_Campaign/Icon.svg';
import CampaignService from "../../Services/campaign.service";
import UserService from "../../Services/userService";
import BrandService from "../../Services/brand.service";
import { ToggleSwitch } from 'react-dragswitch';
import 'react-dragswitch/dist/index.css';
import arrow from '../Items/Icons/caret-down.svg';
// import {element} from "prop-types";
import ChipInput from 'material-ui-chip-input';
import Chip from '@material-ui/core/Chip';
import Error from "../Items/Messages/Messages";
import { useParams } from "react-router-dom";
// import {classNames} from "react-select/src/utils";

let status = [
    {
        value: 'Requested',
        label: <div style={{ display: "flex", alignItems: "center" }}>
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
        label: <div style={{ display: "flex", alignItems: "center" }}>
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
        label: <div style={{ display: "flex", alignItems: "center" }}>
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
        label: <div style={{ display: "flex", alignItems: "center" }}>
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
        label: <div style={{ display: "flex", alignItems: "center" }}>
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
        label: <div style={{ display: "flex", alignItems: "center" }}>
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
        label: <div style={{ display: "flex", alignItems: "center" }}>
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
        label: <div style={{ display: "flex", alignItems: "center" }}>
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


export const EditCampaign = () => {
    const params = useParams();
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

            const initialTL = await UserService.getUsers({ role: 'manager' });
            if (initialTL) {
                const arr = [];
                initialTL.forEach((user) => {
                    const tl = { value: user._id, label: user.full_name };
                    arr.push(tl);
                })
                setTL(arr);
            }

            const initialBrands = await BrandService.getBrands();
            if (initialBrands) {
                const arr = [];
                initialBrands.forEach((brand) => {
                    const br = { value: brand._id, label: brand.name };
                    arr.push(br);
                })
                setBrands(arr);
            }
            const initialCampaign = await CampaignService.getSingleCampaign(params[routes.CAMPAIGN_ID])
            if (initialCampaign.start_date && initialCampaign.end_date) {
                initialCampaign.start_date = new Date(initialCampaign.start_date)
                initialCampaign.end_date = new Date(initialCampaign.end_date)
                initialCampaign.createdAt = new Date(initialCampaign.createdAt).toISOString().split('T').shift().split('-').reverse().join('.')
                initialCampaign.updatedAt = new Date(initialCampaign.updatedAt).toISOString().split('T').shift().split('-').reverse().join('.')
            }

            setValues(initialCampaign)

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
                const br = { value: brand._id, label: brand.name };
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

        setValues({ ...values, budget: { ...values.budget, totalBudget: value } })
    }

    const handleSubBudgetChange = (e) => {
        let value = +e.target.value;

        if (value < 0) {
            value = value * (-1);
            e.target.value = value;
        }

        setValues({
            ...values,
            budget: { ...values.budget, subBudgets: { ...values.budget.subBudgets, [e.target.name]: value } }
        })
    }

    const wheelClean = (e) => {
        e.preventDefault();
        e.target.blur();
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setValues({ ...values, [e.target.name]: value });

    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleChangeDropdown = (e, name) => {
        const value = e.value;
        setValues({ ...values, [name]: value })
        console.log(values)
    };

    const selected = (e) => {
        let img = e.target.files[0];
        if (!img) {
            setValues({ ...values, avatar: '' })
            return
        }
        img.preview = URL.createObjectURL(img)
        setValues({ ...values, [e.target.name]: img })
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

        if ((values.start_date && !values.end_date) || (!values.start_date && values.end_date)) {
            formIsValid = false;
            errors["date"] = INFO.DATE_ERROR;
        }

        if ((values["start_date"] && values["end_date"]) && (values["start_date"] > values["end_date"])) {
            formIsValid = false;
            errors["date"] = INFO.DATE_VALID_ERROR;
        }

        if (values['budget']) {
            let bud = typeof values['budget'] === "string" ? JSON.parse(values.budget) : values.budget
            let sum = 0;
            for (const keys in bud.subBudgets) {
                sum += +bud.subBudgets[keys]
            }
            if (bud.totalBudget !== sum && Object.keys(bud.subBudgets).length) {
                formIsValid = false
                errors['budget'] = sum > bud.totalBudget ? `Budgets below are $${sum - bud.totalBudget} over the Total Budget` : `Budgets below are $${bud.totalBudget - sum} less then the Total Budget`
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
        const v = values;
        if (!e) {
            delete v.budget.subBudgets[name];
        }
//        if (e) {
//            v.budget.subBudgets[name] = 0;
//        }
        setValues({ ...v })
    }

    const saveChanges = async () => {
        setIsSending(true)
        const formData = new FormData();

        const data = { ...values }


        if (data["avatar"] === "") {
            delete data["avatar"]
        }

        if (data.start_date === null) {
            delete data.start_date
        }

        if (data.end_date === null) {
            delete data.end_date
        }
        if (data.hashtags === null) {
            delete data.hashtags
        }
        if (data.budget) {
            delete data.budget._id
        }

        if (data.budget) {
            data.budget = JSON.stringify(data.budget)
        }

        if (data.hashtags) {
            data.hashtags = JSON.stringify(data.hashtags)
        }


        delete data.brand
        delete data.team_lead
        delete data.createdAt
        delete data.updatedAt
        delete data.__v
        delete data._id
        delete data.campaign_logo
        delete data.id
        console.log(data, 'values');
        console.log(values, 'values');
        for (const value in data) {
            formData.append(value, data[value])
        }

        if (handleValidation(data)) {
            const result = await CampaignService.updateCampaign(formData, params[routes.CAMPAIGN_ID]);
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

    const checkBox = ({ target: { checked } }) => {
        let clear = document.getElementById('xxx');
        console.log(values);
        let v = values;
        if (checked) {
            delete v.budget;
            setValues({ ...v })

        } else {
            v.budget = {
                totalBudget: 0,
                subBudgets: {}
            }
            setValues({ ...v })
        }
    }
    const checkboxHash = ({ target: { checked } }) => {
        let input = document.getElementById('hashTagdisabled');
        let v = values;
        if (checked) {
            v.hashtags = null
            input.setAttribute('disabled', true);
        } else {
            v.hashtags = []
            input.removeAttribute('disabled');
        }
        setValues({ ...v })
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
        setValues({ ...v })
    }


    const handleAddChip = (chip) => {

        const v = values;
        v.hashtags.push(chip)
        setValues({ ...v })
    }

    const handleDeleteChip = (chip) => {
        const v = values;
        let arr = values.hashtags.filter((value, i) => value !== chip)
        v.hashtags = arr;
        setValues({ ...v })
    }


    return (
        <form className={classes.mainBlock} onSubmit={(e) => handleSubmit(e)}>
            <Sidebar/>
            <Header name={'Edit'} titleHeader={classes.title}
                    titleBtn={isSending ? "Sending" : 'Save Changes'}
                    title='Edit Campaign'
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
                            <input
                                className={!values.title ? classes.input_info : `${classes.input_info_valid} ${classes.input_info_valid_title}`}
                                type='text'
                                name='title'
                                value={values.title}
                                onInput={(e) => handleChange(e)}
                            />

                            {errors.title && errors.title.length ?
                                <div
                                    className={`${classes.errorDiv} ${classes.roleErrorPos}`}>{errors.title}</div> : ''}


                            <label className={classes.input_title}>Status</label>
                            <Dropdown required
                                      defaultValue={values.status}
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
                                      defaultValue={values.effort}
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
                                        onChange={(date) => setValues({ ...values, start_date: date })}
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
                                        onChange={(date) => setValues({ ...values, end_date: date })}
                                        popperClassName={classes.properClass}
                                        calendarClassName={classes.calendar}
                                        placeholderText={'Select...'}
                                    />
                                </div>
                            </div>

                            {errors.date && errors.date.length ?
                                <div className={`${classes.errorDiv} ${classes.roleErrorPos} ${classes.positionDate}`}>
                                    {errors.date}</div> : ''}

                            <label style={values.hashtags === null ? { opacity: '0.6' } : {}}
                                   className={classes.input_title}>Hashtags</label>
                            <ChipInput
                                disabled={values.hashtags === null}
                                style={values.hashtags === null ? { opacity: '0.3' } : {}}
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
                                    checked={values.hashtags === null}
                                    onChange={checkboxHash}
                                />
                                <label for='check1' className={classes.input_title}>Campaign won’t have a
                                    hashtag</label>
                            </div>

                        </section>

                        <section className={classes.leftContainer}>
                            <div>
                                <h3 className={classes.rightContainer_title}>Client</h3>

                                <label className={classes.input_title}>Brand</label>
                                <Dropdown required
                                          options={brands}
                                          name='_brand'
                                          defaultValue={values && values.brand && values.brand[0] && values.brand[0].name && values.brand[0].name}
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
                                  defaultValue={values && values.team_lead && values.team_lead[0] && values.team_lead[0].full_name && values.team_lead[0].full_name}
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
                               style={{ display: 'none' }}
                               onChange={(e) => selected(e)}
                               ref={fileInput}
                        />

                        <button className={classes.avatar} onClick={() => fileInput.current.click()}>
                            {values.campaign_logo ? <img
                                src={!values.avatar ? values.campaign_logo : values.avatar.preview}
                                style={{
                                    minWidth: 64,
                                    minHeight: 64,
                                    borderRadius: 50
                                }} alt={'alt'}/> : '+'}
                        </button>
                        {errors.avatar && errors.avatar.length ?
                            <div className={classes.errorDiv}>{errors.avatar}</div> : ''}

                        <label className={classes.input_title}>Client Description</label>
                        <div className={classes.clientDesc}>
                            <textarea name={'client_description'} onInput={(e) => handleTextInput(e)}
                                      defaultValue={values && values.client_description && values.client_description}
                                      className={classes.textarea} wrap="hard" rows={3}/>
                        </div>


                        <label className={classes.input_title}>Internal Notes</label>
                        <div className={classes.clientDesc}>
                            <textarea name={'internal_note'} onInput={(e) => handleTextInput(e)}
                                      defaultValue={values && values.internal_note && values.internal_note}
                                      className={classes.textarea} wrap="hard" rows={3}/>
                        </div>

                        <label className={classes.input_title}>Campaign Created</label>
                        <div>
                            {values && values.createdAt && values.createdAt}
                        </div>

                        <label className={classes.input_title}>Last Campaign Update</label>
                        <div>
                            {values && values.updatedAt && values.updatedAt}
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
                            checked={!values.budget}
                        />
                        <label For='check2' className={classes.input_title}>Campaign won’t have a budget</label>
                    </div>
                    {values.budget ? <div id={'xxx'}>
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

                        {errors.budget && errors.budget.length ?
                            <Error color={{ backgroundColor: '#FEEFEF', margin: '8px 0' }}
                                   colorRound={'colorRound'} message={errors.budget}/> : ''}

                        <div className={classes.containerBudget}>

                            <div className={classes.mainToggleSwitch}>
                                <ToggleSwitch className={classes.toggleSwitch}
                                              onColor={'#FF650E'}
                                    //                                              checked={toggleInfluencerBudget}
                                              checked={values.budget.subBudgets.influencerBudget || toggleInfluencerBudget}
                                              onChange={(e) => check(e, setToggleInfluencerBudget, 'influencerBudget')}
                                />
                                <ToggleSwitch onColor={'#FF650E'}
                                              className={classes.toggleSwitch}
                                              checked={values.budget.subBudgets.socialAdsMediaBudget || toggleSocialBudget}
                                              onChange={(e) => check(e, setToggleSocialBudget, 'socialAdsMediaBudget')}
                                />
                                <ToggleSwitch onColor={'#FF650E'}
                                              className={classes.toggleSwitch}
                                              checked={values.budget.subBudgets.productionBudget || toggleProductionBudget}
                                              onChange={(e) => check(e, setToggleProductionBudget, 'productionBudget')}
                                />
                                <ToggleSwitch onColor={'#FF650E'}
                                              className={classes.toggleSwitch}
                                              checked={values.budget.subBudgets.travelBudget || toggleTravelBudget}
                                              onChange={(e) => check(e, setToggleTravelBudget, 'travelBudget')}
                                />
                                <ToggleSwitch onColor={'#FF650E'}
                                              className={classes.toggleSwitch}
                                              checked={values.budget.subBudgets.handlingFee || toggleHandlingFee}
                                              onChange={(e) => check(e, setToggleHandlingFee, 'handlingFee')}
                                />
                                <ToggleSwitch onColor={'#FF650E'}
                                              className={classes.toggleSwitch}
                                              checked={values.budget.subBudgets.otherBudget || toggleOtherBudget}
                                              onChange={(e) => check(e, setToggleOtherBudget, 'otherBudget')}
                                />
                            </div>


                            <div className={classes.inputBudget}>
                                <div
                                    className={!values.budget.subBudgets.influencerBudget && !toggleInfluencerBudget ? classes.inputDisabled : ''}>
                                    <label className={classes.input_title}>Influencer Budget</label>
                                    <div
                                        className={`${classes.input_info_valid} ${classes.inputBox} ${classes.inputBoxSize}`}>
                                        <span className="prefix">$</span>
                                        <input className={`${classes.input_info_budget}`}
                                               type={'number'}
                                               min="0"
                                               disabled={values.budget && !values.budget.subBudgets.influencerBudget && !toggleInfluencerBudget}
                                               name='influencerBudget'
                                               value={!values.budget || !values.budget.subBudgets['influencerBudget'] ? '' : values.budget.subBudgets['influencerBudget']}
                                               onInput={(e) => handleSubBudgetChange(e)}/>
                                    </div>
                                </div>

                                <div
                                    className={!values.budget.subBudgets.socialAdsMediaBudget && !toggleSocialBudget ? classes.inputDisabled : ''}>
                                    <label className={classes.input_title}>Social Ads Media Budget</label>
                                    <div
                                        className={`${classes.input_info_valid} ${classes.inputBox} ${classes.inputBoxSize}`}>
                                        <span className="prefix">$</span>
                                        <input className={`${classes.input_info_budget}`}
                                               disabled={values.budget && !values.budget.subBudgets.socialAdsMediaBudget && !toggleSocialBudget}
                                               type={'number'}
                                               min="0"
                                               name='socialAdsMediaBudget'
                                               value={!values.budget || !values.budget.subBudgets['socialAdsMediaBudget'] ? '' : values.budget.subBudgets['socialAdsMediaBudget']}
                                               onInput={(e) => handleSubBudgetChange(e)}/>
                                    </div>
                                </div>

                                <div
                                    className={!values.budget.subBudgets.productionBudget && !toggleProductionBudget ? classes.inputDisabled : ''}>
                                    <label className={classes.input_title}>Production Budget</label>
                                    <div
                                        className={`${classes.input_info_valid} ${classes.inputBox} ${classes.inputBoxSize}`}>
                                        <span className="prefix">$</span>
                                        <input className={`${classes.input_info_budget}`}
                                               disabled={values.budget && !values.budget.subBudgets.productionBudget && !toggleProductionBudget}
                                               type={'number'}
                                               min="0"
                                               name='productionBudget'
                                               value={!values.budget || !values.budget.subBudgets['productionBudget'] ? '' : values.budget.subBudgets['productionBudget']}
                                               onInput={(e) => handleSubBudgetChange(e)}
                                        />
                                    </div>
                                </div>

                                <div
                                    className={!values.budget.subBudgets.travelBudget && !toggleTravelBudget ? classes.inputDisabled : ''}>
                                    <label className={classes.input_title}>Travel Budget</label>
                                    <div
                                        className={`${classes.input_info_valid} ${classes.inputBox} ${classes.inputBoxSize}`}>
                                        <span className="prefix">$</span>
                                        <input className={`${classes.input_info_budget}`}
                                               disabled={values.budget && !values.budget.subBudgets.travelBudget && !toggleTravelBudget}
                                               type={'number'}
                                               min="0"
                                               name='travelBudget'
                                               value={!values.budget || !values.budget.subBudgets['travelBudget'] ? '' : values.budget.subBudgets['travelBudget']}
                                               onInput={(e) => handleSubBudgetChange(e)}
                                        />
                                    </div>
                                </div>

                                <div
                                    className={!values.budget.subBudgets.handlingFee && !toggleHandlingFee ? classes.inputDisabled : ''}>
                                    <label className={classes.input_title}>Handling Fee</label>
                                    <div
                                        className={`${classes.input_info_valid} ${classes.inputBox} ${classes.inputBoxSize}`}>
                                        <span className="prefix">$</span>
                                        <input className={`${classes.input_info_budget}`}
                                               disabled={values.budget && !values.budget.subBudgets.handlingFee && !toggleHandlingFee}
                                               type={'number'}
                                               min="0"
                                               name='handlingFee'
                                               value={!values.budget || !values.budget.subBudgets['handlingFee'] ? '' : values.budget.subBudgets['handlingFee']}
                                               onInput={(e) => handleSubBudgetChange(e)}
                                        />
                                    </div>
                                </div>

                                <div
                                    className={!values.budget.subBudgets.otherBudget && !toggleOtherBudget ? classes.inputDisabled : ''}>
                                    <label className={classes.input_title}> Other Budget</label>
                                    <div
                                        className={`${classes.input_info_valid} ${classes.inputBox} ${classes.inputBoxSize}`}>
                                        <span className="prefix">$</span>
                                        <input className={`${classes.input_info_budget}`}
                                               disabled={values.budget && !values.budget.subBudgets.otherBudget && !toggleOtherBudget}
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
                    </div> : <div className={classes.displayNone}></div>}
                </div>
            </div>
        </form>
    );
}
