import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

import arrowUp from '../Items/Icons/arrow-up.svg'
import blogSmall from "../../img/Social_Icons/Stories.svg";
import classes from './Influencers_List.module.css';
import facebookIcon from "../../img/Social_Icons/Facebook.svg";
import InfluencersService from "../../Services/influencers.service";
import instagramIcon from "../../img/Social_Icons/Instagram.svg";
// import loading from "../../img/Loading.gif";
import path from '../Items/Icons/path.svg';
import photoDefault from '../../img/Default_Pic/24-248253_user-profile-default-image-png-clipart-png-download.png';
import rightArrow from '../Items/Icons/right-arrow.svg';
import routes from "../../Constants/routes.enum";
import Search from "../Items/Search/Search";
import Sidebar from '../Items/Sidebar/Sidebar'
import tikTokIcon from "../../img/Social_Icons/TikTok.svg";
import twitterIcon from "../../img/Social_Icons/Twitter.svg";
import UsersListHeader from "../Items/UsersListHeader/UsersListHeader";
import youtubeIcon from "../../img/Social_Icons/Youtube.svg";
import Loading from "../Items/Loading/Loading";
import ListLink from "../Items/ListLink/ListLink";


const Influencers_List = () => {

	const [values, setValues] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [initial, setInitial] = useState(true);

	useEffect(() => {
		async function Start() {
			setInitial(false)
			setIsLoading(true)
			const initialState = await InfluencersService.getInfluencers()
			setValues(initialState)
			setIsLoading(false)
		}

		if (initial) {
			Start()
		}
	})

	const searchName = async (e) => {
		const value = e.target.value;
		setIsLoading(true)
		const search = await InfluencersService.getInfluencers({search: value})
		setValues(search);
		setIsLoading(false)
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
							 title={initial ? '' : 'Influencers'}
							 titleBtn='Create New'
							 upArrow={arrowUp}
							 btnHeader={classes.btnHeader}

			/>

			<section className={classes.SearchContainer}>
				<Search placeholder={"Search"}
						onChangeName={(e) => searchName(e)}/>
			</section>
			<section className={classes.tableHeader}>
				<table className={classes.tableInfListInfo}>
					<thead>
					<tr className={classes.tr}>
						<th className={classes.titleInfName}><span>Username</span></th>
						<th/>
						<th><span>Name</span></th>
						<th><span>Channels</span></th>
						<th><span>Rating</span></th>
						<th/>
						{/*<th/>*/}
					</tr>
					</thead>
					{isLoading ? <Loading message='Please wait...'/> : values ? (values.map((item) =>
						<tbody className={classes.tableListText} key={item._id}>
						<tr>
							<td>
								{item.profile_picture ?
								<img src={`${item.profile_picture}`} alt='avatar' className={classes.avatar}/> :
								<img src={photoDefault} alt='photoDefault'
									 className={`${classes.avatar} ${classes.photo}`}/>}
							</td>
							<td>{item.user_name}</td>
							<td>{item.full_name}</td>
							<td>{socials(item).includes('instagram') ?
								<img alt='instagram' className={classes.social_img}
									 src={instagramIcon}/> : ''}

								{socials(item).includes('youtube') ?
									<img alt='youtube' className={classes.social_img} src={youtubeIcon}/> : ''}

								{socials(item).includes('facebook') ?
									<img alt='facebook' className={classes.social_img}
										 src={facebookIcon}/> : ''}

								{socials(item).includes('tiktok') ?
									<img alt='tiktok' className={classes.social_img} src={tikTokIcon}/> : ''}

								{socials(item).includes('twitter') ?
									<img alt='twitter' className={classes.social_img} src={twitterIcon}/> : ''}

								{socials(item).includes('blog') ?
									<img alt='blog' className={classes.social_img} src={blogSmall}/> : ''}</td>
							<td><span>SUPER!</span></td>
							<td> </td>
							<td><ListLink message='Edit Influencer' arrow={rightArrow} link={`${routes.INFLUENCERS}/${item._id}`}/></td>
						</tr>
						</tbody>
					)) : ''}
				</table>

			</section>

		</div>
	)
}


export default Influencers_List;
