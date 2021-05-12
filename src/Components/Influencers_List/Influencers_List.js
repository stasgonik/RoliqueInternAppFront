import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

import arrowUp from '../Items/Icons/arrow-up.svg'
import blogSmall from "../../img/Social_Icons/Stories.svg";
import classes from './Influencers_List.module.css';
import facebookIcon from "../../img/Social_Icons/Facebook.svg";
import InfluencersService from "../../Services/influencers.service";
import instagramIcon from "../../img/Social_Icons/Instagram.svg";
import path from '../Items/Icons/path.svg';
import photoDefault from '../Items/Icons/vector.svg';
import rightArrow from '../Items/Icons/right-arrow.svg';
import routes from "../../Constants/routes.enum";
import Search from "../Items/Search/Search";
import Sidebar from '../Items/Sidebar/Sidebar'
import tikTokIcon from "../../img/Social_Icons/TikTok.svg";
import twitterIcon from "../../img/Social_Icons/Twitter.svg";
import UsersListHeader from "../Items/UsersListHeader/UsersListHeader";
import youtubeIcon from "../../img/Social_Icons/Youtube.svg";

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

    const searchName = async (e) => {
        const value = e.target.value;
        const search = await InfluencersService.getInfluencers({search: value})
        setValues(search);
    }

    const socials = (item) => {
        const social = [];
        if (item.social_profiles.length) {
            item.social_profiles.forEach((profile) => {
                social.push(profile.social_network_name)
            })
        }
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

                                <Link to={`${routes.INFLUENCERS}/${item._id}`}>
                                    <div className={classes.tableBtn}>
                                        <div className={classes.Test}>
                                            <div className={classes.btnPosition}>
                                                <img src={path} alt='path' className={classes.infoBtn}/>
                                            </div></div>
                                        <div className={classes.tooltipMain}>
                                            <div className={classes.TooltipText}>
                                                <p>Show Influencer</p></div>
                                        </div>
                                        <img className={classes.ArrowImg} src={rightArrow} alt={'Right arrow'}/>
                                    </div>
                                </Link>




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
