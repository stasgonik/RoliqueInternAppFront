import React, {useEffect, useState} from 'react';
import {
	useParams
} from "react-router-dom";

import arrowUp from '../Items/Icons/arrow-up.svg'
import blog from '../Items/Icons/blog.svg';
import classes from './InfluencerDetails.module.css';
import edit from '../Items/Icons/edit-alt.svg';
import facebook from '../Items/Icons/facebook.svg';
import InfluencersService from "../../Services/influencers.service";
import instagram from '../Items/Icons/instagram.svg';
import loading from '../../img/Loading.gif'
import Sidebar from '../Items/Sidebar/Sidebar'
import tiktok from '../Items/Icons/tiktok.svg';
import twitter from '../Items/Icons/twitter.svg';
import UsersListHeader from "../Items/UsersListHeader/UsersListHeader";
import youtube from '../Items/Icons/youtube.svg';
import routes from "../../Constants/routes.enum";
import configFront from "../../Constants/configFront";

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
				const initialState = await InfluencersService.getSingleInfluencer(params[routes.INFLUENCER_ID], true)

				const arr = initialState.social_profiles;
				arr.splice(1, 3).reverse().forEach(value => arr.push(value))
				arr.splice(1, 2).reverse().forEach(value => arr.push(value))



				if (initialState.social_profiles.length) {
					initialState.social_profiles.forEach((value) => {
						let newValue = value.social_network_followers.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
						value.social_network_followers = newValue;
					})
				}

				if (!initialState.birthdate) {
					setValues({...initialState})

				} else {
					const newDate = initialState.birthdate.split('T').shift();
					setValues({...initialState, birthdate: newDate.split('-').reverse().join('.')});

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
							 icon={{background: `url(${edit}) no-repeat`, backgroundPosition: 'left 8px top 8px'}}
			/>
			{isLoading ?
				<div style={{textAlign: "center", fontSize: "18px", fontWeight: "700", marginTop: "30px"}}>
					<img style={{margin: "20px auto", width: "50px"}} alt="Loading" src={loading}/>
					<p>Please wait...</p>
				</div> :
				<div className={classes.infoContainer}>
					<section className={classes.rightBox}>
						<img src={values.profile_picture} alt="avatar"/>
					</section>
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
										<div> {soc.social_network_name === 'instagram' ?
											<div className={`${classes.instagram} ${classes.mainSocial}`}>
												<div className={classes.position}><img src={instagram} alt={'inst'}/></div>
												<div className={classes.infoSocial}>
													<p>{soc.social_network_profile}</p>
													<p>{soc.social_network_followers}</p>
												</div>
											</div> : ''
										}</div>


										<div>{soc.social_network_name === 'tiktok' ?
											<div className={`${classes.tiktok} ${classes.mainSocial}`}>
												<div className={classes.position}><img src={tiktok} alt={'tiktok'}/></div>
												<div className={classes.infoSocial}>
													<p>{soc.social_network_profile}</p>
													<p>{soc.social_network_followers}</p>
												</div>
											</div> : ''
										}</div>

										<div>{soc.social_network_name === "facebook" ?
											<div className={`${classes.facebook} ${classes.mainSocial}`}>
												<div className={classes.position}><img src={facebook} alt={'facebook'}/>
												</div>
												<div className={classes.infoSocial}>
													<p>{soc.social_network_profile}</p>
													<p>{soc.social_network_followers}</p>
												</div>
											</div> : ''
										}</div>

										<div>{soc.social_network_name === 'youtube' ?
											<div className={`${classes.youTub} ${classes.mainSocial}`}>
												<div className={classes.position}><img src={youtube} alt={'youtube'}/></div>
												<div className={classes.infoSocial}>
													<p>{soc.social_network_profile}</p>
													<p>{soc.social_network_followers}</p>
												</div>
											</div> : ''
										}</div>

										<div>{soc.social_network_name === 'blog' ?
											<div className={`${classes.blog} ${classes.mainSocial}`}>
												<div className={classes.position}><img src={blog} alt={'blog'}/></div>
												<div className={classes.infoSocial}>
													<p>{soc.social_network_profile}</p>
													<p>{soc.social_network_followers}</p>
												</div>
											</div> : ''
										}</div>

										<div>{soc.social_network_name === 'twitter' ?
											<div className={`${classes.twitter} ${classes.mainSocial}`}>
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
			}
			{isLoading ? "" :
				<section>
					<div className={classes.ContainerPhoto}>

						{values.instagram_photos ? values.instagram_photos.map((photo) => <div
							className={classes.instPhoto}><img src={photo} alt={'instPhoto'}/></div>) : ''}


					</div>
				</section>}
		</div>
	)
}

export default InfluencerDetails;
