import React, {useRef, useState} from 'react';
import classes from './UsersList.module.css';

import Header from '../Items/Header/Header';
import Sidebar from '../Items/Sidebar/Sidebar'

import userService from "../../Services/userService";
import Search from "../Items/Search/Search";
import config from "../../Constants/configServer";
import AuthService from "../../Services/auth.service";
import configFront from "../../Constants/config";
import path from '../Items/Icons/path.svg';
import Tooltip from "../Items/Tooltip/Tooltip";

import rightArrow from '../Items/Icons/right-arrow.svg';



const UsersList = () => {

	const [values, setValues] = useState([]);

	const [user, setUser] = useState(async () => {
		const initialState = await userService.getUsers()
		setUser(initialState)
		console.log(initialState);
		setValues(initialState)
	});

	function capitalizeFirstLetter(string) {
		return string[0].toUpperCase() + string.slice(1);
	}

	const searchName = async (e) => {
		const value = e.target.value;
		const resultName = await userService.getUsers({first_name: value})
		setValues(resultName)
	}

	const edit = (item) => {
		console.log(item)
		AuthService.setEditUserId(item._id)
		window.location.href = configFront.URL + 'registration'
	}
	return (

		<div className={classes.mainContainer}>
			<Sidebar/>
			<Header titleHeader={classes.titleUsers}
					title='Users'
					titleBtn='Create New'
					className={classes.titleUsers}
			/>

			<section className={classes.SearchContainer}>
				<Search
					onChangeName={(e) => searchName(e)}/>
			</section>
			<section className={classes.tableHeader}>
				<p className={classes.tableHeaderName}>Name</p>
				<p className={classes.tableHeaderEmail}>Email</p>
				<p className={classes.tableHeaderRole}>Role</p>
				<p>Phone</p>
			</section>
			<section>

				<div>
					{
						values.map((item, index) =>
							<div  key={index}>
								<div className={`${classes.tableHeaderInfo}`}>
									<img src={`${config.URL}${item.profile_picture}`} alt='avatar' className={classes.avatar}/>
									<div className={classes.tableTextName}> <p>{item.first_name}</p></div>
									{/*<p className={classes.tableTextSurname}>{item.last_name}</p>*/}
									<div  className={classes.tableTextEmail}><p>{item.email}</p></div>
									<div><p className={classes.tableTextRole}>{capitalizeFirstLetter(item.role)}</p></div>
									<div><p className={classes.tableText}>{item.phone}</p></div>
									<div className={classes.tableBtn}>
										<img src={path} alt='path' onClick={()=>edit(item)} className={classes.infoBtn}/>
										<div className={classes.tooltip}>
											<Tooltip align='center' text={'Edit User'} rightArrow={rightArrow}/>
										</div>
									</div>
								</div>

							</div>
						)
					}
				</div>


			</section>
			{/*{(AuthService.getUserRole()=== 'admin') ? <div></div> : ''}*/}
			{/*{(AuthService.getUserRole()=== 'manager') && (item.role === 'manager' || item.role === ' employee') ? <div></div> : ''}*/}
			{/*{(AuthService.getUserRole()=== 'employee') && (AuthService.getUserId()=== {item._id}) ? <div></div> : ''}*/}

		</div>
	)
}

export default UsersList;
