import React, {useRef, useState} from 'react';
import classes from './CreateInfluencer.module.css';
import Tooltip from '../Items/Tooltip/Tooltip'
import {INFO} from '../../Constants/messages';
import Header from '../Items/Header/Header';
import Sidebar from '../Items/Sidebar/Sidebar'
import leftArrow from '../Items/Icons/arrow-left.svg';
import userService from "../../Services/userService";
import influencersService from "../../Services/influencers.service";


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
    });
    const [status, setStatus] = useState(0);

    const handleChange = (e) => {
        const value = e.target.value;
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
            } else {
                input.current.style.borderColor = ''
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

    const checkValidateInput = (data) => {
        const arr = []
        for (const datum in data) {
            console.log(datum)
            if (datum.includes('profile') || datum.includes('followers')) {
                arr.push(datum)
            }
        }
        if (arr.length % 2 === 0) {
            setStatus(1)
        } else if (arr.length % 2 !== 0) {
            setStatus(0)
        } else {
            setStatus(0)
        }
        console.log(arr)
        console.log(status)
        // console.log(!status)
    }

    const saveChanges = async () => {
        const formData = new FormData();
        // console.log(values)
        const arr = []
        for (const value in values) {
            arr.push(values[value])
            formData.append(value, values[value])
        }
        checkValidateInput(values)
        if (!status) {
            await influencersService.postInfluencer(formData);
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
                        // pattern={FIRST_LAST_NAME_REGEXP}
                           required={true}
                           onChange={(e) => handleChange(e)}
                    />

                    <label className={classes.input_title}>Last Name</label>
                    <input className={classes.input_info_left}
                           type='text'
                           name='last_name'
                           required={true}
                        // pattern={FIRST_LAST_NAME_REGEXP}
                           onChange={(e) => handleChange(e)}/>


                    <label className={classes.input_title}>Birthdate</label>
                    <input className={classes.input_info_left}
                           type='date'
                           defaultValue={false}
                           name='birthdate'
                           placeholder={''}
                           onChange={(e) => handleChange(e)}/>

                    <label className={classes.input_title}>Profession</label>
                    <input className={`${classes.input_info_left}`}
                           type='text'
                           name='profession'
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
                        {values.avatar ? <img src={values.avatar.preview} style={{
                            width: 64,
                            height: 64,
                            borderRadius: 50
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
                               ref={instagram_profile}
                               onChange={(e) => handleChange(e)}/>
                        <label className={`${classes.input_title}`}>YouTube</label>
                        <input className={`${classes.input_info}`}
                               type='text'
                               name='youtube_profile'
                               ref={youtube_profile}
                               onChange={(e) => handleChange(e)}/>
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
                        <label className={`${classes.input_title}`}>Twitter</label>
                        <input className={`${classes.input_info}`}
                               type='text'
                               name='twitter_profile'
                               ref={twitter_profile}
                               onChange={(e) => handleChange(e)}/>
                        <label className={`${classes.input_title}`}>Blog</label>
                        <input className={`${classes.input_info}`}
                               type='text'
                               name='blog_profile'
                               ref={blog_profile}
                               onChange={(e) => handleChange(e)}/>
                    </div>
                    <div className={`${classes.div_helper}`} style={{paddingTop: '58px'}}>
                        <label className={`${classes.input_title}`}>Instagram Followers</label>
                        <input className={`${classes.input_info}`}
                               type='text'
                               disabled={false}
                               name='instagram_followers'
                               ref={instagram_followers}
                               onChange={(e) => handleChange(e)}/>
                        <label className={`${classes.input_title}`}>YouTube Subscribers</label>
                        <input className={`${classes.input_info}`}
                               type='text'
                               name='youtube_followers'
                               ref={youtube_followers}
                               onChange={(e) => handleChange(e)}/>
                        <label className={`${classes.input_title}`}>Facebook Followers</label>
                        <input className={`${classes.input_info}`}
                               type='text'
                               name='facebook_followers'
                               ref={facebook_followers}
                               onChange={(e) => handleChange(e)}/>

                        <label className={`${classes.input_title}`}>Tiktok Followers</label>
                        <input className={`${classes.input_info}`}
                               type='text'
                               name='tiktok_followers'
                               ref={tiktok_followers}
                               onChange={(e) => handleChange(e)}/>
                        <label className={`${classes.input_title}`}>Twitter Followers</label>
                        <input className={`${classes.input_info}`}
                               type='text'
                               name='twitter_followers'
                               ref={twitter_followers}
                               onChange={(e) => handleChange(e)}/>
                        <label className={`${classes.input_title}`}>Blog Views</label>
                        <input className={`${classes.input_info}`}
                               type='text'
                               name='blog_followers'
                               ref={blog_followers}
                               onChange={(e) => handleChange(e)}/>
                    </div>

                </section>
            </div>
        </form>
    )
}

export default CreateInfluencer;
