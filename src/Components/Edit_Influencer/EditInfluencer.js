import React, {useRef, useState} from 'react';
import {
    useParams
} from "react-router-dom";

import classes from './EditInfluencer.module.css';
import configFront from "../../Constants/configFront";
import Header from '../Items/Header/Header';
import influerenceService from "../../Services/influencers.service";
import {INFO} from '../../Constants/messages';
import leftArrow from '../Items/Icons/arrow-left.svg';
import loading from "../../img/Loading.gif";
import regexp from "../../Constants/regexp.enum";
import routes from "../../Constants/routes.enum";
import Sidebar from '../Items/Sidebar/Sidebar'
import Tooltip from '../Items/Tooltip/Tooltip'


const EditInfluencer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const params = useParams();
    if (!params[routes.INFLUENCER_ID]) {
        window.location.href = configFront.URL + `${routes.INFLUENCERS}`
    }

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

    const [values, setValues] = useState(async () => {
        setIsLoading(true)
        const initialState = await influerenceService.getSingleInfluencer(params[routes.INFLUENCER_ID])
        const socialInfo = {};
        for (const social of initialState.social_profiles) {
            const network_name = `${social.social_network_name}_profile`
            const network_follower = `${social.social_network_name}_followers`
            socialInfo[network_name] = social.social_network_profile;
            socialInfo[network_follower] = social.social_network_followers.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        }

        setValues({
            first_name: initialState.first_name,
            last_name: initialState.last_name,
            profession: initialState.profession,
            ...socialInfo,
            profile_picture: initialState.profile_picture,
        })

        if (initialState.birthdate) {
            setValues({
                first_name: initialState.first_name,
                last_name: initialState.last_name,
                profession: initialState.profession,
                birthdate: initialState.birthdate.split('T').shift(),
                ...socialInfo,
                profile_picture: initialState.profile_picture,
            })
        } else {
            setValues({
                first_name: initialState.first_name,
                last_name: initialState.last_name,
                profession: initialState.profession,
                ...socialInfo,
                profile_picture: initialState.profile_picture,
            })
        }
        setIsLoading(false)
    });

    const [status, setStatus] = useState(false);
    const [edit, setEdit] = useState({});

    const [errors, setErrors] = useState({
        avatar: '',
        first_name: '',
        last_name: '',
        profession: '',
        birthdate: ''
    });

    const handleValidation = () => {
        let formIsValid = true;

        if (Object.keys(errors).length > 5) {
            for (let i = 0; i < Object.keys(errors).length; i++) {
                const key = Object.keys(errors)[i];
                const words = key.split('_')
                const target = words.pop();

                if (target === 'profile' && errors[key].length) {
                    formIsValid = false
                }

                if (target === 'followers' && errors[key].length) {
                    formIsValid = false
                }
            }
        }

        let error = {
            avatar: '',
            first_name: '',
            last_name: '',
            profession: '',
        };


        if (typeof edit["first_name"] !== "undefined") {
            if (!edit["first_name"].match(regexp.FIRST_LAST_NAME_REGEXP)) {
                formIsValid = false;
                error["first_name"] = INFO.INVALID_NAME_PATTERN
            }

            if (!edit["first_name"] || !edit["first_name"].length) {
                formIsValid = false;
                error["first_name"] = INFO.EMPTY_FIELD
            }

        }


        if (typeof edit["last_name"] !== "undefined") {
            if (!edit["last_name"].match(regexp.FIRST_LAST_NAME_REGEXP)) {
                formIsValid = false;
                error["last_name"] = INFO.INVALID_NAME_PATTERN
            }

            if (!edit["last_name"] || !edit["last_name"].length) {
                formIsValid = false;
                error["last_name"] = INFO.EMPTY_FIELD
            }
        }

        if (typeof edit["profession"] !== "undefined") {
            if (!edit["profession"].match(regexp.FIRST_LAST_NAME_REGEXP)) {
                formIsValid = false;
                error["profession"] = INFO.INVALID_NAME_PATTERN
            }


            if (!edit["profession"] || !edit["profession"].length) {
                formIsValid = false;
                error["profession"] = INFO.EMPTY_FIELD
            }
        }

        // if (!edit["birthdate"]) {
        //     formIsValid = false;
        //     errors["birthdate"] = INFO.EMPTY_FIELD
        // }


        setErrors(errors);

        if (!formIsValid) {
            setIsSending(false)
        }
        return formIsValid;
    }

    const handleChange = (e) => {
        let value = e.target.value;
        setStatus(true)

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
                    console.log(normalFoll)
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

            // if (value === '') {
            //     if (input.current.value === '') {
            //         inputFocus.current.style.borderColor = ''
            //         inputFocus.current.required = false
            //         input.current.style.borderColor = ''
            //         input.current.required = false
            //     } else {
            //         inputFocus.current.style.borderColor = 'red'
            //         inputFocus.current.required = true
            //     }
            // }
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

            // if (value === '') {
            //     if (input.current.value === '') {
            //         inputFocus.current.style.borderColor = ''
            //         inputFocus.current.required = false
            //         input.current.style.borderColor = ''
            //         input.current.required = false
            //     } else {
            //         inputFocus.current.style.borderColor = 'red'
            //         inputFocus.current.required = true
            //     }
            // }
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

        // if (value.length < 1) {
        //     delete edit[e.target.name]
        //     setEdit({...edit});
        //     return
        // }

        setEdit({...edit, [e.target.name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const selected = (e) => {
        let img = e.target.files[0];
        if (img) {
            setStatus(true)
            img.preview = URL.createObjectURL(img)
            setEdit({...edit, profile_picture: img})
        }
    }

    const saveChanges = async () => {
        setIsSending(true)
        const formData = new FormData();
        const arr = []
        let pp = false;
        if (edit.profile_picture) {
            pp = edit.profile_picture;
        }
        let bd = false;
        if (edit.birthdate) {
            pp = edit.birthdate;
        }

        for (const value in edit) {
            if (value.includes('followers') && (edit[value] !== 0)) {
                edit[value] = edit[value].split('.').join('')
            }

            arr.push(values[value])
            if (edit[value] === '') {
                if (value.includes('followers')) {
                    edit[value] = 0
                } else {
                    edit[value] = ''
                }

            }

            formData.append(value, edit[value])
            if (edit[value]) {
                edit[value] = edit[value].toString().split('.').join('').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
            }
        }

        if (bd) {
            if (pp) {
                // formData.set('profile_picture', pp, 'avatar.jpg')
                setEdit({...edit, avatar: pp, birthdate: bd})
            } else {
                setEdit({...edit, birthdate: bd})
            }

        } else if (pp) {
            // formData.set('profile_picture', pp, 'avatar.jpg')
            setEdit({...edit, profile_picture: pp})
        }


        if (status && edit && handleValidation()) {
            const result = await influerenceService.editInfluerence(formData, params[routes.INFLUENCER_ID]);
            if (result) {
                setIsSending(false)
                if (result.status === 200) {
                    window.location.href = configFront.URL + `${routes.INFLUENCERS}`;
                    return
                }

                let errors = {
                    avatar: '',
                    first_name: '',
                    last_name: '',
                    profession: '',
                    // birthdate: ''
                };


                if (result.status === 403) {
                    window.location.href = configFront.URL + `${routes.INFLUENCERS}`;
                    return
                }

                if (typeof result.data !== "undefined") {


                    if (result.data.customCode === 4000) {
                        errors["profession"] = INFO.DATA_INCORRECT
                        setErrors(errors);
                        return
                    }

                    if (result.data.customCode === 4005) {
                        errors["avatar"] = INFO.TOO_BIG_PHOTO
                        setErrors(errors);
                        return
                    }

                    if (result.data.customCode === 4008) {
                        result.data.payload.forEach((value) => {
                            const errorName = value + "_profile"
                            errors[errorName] = INFO.SOCIAL_PROFILE_EXIST;

                        })
                        setErrors(errors)
                        return
                    }
                }

                if (result.status === 500) {
                    errors["profession"] = INFO.SERVER_ERROR
                    setErrors(errors);
                    console.log(result);
                    return
                }

                if (result.status !== 200) {
                    errors["profession"] = INFO.UNKNOWN_ERROR
                    setErrors(errors);
                    console.log(result);
                }
            }
        }
    }

    return (
        <form className={classes.mainBlock} onSubmit={(e) => handleSubmit(e)}>
            <Sidebar/>
            <Header name={'Edit'} titleHeader={classes.title}
                    titleBtn={isSending? 'Sending' : 'Save Changes'}
                    title='Edit Influencer'
                    leftArrow={leftArrow}
                    statusButton={status}
                    btnHeader={isSending || !status? `${classes.btnHeader} ${classes.disabled}` : classes.btnHeader}
                    button={(e) => saveChanges(e)}
                    isSending={isSending || !status}
            />

            {isLoading?
                <div style={{textAlign: "center", fontSize: "18px", fontWeight: "700", marginTop: "30px"}}>
                    <img style={{margin: "20px auto", width: "50px"}} alt="Loading" src={loading}/>
                    <p>Please wait...</p>
                </div>
                : <div className={classes.mainContainer}>
                    <section className={classes.leftContainer}>
                        <h3 className={classes.general}>General</h3>

                        <label className={classes.input_title}>First Name</label>
                        <input className={classes.input_info_left}
                               type='text'
                               name='first_name'
                               defaultValue={values.first_name}
                               onInput={(e) => handleChange(e)}
                        />

                        {errors.first_name && errors.first_name.length ?
                            <div className={classes.errorDiv}>{errors.first_name}</div> : ''}

                        <label className={classes.input_title}>Last Name</label>
                        <input className={classes.input_info_left}
                               type='text'
                               name='last_name'
                               defaultValue={values.last_name}
                               onInput={(e) => handleChange(e)}/>

                        {errors.last_name && errors.last_name.length ?
                            <div className={classes.errorDiv}>{errors.last_name}</div> : ''}


                        <label className={classes.input_title}>Birthdate</label>
                        <input className={classes.input_info_left}
                               type='date'
                               name='birthdate'
                               defaultValue={values.birthdate}
                               placeholder={''}
                               onInput={(e) => handleChange(e)}/>

                        <label className={classes.input_title}>Profession</label>
                        <input className={`${classes.input_info_left}`}
                               type='text'
                               name='profession'
                               defaultValue={values.profession}
                               onInput={(e) => handleChange(e)}/>

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
                            {values.profile_picture || edit.profile_picture ? <img
                                src={typeof edit.profile_picture === 'object' ? `${edit.profile_picture.preview}` : `${values.profile_picture}`}
                                style={{
                                    width: 64,
                                    height: 64,
                                    borderRadius: 50,
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
                                   defaultValue={values.instagram_profile && values.instagram_profile}
                                   ref={instagram_profile}
                                   onInput={(e) => handleChange(e)}/>

                            {errors['instagram_profile'] && errors['instagram_profile'].length ?
                                <div className={classes.errorDiv}>{errors['instagram_profile']}</div> : ''}

                            <label className={`${classes.input_title}`}>YouTube</label>
                            <input className={`${classes.input_info}`}
                                   type='text'
                                   defaultValue={values.youtube_profile && values.youtube_profile}
                                   name='youtube_profile'
                                   ref={youtube_profile}
                                   onInput={(e) => handleChange(e)}/>

                            {errors['youtube_profile'] && errors['youtube_profile'].length ?
                                <div className={classes.errorDiv}>{errors['youtube_profile']}</div> : ''}

                            <label className={`${classes.input_title}`}>Facebook</label>
                            <input className={`${classes.input_info}`}
                                   type='text'
                                   name='facebook_profile'
                                   defaultValue={values.facebook_profile && values.facebook_profile}
                                   ref={facebook_profile}
                                   onInput={(e) => handleChange(e)}/>

                            {errors['facebook_profile'] && errors['facebook_profile'].length ?
                                <div className={classes.errorDiv}>{errors['facebook_profile']}</div> : ''}

                            <label className={`${classes.input_title}`}>Tiktok</label>
                            <input className={`${classes.input_info}`}
                                   type='text'
                                   name='tiktok_profile'
                                   ref={tiktok_profile}
                                   defaultValue={values.tiktok_profile && values.tiktok_profile}
                                   onInput={(e) => handleChange(e)}/>

                            {errors['tiktok_profile'] && errors['tiktok_profile'].length ?
                                <div className={classes.errorDiv}>{errors['tiktok_profile']}</div> : ''}

                            <label className={`${classes.input_title}`}>Twitter</label>
                            <input className={`${classes.input_info}`}
                                   type='text'
                                   name='twitter_profile'
                                   ref={twitter_profile}
                                   defaultValue={values.twitter_profile && values.twitter_profile}
                                   onInput={(e) => handleChange(e)}/>

                            {errors['twitter_profile'] && errors['twitter_profile'].length ?
                                <div className={classes.errorDiv}>{errors['twitter_profile']}</div> : ''}

                            <label className={`${classes.input_title}`}>Blog</label>
                            <input className={`${classes.input_info}`}
                                   type='text'
                                   name='blog_profile'
                                   ref={blog_profile}
                                   defaultValue={values.blog_profile && values.blog_profile}
                                   onInput={(e) => handleChange(e)}/>

                            {errors['blog_profile'] && errors['blog_profile'].length ?
                                <div className={classes.errorDiv}>{errors['blog_profile']}</div> : ''}
                        </div>

                        <div className={`${classes.div_helper}`} style={{paddingTop: '58px'}}>
                            <label className={`${classes.input_title}`}>Instagram Followers</label>
                            <input className={`${classes.input_info}`}
                                   disabled={false}
                                   name='instagram_followers'
                                   ref={instagram_followers}
                                   value={edit.instagram_followers ? edit.instagram_followers : edit.instagram_followers === '' || edit.instagram_followers === 0 ? '' : values.instagram_followers}
                                   onInput={(e) => handleChange(e)}/>

                            {errors['instagram_followers'] && errors['instagram_followers'].length ?
                                <div className={classes.errorDiv}>{errors['instagram_followers']}</div> : ''}

                            <label className={`${classes.input_title}`}>YouTube Subscribers</label>
                            <input className={`${classes.input_info}`}
                                   type='text'
                                   name='youtube_followers'
                                   ref={youtube_followers}
                                   value={edit.youtube_followers ? edit.youtube_followers : edit.youtube_followers === '' || edit.youtube_followers === 0 ? '' : values.youtube_followers}
                                   onInput={(e) => handleChange(e)}/>

                            {errors['youtube_followers'] && errors['youtube_followers'].length ?
                                <div className={classes.errorDiv}>{errors['youtube_followers']}</div> : ''}

                            <label className={`${classes.input_title}`}>Facebook Followers</label>
                            <input className={`${classes.input_info}`}
                                   type='text'
                                   name='facebook_followers'
                                   ref={facebook_followers}
                                   value={edit.facebook_followers ? edit.facebook_followers : edit.facebook_followers === '' || edit.facebook_followers === 0 ? '' : values.facebook_followers}
                                   onInput={(e) => handleChange(e)}/>

                            {errors['facebook_followers'] && errors['facebook_followers'].length ?
                                <div className={classes.errorDiv}>{errors['facebook_followers']}</div> : ''}

                            <label className={`${classes.input_title}`}>Tiktok Followers</label>
                            <input className={`${classes.input_info}`}
                                   type='text'
                                   name='tiktok_followers'
                                   ref={tiktok_followers}
                                   value={edit.tiktok_followers ? edit.tiktok_followers : edit.tiktok_followers === '' || edit.tiktok_followers === 0 ? '' : values.tiktok_followers}
                                   onInput={(e) => handleChange(e)}/>

                            {errors['tiktok_followers'] && errors['tiktok_followers'].length ?
                                <div className={classes.errorDiv}>{errors['tiktok_followers']}</div> : ''}

                            <label className={`${classes.input_title}`}>Twitter Followers</label>
                            <input className={`${classes.input_info}`}
                                   type='text'
                                   name='twitter_followers'
                                   ref={twitter_followers}
                                   value={edit.twitter_followers ? edit.twitter_followers : edit.twitter_followers === '' || edit.twitter_followers === 0 ? '' : values.twitter_followers}
                                   onInput={(e) => handleChange(e)}/>

                            {errors['twitter_followers'] && errors['twitter_followers'].length ?
                                <div className={classes.errorDiv}>{errors['twitter_followers']}</div> : ''}

                            <label className={`${classes.input_title}`}>Blog Views</label>
                            <input className={`${classes.input_info}`}
                                   type='text'
                                   name='blog_followers'
                                   ref={blog_followers}
                                   value={edit.blog_followers ? edit.blog_followers : edit.blog_followers === '' || edit.blog_followers === 0 ? '' : values.blog_followers}
                                   onInput={(e) => handleChange(e)}/>

                            {errors['blog_followers'] && errors['blog_followers'].length ?
                                <div className={classes.errorDiv}>{errors['blog_followers']}</div> : ''}

                        </div>
                    </section>
                </div>}
        </form>
    )
}

export default EditInfluencer;
