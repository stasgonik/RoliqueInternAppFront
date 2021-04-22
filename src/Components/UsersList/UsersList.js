import React, {useEffect, useRef, useState} from 'react';
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
import photoDefault from '../Items/Icons/vector.svg';
import arrowUp from '../Items/Icons/arrow-up.svg'
import Dropdown2 from "../Items/Dropdown/Dropdown2";


const UsersList = () => {

	const [values, setValues] = useState([]);
	const [initial, setInitial] = useState(true);

	useEffect(() => {
		async function Start() {
			setInitial(false)
			const initialState = await userService.getUsers()
			setValues(initialState)
		}
		if (initial) {
			Start()
		}
	})

	// const [user, setUser] = useState(async () => {
	// 	if (!values.length ) {
	// 		setInitial(false);
	// 		if (initial) {
	// 			const initialState = await userService.getUsers()
	// 			setUser(initialState)
	// 			setValues(initialState)
	// 			console.log(initialState);
	// 		}
	// 	}
	// });

	function capitalizeFirstLetter(string) {
		return string[0].toUpperCase() + string.slice(1);
	}

	const searchName = async (e) => {
		const value = e.target.value;
		const resultFirstName = await userService.getUsers({first_name: value})
		if (resultFirstName) {
			const resultLastName = await userService.getUsers({last_name: value})
			const one = [];
			resultFirstName.forEach(user => {
				one.push(user._id);
			})
			resultLastName.forEach(user => {
				if (!one.includes(user._id)) {
					resultFirstName.push(user);
				}
			})
		}
		setValues(resultFirstName)
	}

	const edit = (item) => {
		console.log(item)
		AuthService.setEditUserId(item._id)
		window.location.href = configFront.URL + 'users'
	}

	return (

		<div className={classes.mainContainer}>
			<Sidebar/>
			<Header titleHeader={classes.titleUsers}
					title='Users'
					titleBtn='Create New'
					upArrow={arrowUp}
					btnHeader={classes.btnHeader}
				// btnHeader={cl}
				// className={classes.btnHeader}

			/>
			{/*<Dropdown2/>*/}
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
					{values ? (values.map((item, index) =>
						<div key={index}>
							<div className={`${classes.tableHeaderInfo}`}>
								{item.profile_picture ? <img src={`${item.profile_picture}`} alt='avatar' className={classes.avatar}/> :
									<img src={photoDefault} alt='photoDefault' className={`${classes.avatar} ${classes.photo}`}/>}

								<div className={classes.tableTextName}><p className={classes.textColor}>{item.first_name} {item.last_name}</p></div>

								<div className={classes.tableTextEmail}><p className={classes.textColor}>{item.email}</p></div>
								<div className={classes.tableTextRole}><p className={classes.textColor}>{capitalizeFirstLetter(item.role)}</p></div>
								<div className={classes.tableText}><p className={classes.textColor}>{item.phone}</p></div>

								<div>{(AuthService.getUserRole() === 'admin') ? <div className={classes.tableBtn}>
									<div className={classes.btnPosition}>
										<img src={path} alt='path' onClick={() => edit(item)} className={classes.infoBtn}/></div>
									<div className={classes.tooltipMain}>
										<div className={classes.TooltipText}/>
										<p>Edit User</p></div>
									<img className={classes.ArrowImg} src={rightArrow}/>
								</div> : ''}</div>
								{(AuthService.getUserRole() === 'manager') && (item.role === 'manager' || item.role === 'employee') ? <div className={classes.tableBtn}>
									<div className={classes.btnPosition}>
										<img src={path} alt='path' onClick={() => edit(item)} className={classes.infoBtn}/></div>
									<div className={classes.tooltipMain}>
										<div className={classes.TooltipText}/>
										<p>Edit User</p></div>
									<img className={classes.ArrowImg} src={rightArrow}/>
								</div> : ''}
								{(AuthService.getUserRole() === 'employee') && (AuthService.getUserId() === item._id) ? <div className={classes.tableBtn}>
									<div className={classes.btnPosition}>
										<img src={path} alt='path' onClick={() => edit(item)} className={classes.infoBtn}/></div>
									<div className={classes.tooltipMain}>
										<div className={classes.TooltipText}/>
										<p>Edit User</p></div>
									<img className={classes.ArrowImg} src={rightArrow}/>
								</div> : ''}
								{/*<div className={classes.tableBtn}><img src={path} alt='path' onClick={() => edit(item)} className={classes.infoBtn}/></div> : ''}</div>*/}

								{/*	{(AuthService.getUserRole() === 'employee') && (AuthService.getUserId() === {item._id}) ?*/}
								{/*<Header titleHeader={classes.titleUsers} title='Users' titleBtn='Create New' className={classes.titleUsers}*/}
								{/*/> : ''}</div>*/}


							</div>
						</div>
					)) : ''}
					}
				</div>


			</section>
			{/*{(AuthService.getUserRole()=== 'admin') ? <div></div> : ''}*/}
			{/*{(AuthService.getUserRole()=== 'manager') && (item.role === 'manager' || item.role === ' employee') ? <div></div> : ''}*/}


		</div>
	)
}

export default UsersList;
