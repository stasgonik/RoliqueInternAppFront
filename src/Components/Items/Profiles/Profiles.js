import React from 'react';
import {useHistory} from "react-router-dom";
import tiktok from '../../Items/Icons/tiktok.svg';
import twitter from '../../Items/Icons/twitter.svg';
import edit from '../../Items/Icons/edit-alt.svg';
import blog from '../../Items/Icons/blog.svg';
import facebook from '../../Items/Icons/facebook.svg';
import instagram from '../../Items/Icons/instagram.svg';
import youtube from '../../Items/Icons/youtube.svg';



import classes from '../../InfluencerDetails/InfluencerDetails.module.css';



const Profiles = ({profile, followers, network_name}) => {

    return (
        <div className={`${classes.tiktok} ${classes.mainSocial}`} style={
            (network_name === 'tiktok'? {backgroundColor:'#000000'}:null)||
            (network_name === 'instagram'? {background: "radial-gradient(114.11% 114.11% at 22.66% 97.97%, #FED574 0%, #FDCB70 5.15%, #F8AF66 14.03%, #F28256 25.48%, #EC5847 34.88%, #C73283 64.9%, #5C6CB3 100%)"}:null)||
            (network_name === 'facebook'? {backgroundColor:'#415A94'}:null)||
            (network_name === 'youtube'? {backgroundColor:'#C13732'}:null)||
            (network_name === 'twitter'? {backgroundColor:'#68ABE7'}:null)||
            (network_name === 'blog'? {backgroundColor:'#E8934C'}:null)
        }>
            <div className={classes.position}>
                <img src={
                    (network_name === 'tiktok'? tiktok: '')||
                    (network_name === 'facebook'? facebook: '')||
                    (network_name === 'twitter'? twitter: '')||
                    (network_name === 'instagram'? instagram: '')||
                    (network_name === 'youtube'? youtube: '')||
                    (network_name === 'blog'? blog: '')}  alt={'social_name'}/>
            </div>
            <div className={classes.infoSocial}>
                <p>{profile}</p>
                <p>{followers}</p>
            </div>
        </div>
    )
}
export default Profiles;

