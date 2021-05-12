import React, {useRef, useState} from 'react';
import {
    useParams
} from "react-router-dom";
import classes from './EditInfluencer.module.css';
import Tooltip from '../Items/Tooltip/Tooltip'
import {INFO} from '../../Constants/messages';
import Header from '../Items/Header/Header';
import Sidebar from '../Items/Sidebar/Sidebar'
import leftArrow from '../Items/Icons/arrow-left.svg';
import influerenceService from "../../Services/influencers.service";
import configFront from "../../Constants/configFront";


const EditInfluencer = () => {
    const { influencerId } = useParams();
    if(!influencerId) {
        window.location.href  = configFront.URL + 'influencers'
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
        const initialState = await influerenceService.getSingleInfluencer(influencerId)
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
            birthdate: initialState.birthdate.split('T').shift(),
            profession: initialState.profession,
            ...socialInfo,
            profile_picture: initialState.profile_picture,
        })
    });

    const [status, setStatus] = useState(false);
    const [edit, setEdit] = useState({});


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
            } else {
                input.current.style.borderColor = ''
            }
            if (value === '') {
                if (input.current.value === '') {
                    inputFocus.current.style.borderColor = ''
                    inputFocus.current.required = false
                    input.current.style.borderColor = ''
                    input.current.required = false
                } else {
                    inputFocus.current.style.borderColor = 'red'
                    inputFocus.current.required = true
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
            if (value === '') {
                if (input.current.value === '') {
                    inputFocus.current.style.borderColor = ''
                    inputFocus.current.required = false
                    input.current.style.borderColor = ''
                    input.current.required = false
                } else {
                    inputFocus.current.style.borderColor = 'red'
                    inputFocus.current.required = true
                }
            }
        }
        setEdit({...edit, [e.target.name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }


    const selected = (e) => {
        let img = e.target.files[0];
        if(img) {
            setStatus(true)
            img.preview = URL.createObjectURL(img)
            setEdit({...edit, profile_picture: img})
        }

    }


    const saveChanges = async () => {
        const formData = new FormData();
        const arr = []
        let pp;
        if(edit.profile_picture) {
            pp = edit.profile_picture;
        }
        for (const value in edit) {
            if (value.includes('followers')) {
                edit[value] = edit[value].split('.').join('')
            }

            arr.push(values[value])
            if (edit[value] === '') {
                edit[value] = null
            }
            formData.append(value, edit[value])
            if (edit[value]) {
                edit[value] = edit[value].toString().split('.').join('').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
            }

        }

        console.log(edit);
        if (status && edit) {
            console.log(edit);
            if (pp) {
                formData.set('profile_picture', pp, 'avatar.jpg')
            }
            await influerenceService.editInfluerence(formData, influencerId)
        }
    }


    return (
        <form className={classes.mainBlock} onSubmit={(e) => handleSubmit(e)}>
            <Sidebar/>
            <Header name={'Edit'} titleHeader={classes.title}
                    titleBtn='Save Changes'
                    title='Edit Influencer'
                    leftArrow={leftArrow}
                    statusButton={status}
                    btnHeader={classes.btnHeader}
                    button={(e) => saveChanges(e)}/>
            {
                console.log(edit)
            }

            <div className={classes.mainContainer}>
                <section className={classes.leftContainer}>
                    <h3 className={classes.general}>General</h3>

                    <label className={classes.input_title}>First Name</label>
                    <input className={classes.input_info_left}
                           type='text'
                           name='first_name'
                           defaultValue={values.first_name}
                        // pattern={FIRST_LAST_NAME_REGEXP}
                           required={true}
                           onChange={(e) => handleChange(e)}
                    />

                    <label className={classes.input_title}>Last Name</label>
                    <input className={classes.input_info_left}
                           type='text'
                           name='last_name'
                           defaultValue={values.last_name}
                           required={true}
                        // pattern={FIRST_LAST_NAME_REGEXP}
                           onChange={(e) => handleChange(e)}/>


                    <label className={classes.input_title}>Birthdate</label>
                    <input className={classes.input_info_left}
                           type='date'
                           name='birthdate'
                           value={values.birthdate}
                           placeholder={''}
                           onChange={(e) => handleChange(e)}/>

                    <label className={classes.input_title}>Profession</label>
                    <input className={`${classes.input_info_left}`}
                           type='text'
                           name='profession'
                           defaultValue={values.profession}
                           required={true}
                           onChange={(e) => handleChange(e)}/>

                    <p className={classes.profile}>Profile Picture</p>
                    <input type='file'
                           name='avatar'
                           style={{display: 'none'}}
                           onChange={(e) => selected(e)}
                           ref={fileInput}
                    />
                    <button className={classes.avatar} onClick={() => fileInput.current.click()}>
                        {values.profile_picture ? <img
                            src={typeof edit.profile_picture === 'object' ? `${edit.profile_picture.preview}` : `${values.profile_picture}`}
                            style={{
                                width: 64,
                                height: 64,
                                borderRadius: 50,
                            }} alt={'alt'}/> : '+'}
                    </button>

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
                               onChange={(e) => handleChange(e)}/>
                        <label className={`${classes.input_title}`}>YouTube</label>
                        <input className={`${classes.input_info}`}
                               type='text'
                               defaultValue={values.youtube_profile && values.youtube_profile}
                               name='youtube_profile'
                               ref={youtube_profile}
                               onChange={(e) => handleChange(e)}/>
                        <label className={`${classes.input_title}`}>Facebook</label>
                        <input className={`${classes.input_info}`}
                               type='text'
                               name='facebook_profile'
                               defaultValue={values.facebook_profile && values.facebook_profile}
                               ref={facebook_profile}
                               onChange={(e) => handleChange(e)}/>

                        <label className={`${classes.input_title}`}>Tiktok</label>
                        <input className={`${classes.input_info}`}
                               type='text'
                               name='tiktok_profile'
                               ref={tiktok_profile}
                               defaultValue={values.tiktok_profile && values.tiktok_profile}
                               onChange={(e) => handleChange(e)}/>
                        <label className={`${classes.input_title}`}>Twitter</label>
                        <input className={`${classes.input_info}`}
                               type='text'
                               name='twitter_profile'
                               ref={twitter_profile}
                               defaultValue={values.twitter_profile && values.twitter_profile}
                               onChange={(e) => handleChange(e)}/>
                        <label className={`${classes.input_title}`}>Blog</label>
                        <input className={`${classes.input_info}`}
                               type='text'
                               name='blog_profile'
                               ref={blog_profile}
                               defaultValue={values.blog_profile && values.blog_profile}
                               onChange={(e) => handleChange(e)}/>
                    </div>

                    <div className={`${classes.div_helper}`} style={{paddingTop: '58px'}}>
                        <label className={`${classes.input_title}`}>Instagram Followers</label>
                        <input className={`${classes.input_info}`}
                               disabled={false}
                               name='instagram_followers'
                               ref={instagram_followers}
                               value={edit.instagram_followers ? edit.instagram_followers : edit.instagram_followers === '' ? edit.instagram_followers : values.instagram_followers}
                               onChange={(e) => handleChange(e)}/>

                        <label className={`${classes.input_title}`}>YouTube Subscribers</label>
                        <input className={`${classes.input_info}`}
                               type='text'
                               name='youtube_followers'
                               ref={youtube_followers}
                               value={edit.youtube_followers ? edit.youtube_followers : edit.youtube_followers === '' ? edit.youtube_followers : values.youtube_followers}
                               onChange={(e) => handleChange(e)}/>
                        <label className={`${classes.input_title}`}>Facebook Followers</label>
                        <input className={`${classes.input_info}`}
                               type='text'
                               name='facebook_followers'
                               ref={facebook_followers}
                               value={edit.facebook_followers ? edit.facebook_followers : edit.facebook_followers === '' ? edit.facebook_followers : values.facebook_followers}
                               onChange={(e) => handleChange(e)}/>

                        <label className={`${classes.input_title}`}>Tiktok Followers</label>
                        <input className={`${classes.input_info}`}
                               type='text'
                               name='tiktok_followers'
                               ref={tiktok_followers}
                               value={edit.tiktok_followers ? edit.tiktok_followers : edit.tiktok_followers === '' ? edit.tiktok_followers : values.tiktok_followers}
                               onChange={(e) => handleChange(e)}/>
                        <label className={`${classes.input_title}`}>Twitter Followers</label>
                        <input className={`${classes.input_info}`}
                               type='text'
                               name='twitter_followers'
                               ref={twitter_followers}
                               value={edit.twitter_followers ? edit.twitter_followers : edit.twitter_followers === '' ? edit.twitter_followers : values.twitter_followers}
                               onChange={(e) => handleChange(e)}/>
                        <label className={`${classes.input_title}`}>Blog Views</label>
                        <input className={`${classes.input_info}`}
                               type='text'
                               name='blog_followers'
                               ref={blog_followers}
                               value={edit.blog_followers ? edit.blog_followers : edit.blog_followers === '' ? edit.blog_followers : values.blog_followers}
                               onChange={(e) => handleChange(e)}/>
                    </div>

                </section>
            </div>
        </form>
    )
}

export default EditInfluencer;
