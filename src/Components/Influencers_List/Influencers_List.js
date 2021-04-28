import React, {useEffect, useState} from 'react';
import classes from './Influencers_List.module.css';

import Sidebar from '../Items/Sidebar/Sidebar'
import InfluencersService from "../../Services/influencers.service";
import Search from "../Items/Search/Search";
import AuthService from "../../Services/auth.service";
import configFront from "../../Constants/config";
import path from '../Items/Icons/path.svg';
import rightArrow from '../Items/Icons/right-arrow.svg';
import photoDefault from '../Items/Icons/vector.svg';
import arrowUp from '../Items/Icons/arrow-up.svg'
import UsersListHeader from "../Items/UsersListHeader/UsersListHeader";

import instagramIcon from "../../img/Social_Icons/Instagram.png";
import facebookIcon from "../../img/Social_Icons/Facebook.png";
import youtubeIcon from "../../img/Social_Icons/Youtube.png";
import twitterIcon from "../../img/Social_Icons/Twitter.png";
import tikTokIcon from "../../img/Social_Icons/TikTok.png";
import storiesIcon from "../../img/Social_Icons/Stories.png";
import blogSmall from "../Items/Icons/blogSmall.svg";


const Influencers_List = () => {

    const [values, setValues] = useState([]);
    const [initial, setInitial] = useState(true);

    useEffect(() => {
        async function Start() {
            setInitial(false)
            const initialState = await InfluencersService.getInfluencers()
            setValues(initialState)
        }
        if (initial) {
            Start()
        }
    })

    // function capitalizeFirstLetter(string) {
    //     return string[0].toUpperCase() + string.slice(1);
    // }

    // const searchName = async (e) => {
    //     const value = e.target.value;
    //     const resultFirstName = await userService.getUsers({first_name: value})
    //     if (resultFirstName) {
    //         const resultLastName = await userService.getUsers({last_name: value})
    //         const one = [];
    //         resultFirstName.forEach(user => {
    //             one.push(user._id);
    //         })
    //         resultLastName.forEach(user => {
    //             if (!one.includes(user._id)) {
    //                 resultFirstName.push(user);
    //             }
    //         })
    //     }
    //     setValues(resultFirstName)
    // }

    const searchName = async (e) => {
        const value = e.target.value;
        const search = await InfluencersService.getInfluencers({search: value})
        setValues(search);
    }

    const show = (item) => {
        AuthService.setInfluencerId(item._id)
        window.location.href = configFront.URL + 'influencers/show'
    }

    const socials = (item) => {
        const social = [];
        if (item.social_profiles.length) {
            item.social_profiles.forEach((profile) => {
                social.push(profile.social_network_name)
            })
        }
        // console.log(social)
        return social
    }

    return (

        <div className={classes.mainContainer}>
            <Sidebar/>
            <UsersListHeader titleHeader={classes.titleUsers}
                             title='Influencers'
                             titleBtn='Create New'
                             upArrow={arrowUp}
                             btnHeader={classes.btnHeader}


                // btnHeader={cl}
                // className={classes.btnHeader}
            />

            <section className={classes.SearchContainer}>
                <Search
                    onChangeName={(e) => searchName(e)}/>
            </section>
            <section className={classes.tableHeader}>
                <p className={classes.tableHeaderName}>Username</p>
                <p className={classes.tableHeaderEmail}>Name</p>
                <p className={classes.tableHeaderRole}>Social profiles</p>
                <p>Rating</p>
            </section>
            <section>

                <div>
                    {values ? (values.map((item, index) =>
                        <div key={index}>
                            <div className={`${classes.tableHeaderInfo}`}>
                                {item.profile_picture ? <img src={`${item.profile_picture}`} alt='avatar' className={classes.avatar}/> :
                                    <img src={photoDefault} alt='photoDefault' className={`${classes.avatar} ${classes.photo}`}/>}

                                <div className={classes.tableTextName}><p className={classes.textColor}>{item.user_name} </p></div>

                                <div className={classes.tableTextEmail}><p className={classes.textColor}>{item.full_name}</p></div>
                                <div className={classes.tableTextRole}><p className={classes.textColor}>
                                    {socials(item).includes('instagram') ?
                                        <img alt='instagram' className={classes.social_img} src={instagramIcon}/> : ''}

                                    {socials(item).includes('youtube') ?
                                        <img alt='youtube' className={classes.social_img} src={youtubeIcon}/> : ''}

                                    {socials(item).includes('facebook') ?
                                        <img alt='facebook' className={classes.social_img} src={facebookIcon}/> : ''}

                                    {socials(item).includes('tiktok') ?
                                        <img alt='tiktok' className={classes.social_img} src={tikTokIcon}/> : ''}

                                    {socials(item).includes('twitter') ?
                                        <img alt='twitter' className={classes.social_img} src={twitterIcon}/> : ''}

                                    {socials(item).includes('blog') ?
                                        <img alt='blog' className={classes.social_img} src={blogSmall}/> : ''}
                                </p></div>
                                <div className={classes.tableTextRating}><p className={classes.textColor}>SUPER!</p></div>

                                <div></div>

                                <div className={classes.tableBtn}>
                                        <div className={classes.Test}>
                                            <div className={classes.btnPosition}>
                                                <img src={path} alt='path' onClick={() => show(item)} className={classes.infoBtn}/></div></div>
                                        <div className={classes.tooltipMain}>
                                            <div className={classes.TooltipText}>
                                                <p>Show Influencer</p></div>
                                        </div>
                                        <img className={classes.ArrowImg} src={rightArrow} alt={'Right arrow'}/>
                                    </div>



                            </div>
                        </div>
                    )) : ''}
                    }
                </div>
            </section>
        </div>
    )
}

export default Influencers_List;
