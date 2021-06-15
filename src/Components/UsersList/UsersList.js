import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

import arrowUp from '../Items/Icons/arrow-up.svg';
import AuthService from "../../Services/auth.service";
import classes from './UsersList.module.css';
import path from '../Items/Icons/path.svg';
import photoDefault from '../Items/Icons/blog.svg'
import rightArrow from '../Items/Icons/right-arrow.svg';
import routes from '../../Constants/routes.enum';
import Sidebar from '../Items/Sidebar/Sidebar'
import Search from '../Items/Search/Search';
import UsersListHeader from "../Items/UsersListHeader/UsersListHeader";
import UserService from "../../Services/user.service";
import Loading from "../Items/Loading/Loading";
import ListLink from "../Items/ListLink/ListLink";
import Header from "../Items/Header/Header";


const UsersList = () => {

	const [values, setValues] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [initial, setInitial] = useState(true);

	useEffect(() => {
		async function Start() {
			setInitial(false)
			setIsLoading(true)
			const initialState = await UserService.getUsers()
			setValues(initialState)
			setIsLoading(false)
		}

		if (initial) {
			Start()
		}
	})

	function capitalizeFirstLetter(string) {
		return string[0].toUpperCase() + string.slice(1);
	}

	const searchName = async (e) => {
		setIsLoading(true)
		const value = e.target.value;
		const search = await UserService.getUsers({search: value})
		setValues(search);
		setIsLoading(false)
	}

	return (

		<main className={classes.mainContainer}>

			<Sidebar/>
			<UsersListHeader titleHeader={classes.titleUsers}
							 title={initial ? '' : 'Users'}
							 titleBtn='Create New'
							 upArrow={arrowUp}
							 btnHeader={classes.btnHeader}
			/>

			<section className={classes.SearchContainer}>
				<Search placeholder={"Search"}
						onChangeName={(e) => searchName(e)}/>
			</section>



			<section className={classes.userListContainer}>


				<table className={classes.tableUserListInfo}>
					<thead>
					<tr className={classes.tr}>
						<th/>
						<th><span>Name</span></th>
						<th><span>Email</span></th>
						<th><span>Role</span></th>
						<th><span>Phone</span></th>
					</tr>
					</thead>

					{isLoading ? <Loading message='Please wait...'/> : values ? (values.map((item) =>
						<tbody className={classes.tableUserListText} key={item._id}>
						<tr>
							<td> {item.profile_picture ?
								<img src={`${item.profile_picture}`} alt='avatar' className={classes.avatar}/> :
								<img src={photoDefault} alt='photoDefault'
									 className={`${classes.avatar} ${classes.photo}`}/>}
							</td>
							<td>{item.first_name} {item.last_name}</td>
							<td>{item.email}</td>
							<td>{capitalizeFirstLetter(item.role)}</td>
							<td>{item.phone}</td>

							<td className={classes.tdLink}>{(AuthService.getUserRole() === 'admin') || ((AuthService.getUserRole() === 'manager') && (item.role === 'manager' || item.role === 'employee')) || ((AuthService.getUserRole() === 'employee') && (AuthService.getUserId() === item._id)) ?
								<ListLink message='Edit User' arrow={rightArrow} link={`${routes.USERS}/${item._id}/${routes.EDIT}`}/>
								: ''}</td>

						</tr>
						</tbody>
					)) : ''}

				</table>


				{/*    {isLoading ? <Loading message='Please wait...'/>*/}
				{/*        : values ? (values.map((item, index) =>*/}
				{/*        <div key={index}>*/}
				{/*            <div className={`${classes.tableHeaderInfo}`}>*/}
				{/*                {item.profile_picture ?*/}
				{/*                    <img src={`${item.profile_picture}`} alt='avatar' className={classes.avatar}/> :*/}
				{/*                    <img src={photoDefault} alt='photoDefault'*/}
				{/*                         className={`${classes.avatar} ${classes.photo}`}/>}*/}

				{/*                <div className={`${classes.tableTextName} ${classes.textColor}`}>{item.first_name} {item.last_name}</div>*/}

				{/*                <div className={`${classes.tableTextEmail} ${classes.textColor}`}>{item.email}</div>*/}
				{/*                <div className={`${classes.tableTextRole} ${classes.textColor}`}>{capitalizeFirstLetter(item.role)}</div>*/}
				{/*                <div className={`${classes.phone} ${classes.tableText} ${classes.textColor}`}>{item.phone}*/}
				{/*                </div>*/}

				{/*                <div>{(AuthService.getUserRole() === 'admin') ?*/}
				{/*                    <Link to={`${routes.USERS}/${item._id}/${routes.EDIT}`}>*/}
				{/*                        <div className={classes.tableBtn}>*/}
				{/*                            <div className={classes.Test}>*/}
				{/*                                <div className={classes.btnPosition}>*/}
				{/*                                    <img src={path} alt='path'*/}
				{/*                                         className={classes.infoBtn}/></div>*/}
				{/*                            </div>*/}
				{/*                            <div className={classes.tooltipMain}>*/}
				{/*                                <div className={classes.TooltipText}>*/}
				{/*                                    <p>Edit User</p></div>*/}
				{/*                            </div>*/}
				{/*                            <img className={classes.ArrowImg} src={rightArrow} alt={'Right arrow'}/>*/}
				{/*                        </div>*/}
				{/*                    </Link>*/}
				{/*                    : ''}</div>*/}
				{/*                {(AuthService.getUserRole() === 'manager') && (item.role === 'manager' || item.role === 'employee') ?*/}
				{/*                    <Link to={`${routes.USERS}/${item._id}/${routes.EDIT}`}>*/}
				{/*                        <div className={classes.tableBtn}>*/}
				{/*                            <div className={classes.Test}>*/}
				{/*                                <div className={classes.btnPosition}>*/}
				{/*                                    <img src={path} alt='path'*/}
				{/*                                         className={classes.infoBtn}/></div>*/}
				{/*                            </div>*/}
				{/*                            <div className={classes.tooltipMain}>*/}
				{/*                                <div className={classes.TooltipText}>*/}
				{/*                                    <p>Edit User</p></div>*/}
				{/*                            </div>*/}
				{/*                            <img className={classes.ArrowImg} src={rightArrow} alt={'Right arrow'}/>*/}
				{/*                        </div>*/}
				{/*                    </Link>*/}
				{/*                    : ''}*/}

				{/*                {(AuthService.getUserRole() === 'employee') && (AuthService.getUserId() === item._id) ?*/}
				{/*                    <Link to={`${routes.USERS}/${item._id}/${routes.EDIT}`}>*/}
				{/*                        <div className={classes.tableBtn}>*/}
				{/*                            <div className={classes.Test}>*/}
				{/*                                <div className={classes.btnPosition}>*/}
				{/*                                    <img src={path} alt='path'*/}
				{/*                                         className={classes.infoBtn}/></div>*/}
				{/*                            </div>*/}
				{/*                            <div className={classes.tooltipMain}>*/}
				{/*                                <div className={classes.TooltipText}>*/}
				{/*                                    <p>Edit User</p></div>*/}
				{/*                            </div>*/}
				{/*                            <img className={classes.ArrowImg} src={rightArrow} alt={'Right arrow'}/>*/}
				{/*                        </div>*/}
				{/*                    </Link>*/}
				{/*                    : ''}*/}
				{/*            </div>*/}
				{/*        </div>*/}
				{/*    )) : ''}*/}
				{/*    }*/}

			</section>
		</main>
	)
}

export default UsersList;
