import React, { useEffect, useState } from 'react';
import {
    useParams
} from "react-router-dom";

import arrowUp from '../Items/Icons/arrow-up.svg'
import classes from './InfluencerDetails.module.css';
import configFront from "../../Constants/configFront";
import edit from '../Items/Icons/edit-alt.svg';
import InfluencersService from "../../Services/influencers.service";
import routes from "../../Constants/routes.enum";
import Sidebar from '../Items/Sidebar/Sidebar'
import UsersListHeader from "../Items/UsersListHeader/UsersListHeader";
import Loading from "../Items/Loading/Loading";
import defaultImg from '../../img/Default_Pic/24-248253_user-profile-default-image-png-clipart-png-download.png';
import Profiles from '../Items/Profiles/Profiles'

// import Search from "../Items/Search/Search";
// import path from '../Items/Icons/path.svg';
// import rightArrow from '../Items/Icons/right-arrow.svg';
// import photoDefault from '../Items/Icons/vector.svg';

const InfluencerDetails = () => {
    const params = useParams();
    if (!params[routes.INFLUENCER_ID]) {
        window.location.href = configFront.URL + `${routes.INFLUENCERS}`
    }
    const [isLoading, setIsLoading] = useState(false)

    const [values, setValues] = useState({});
    const [initial, setInitial] = useState(true);

    useEffect(() => {
            async function Start() {
                setIsLoading(true)
                setInitial(false)
                const initialState = await InfluencersService.getSingleInfluencer(params[routes.INFLUENCER_ID])

                console.log(initialState);

                const arr = initialState.social_profiles;
                arr.splice(1, 3).reverse().forEach(value => arr.push(value))
                arr.splice(1, 2).reverse().forEach(value => arr.push(value))


                if (initialState.social_profiles.length) {
                    initialState.social_profiles.forEach((value) => {
                        let newValue = value.social_network_followers.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                        value.social_network_followers = newValue;
                        console.log(values)
                    })
                    initialState.photos = [...initialState.instagram_photos, ...initialState.youtube_videos]

                    initialState.photos = initialState.photos.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))

                }

                if (!initialState.birthdate) {
                    setValues({ ...initialState })

                } else {
                    const newDate = initialState.birthdate.split('T').shift();
                    setValues({ ...initialState, birthdate: newDate.split('-').reverse().join('.') });
                }
                setIsLoading(false)
            }

            if (initial) {
                Start()
            }
        }
    )

    return (
        <div className={classes.mainContainer}>
            <Sidebar/>
            <UsersListHeader titleHeader={classes.titleUsers}
                             title={isLoading ? '' : values.first_name && values.last_name ? `${values.first_name} ${values.last_name}` : ''}
                             titleBtn='Create New'
                             upArrow={arrowUp}
                             btnHeader={classes.btnHeader}
                             titleBtnEdit={'Edit'}
                             EditInf={classes.EditInf}
                             item={'influencer'}
                             icon={{ background: `url(${edit}) no-repeat`, backgroundPosition: 'left 8px top 8px' }}
            />
            {isLoading ?
                <Loading message='Please, wait...'/> :
                <div className={classes.infoContainer}>
                    <div className={classes.rightBox}>
                        <img
                            src={values.profile_picture ? values.profile_picture : defaultImg}
                            alt="avatar"
                        />
                    </div>
                    <section className={classes.leftBox}>
                        <div
                            className={classes.FullName}>{values.first_name && values.last_name ? `${values.first_name} ${values.last_name}` : ''}</div>
                        <div className={classes.infoDetails}>
                            <div>
                                <span className={classes.positionBirthday}>Birthday:</span>
                                <span className={classes.textDetail}>{values.birthdate}</span>
                            </div>

                            <div className={classes.Occupation}>
                                <span className={classes.positionDetail}>Occupation: </span>
                                <span className={classes.textDetail}> {values.profession} </span>
                            </div>

                            <div className={classes.mainSocialContainer}>

                                {values.social_profiles && values.social_profiles.length ? values.social_profiles.map((soc, index) =>
                                    <div key={index}>
                                        <Profiles network_name={soc.social_network_name}
                                                  followers={soc.social_network_followers}
                                                  profile={soc.social_network_profile}/>
                                    </div>
                                ) : ''
                                }

                            </div>
                        </div>
                    </section>
                </div>
            }
            {isLoading ? "" :
                <section>
                    <div className={classes.ContainerPhoto}>

                        {values.photos ? values.photos.map((photo) => <div
                            className={classes.instPhoto}><img src={photo.preview} alt={'instPhoto'}/></div>) : ''}


                    </div>
                </section>}
        </div>
    )
}

export default InfluencerDetails;
