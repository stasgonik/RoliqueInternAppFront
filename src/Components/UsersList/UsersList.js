import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

import classes from './UsersList.module.css';
import Sidebar from '../Items/Sidebar/Sidebar'
import Search from "../Items/Search/Search";
import userService from "../../Services/userService";
import AuthService from "../../Services/auth.service";
import configFront from "../../Constants/config";
import path from '../Items/Icons/path.svg';
import rightArrow from '../Items/Icons/right-arrow.svg';
import photoDefault from '../Items/Icons/vector.svg';
import arrowUp from '../Items/Icons/arrow-up.svg';
import UsersListHeader from "../Items/UsersListHeader/UsersListHeader";
import Messages from "../Items/Messages/Messages";


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

    function capitalizeFirstLetter(string) {
        return string[0].toUpperCase() + string.slice(1);
    }

    // const searchName = async (e) => {
    // 	const value = e.target.value;
    // 	const resultFirstName = await userService.getUsers({first_name: value})
    // 	if (resultFirstName) {
    // 		const resultLastName = await userService.getUsers({last_name: value})
    // 		const one = [];
    // 		resultFirstName.forEach(user => {
    // 			one.push(user._id);
    // 		})
    // 		resultLastName.forEach(user => {
    // 			if (!one.includes(user._id)) {
    // 				resultFirstName.push(user);
    // 			}
    // 		})
    // 	}
    // 	setValues(resultFirstName)
    // }

    const searchName = async (e) => {
        const value = e.target.value;
        const search = await userService.getUsers({search: value})
        setValues(search);
    }

    // const edit = (item) => {
    // 	window.location.href = configFront.URL + 'users/' + item._id + "/edit"
    // }

    return (

        <div className={classes.mainContainer}>
            <Sidebar/>
            <UsersListHeader titleHeader={classes.titleUsers}
                             title='Users'
                             titleBtn='Create New'
                             upArrow={arrowUp}
                             btnHeader={classes.btnHeader}

                // btnHeader={cl}
                // className={classes.btnHeader}
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
                    {values ? (values.map((item, index) =>
                        <div key={index}>
                            <div className={`${classes.tableHeaderInfo}`}>
                                {item.profile_picture ?
                                    <img src={`${item.profile_picture}`} alt='avatar' className={classes.avatar}/> :
                                    <img src={photoDefault} alt='photoDefault'
                                         className={`${classes.avatar} ${classes.photo}`}/>}

                                <div className={classes.tableTextName}><p
                                    className={classes.textColor}>{item.first_name} {item.last_name}</p></div>

                                <div className={classes.tableTextEmail}><p
                                    className={classes.textColor}>{item.email}</p></div>
                                <div className={classes.tableTextRole}><p
                                    className={classes.textColor}>{capitalizeFirstLetter(item.role)}</p></div>
                                <div className={classes.tableText}><p className={classes.textColor}>{item.phone}</p>
                                </div>

                                <div>{(AuthService.getUserRole() === 'admin') ?
                                    <Link to={`users/${item._id}/edit`}>
                                        <div className={classes.tableBtn}>
                                            <div className={classes.Test}>
                                                <div className={classes.btnPosition}>
                                                    <img src={path} alt='path'
                                                         className={classes.infoBtn}/></div>
                                            </div>
                                            <div className={classes.tooltipMain}>
                                                <div className={classes.TooltipText}>
                                                    <p>Edit User</p></div>
                                            </div>
                                            <img className={classes.ArrowImg} src={rightArrow} alt={'Right arrow'}/>
                                        </div>
                                    </Link>
                                    : ''}</div>
                                {(AuthService.getUserRole() === 'manager') && (item.role === 'manager' || item.role === 'employee') ?
                                    <Link to={`users/${item._id}/edit`}>
                                        <div className={classes.tableBtn}>
                                            <div className={classes.Test}>
                                                <div className={classes.btnPosition}>
                                                    <img src={path} alt='path'
                                                         className={classes.infoBtn}/></div>
                                            </div>
                                            <div className={classes.tooltipMain}>
                                                <div className={classes.TooltipText}>
                                                    <p>Edit User</p></div>
                                            </div>
                                            <img className={classes.ArrowImg} src={rightArrow} alt={'Right arrow'}/>
                                        </div>
                                    </Link>
                                    : ''}

                                {(AuthService.getUserRole() === 'employee') && (AuthService.getUserId() === item._id) ?
                                    <Link to={`users/${item._id}/edit`}>
                                        <div className={classes.tableBtn}>
                                            <div className={classes.Test}>
                                                <div className={classes.btnPosition}>
                                                    <img src={path} alt='path'
                                                         className={classes.infoBtn}/></div>
                                            </div>
                                            <div className={classes.tooltipMain}>
                                                <div className={classes.TooltipText}>
                                                    <p>Edit User</p></div>
                                            </div>
                                            <img className={classes.ArrowImg} src={rightArrow} alt={'Right arrow'}/>
                                        </div>
                                    </Link>
                                    : ''}
                            </div>
                        </div>
                    )) : ''}
                    }
                </div>
            </section>
        </div>
    )
}

export default UsersList;
