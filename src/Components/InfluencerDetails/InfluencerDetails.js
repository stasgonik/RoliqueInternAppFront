import React, {useEffect, useState} from 'react';
import classes from './InfluencerDetails.module.css';
import {
	useParams
} from "react-router-dom";
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
import instagram from '../Items/Icons/instagram.svg';
import youtube from '../Items/Icons/youtube.svg';
import facebook from '../Items/Icons/facebook.svg';
import tiktok from '../Items/Icons/tiktok.svg';
import blog from '../Items/Icons/blog.svg';
import twitter from '../Items/Icons/twitter.svg';
import edit from '../Items/Icons/edit-alt.svg';

const InfluencerDetails = () => {
	const { influencerId } = useParams();

	const [values, setValues] = useState({});
	const [initial, setInitial] = useState(true);


	useEffect(() => {
		async function Start() {
			setInitial(false)
			const initialState = await InfluencersService.getSingleInfluencer(influencerId, true)
			console.log(initialState)
			const arr = initialState.social_profiles;
			arr.splice(1, 3).reverse().forEach(value => arr.push(value))
			arr.splice(1, 2).reverse().forEach(value => arr.push(value))

			if (!initialState.birthdate) {
				setValues({...initialState})
			}
			else {
				const newDate = initialState.birthdate.split('T').shift();
				console.log(newDate)
				setValues({...initialState, birthdate: newDate.split('-').reverse().join('-')})
			}

		}

		if (initial) {
			Start()
		}
	})


	return (

		<div className={classes.mainContainer}>
			<Sidebar/>
			<UsersListHeader titleHeader={classes.titleUsers}
							 title={values.first_name && values.last_name ? `${values.first_name} ${values.last_name}` : ''}
							 titleBtn='Create New'
							 upArrow={arrowUp}
							 btnHeader={classes.btnHeader}
							 titleBtnEdit={'Edit'}
							 EditInf={classes.EditInf}
							 icon={{background: `url(${edit}) no-repeat`, backgroundPosition: 'left 8px top 8px'}}

			/>


			<div className={classes.infoContainer}>

				<section className={classes.rightBox}>
					<img src={values.profile_picture} alt="avatar"/>
				</section>
				<section className={classes.leftBox}>
					<div className={classes.FullName}>{values.first_name && values.last_name ? `${values.first_name} ${values.last_name}`: ''}</div>
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
									<div> {soc.social_network_name === 'instagram' ? <div className={`${classes.instagram} ${classes.mainSocial}`}>
										<div className={classes.position}><img src={instagram} alt={'inst'}/></div>
										<div className={classes.infoSocial}>
											<p>{soc.social_network_profile}</p>
											<p>{soc.social_network_followers}</p>
										</div>
									</div> : ''
									}</div>


									<div>{soc.social_network_name === 'tiktok' ? <div className={`${classes.tiktok} ${classes.mainSocial}`}>
										<div className={classes.position}><img src={tiktok} alt={'tiktok'}/></div>
										<div className={classes.infoSocial}>
											<p>{soc.social_network_profile}</p>
											<p>{soc.social_network_followers}</p>
										</div>
									</div> : ''
									}</div>

									<div>{soc.social_network_name === "facebook" ? <div className={`${classes.facebook} ${classes.mainSocial}`}>
										<div className={classes.position}><img src={facebook} alt={'facebook'}/></div>
										<div className={classes.infoSocial}>
											<p>{soc.social_network_profile}</p>
											<p>{soc.social_network_followers}</p>
										</div>
									</div> : ''
									}</div>

									<div>{soc.social_network_name === 'youtube' ? <div className={`${classes.youTub} ${classes.mainSocial}`}>
										<div className={classes.position}><img src={youtube} alt={'youtube'}/></div>
										<div className={classes.infoSocial}>
											<p>{soc.social_network_profile}</p>
											<p>{soc.social_network_followers}</p>
										</div>
									</div> : ''
									}</div>

									<div>{soc.social_network_name === 'blog' ? <div className={`${classes.blog} ${classes.mainSocial}`}>
										<div className={classes.position}><img src={blog} alt={'blog'}/></div>
										<div className={classes.infoSocial}>
											<p>{soc.social_network_profile}</p>
											<p>{soc.social_network_followers}</p>
										</div>
									</div> : ''
									}</div>

									<div>{soc.social_network_name === 'twitter' ? <div className={`${classes.twitter} ${classes.mainSocial}`}>
										<div className={classes.position}><img src={twitter} alt={'twitter'}/></div>
										<div className={classes.infoSocial}>
											<p>{soc.social_network_profile}</p>
											<p>{soc.social_network_followers}</p>
										</div>
									</div> : ''
									}</div>

								</div>
							) : ''
							}

						</div>
					</div>
				</section>
			</div>
			<section>
				<div className={classes.ContainerPhoto}>

						{values.instagram_photos ? values.instagram_photos.map((photo) => <div className={classes.instPhoto}><img src={photo} alt={'instPhoto'}/></div>) : ''}


				</div>
			</section>
		</div>
	)
}

export default InfluencerDetails;
