import React from 'react';
import instagram from '../../Items/Icons/instagram.svg';
import youtube from '../../Items/Icons/youtube.svg';

import classes from './Social_Icon.module.css'
import tiktok from "../Icons/tiktok.svg";
import facebook from "../Icons/facebook.svg";
import twitter from "../Icons/twitter.svg";
import blog from "../Icons/blog.svg";

const Social_Icon = ({img}) => {

    return (
        <div className={classes.wrapper} style={
            (img === 'tiktok'? {backgroundColor:'#000000'}:null)||
            (img === 'instagram'? {background: "radial-gradient(114.11% 114.11% at 22.66% 97.97%, #FED574 0%, #FDCB70 5.15%, #F8AF66 14.03%, #F28256 25.48%, #EC5847 34.88%, #C73283 64.9%, #5C6CB3 100%)"}:null)||
            (img === 'facebook'? {backgroundColor:'#415A94'}:null)||
            (img === 'youtube'? {backgroundColor:'#C13732'}:null)||
            (img === 'twitter'? {backgroundColor:'#68ABE7'}:null)||
            (img === 'blog'? {backgroundColor:'#E8934C'}:null)
        }>
            <img src={
                (img === 'tiktok'? tiktok: '')||
                (img === 'facebook'? facebook: '')||
                (img === 'twitter'? twitter: '')||
                (img === 'instagram'? instagram: '')||
                (img === 'youtube'? youtube: '')||
                (img === 'blog'? blog: '')}  alt={'social_name'}/>
        </div>
    )
}
export default Social_Icon;

