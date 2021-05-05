import React from 'react';
import {
	useLocation
} from "react-router-dom";

import classes from './Sidebar.module.css';
import logo from '../Icons/vector.svg';
import users from '../Icons/users.svg';
import volume from '../Icons/volume.svg';
import at from '../Icons/at.svg';
import {NavLink} from "react-router-dom";


const Sidebar = () => {
	let loc = useLocation();
	let urlArray = loc.pathname.split('/')

	return (
		<div className={classes.Sidebar}>
			<div className={`${classes.SidebarImgLogo}`}>
				<img src={logo} alt="logo"/>
			</div>
			<NavLink to="/users" className={urlArray.includes('users') ? `${classes.SidebarImg} ${classes.SidebarImgBtn} ${classes.colorChange}`  : `${classes.SidebarImg} ${classes.SidebarImgBtn}`}> <img src={users} alt="users"/>
			</NavLink>

			<NavLink to="/" className={`${classes.SidebarImg} ${classes.SidebarImgBtn}`}>
				<img src={volume} alt="volume"/>
			</NavLink>
			<NavLink to="/influencers" className={urlArray.includes( 'influencers') || urlArray.includes( 'show')? `${classes.SidebarImg} ${classes.SidebarImgBtn} ${classes.colorChange}`  : `${classes.SidebarImg} ${classes.SidebarImgBtn}`}>

				<img src={at} alt="at"/>
			</NavLink>
		</div>
	)

}
export default Sidebar;
