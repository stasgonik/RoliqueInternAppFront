import React, {useEffect, useState} from 'react';
import {
    useParams
} from "react-router-dom";

import arrowUp from '../Items/Icons/arrow-up.svg'
import blog from '../Items/Icons/blog.svg';
import classes from './Campaign_Planning.module.css';
import configFront from "../../Constants/configFront";
import edit from '../Items/Icons/edit-alt.svg';
import facebook from '../Items/Icons/facebook.svg';
import CampaignService from "../../Services/campaign.service";
import instagram from '../Items/Icons/instagram.svg';
import loading from '../../img/Loading.gif'
import routes from "../../Constants/routes.enum";
import Sidebar from '../Items/Sidebar/Sidebar'
import tiktok from '../Items/Icons/tiktok.svg';
import twitter from '../Items/Icons/twitter.svg';
import UsersListHeader from "../Items/UsersListHeader/UsersListHeader";
import youtube from '../Items/Icons/youtube.svg';

// import Search from "../Items/Search/Search";
// import path from '../Items/Icons/path.svg';
// import rightArrow from '../Items/Icons/right-arrow.svg';
// import photoDefault from '../Items/Icons/vector.svg';

const Campaign_Planning = () => {
    const params = useParams();
    if (!params[routes.CAMPAIGN_ID]) {
        window.location.href = configFront.URL + `${routes.CAMPAIGNS}`
    }
    const [isLoading, setIsLoading] = useState(false)

    const [values, setValues] = useState({});
    const [initial, setInitial] = useState(true);

    useEffect(() => {
            async function Start() {
                setIsLoading(true)
                setInitial(false)
                const initialState = await CampaignService.getSingleCampaign(params[routes.CAMPAIGN_ID])
                console.log(initialState)

                setValues({...initialState})

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
                             title={isLoading ? '' : values.title ? `${values.title}` : ''}
                             titleBtn='Create New'
                             upArrow={arrowUp}
                             btnHeader={classes.btnHeader}
                             titleBtnEdit={'Edit'}
                             EditInf={classes.EditInf}
                             item={'campaign'}
                             icon={{background: `url(${edit}) no-repeat`, backgroundPosition: 'left 8px top 8px'}}
            />
            {isLoading ?
                <div style={{textAlign: "center", fontSize: "18px", fontWeight: "700", marginTop: "30px"}}>
                    <img style={{margin: "20px auto", width: "50px"}} alt="Loading" src={loading}/>
                    <p>Please wait...</p>
                </div> : ''
            }
        </div>
    )
}

export default Campaign_Planning;
