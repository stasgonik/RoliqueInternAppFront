import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

import arrowUp from '../Items/Icons/arrow-up.svg';
import AuthService from "../../Services/auth.service";
import classes from './UsersList.module.css';
import loading from "../../img/Loading.gif";
import path from '../Items/Icons/path.svg';
import photoDefault from '../Items/Icons/vector.svg';
import rightArrow from '../Items/Icons/right-arrow.svg';
import routes from "../../Constants/routes.enum";
import Sidebar from '../Items/Sidebar/Sidebar'
import Search from "../Items/Search/Search";
import UsersListHeader from "../Items/UsersListHeader/UsersListHeader";
import userService from "../../Services/userService";


const UsersList = () => {

    const [values, setValues] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [initial, setInitial] = useState(true);

    useEffect(() => {
        async function Start() {
            setInitial(false)
            setIsLoading(true)
            const initialState = await userService.getUsers()
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
        const search = await userService.getUsers({search: value})
        setValues(search);
        setIsLoading(false)
    }

    return (

        <div className={classes.mainContainer}>
            <Sidebar/>
            <UsersListHeader titleHeader={classes.titleUsers}
                             title={initial? '' : 'Users'}
                             titleBtn='Create New'
                             upArrow={arrowUp}
                             btnHeader={classes.btnHeader}

                // btnHeader={cl}
                // className={classes.btnHeader}
            />

            <section className={classes.SearchContainer}>
                <Search placeholder={"Search"}
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
                    {isLoading?
                        <div style={{textAlign: "center", fontSize: "18px", fontWeight: "700", marginTop: "30px"}}>
                            <img style={{margin: "20px auto", width: "50px"}} alt="Loading" src={loading}/>
                            <p>Please wait...</p>
                        </div>
                        : values ? (values.map((item, index) =>
                        <div key={index}>
                            <div className={`${classes.tableHeaderInfo}`}>
                                {item.profile_picture ?
                                    <img src={`${item.profile_picture}`} alt='avatar' className={classes.avatar}/> :
                                    <img src={photoDefault} alt='photoDefault'
                                         className={`${classes.avatar} ${classes.photo}`}/>}

                                <div className={`${classes.tableTextName} ${classes.textColor}`}>{item.first_name} {item.last_name}</div>

                                <div className={`${classes.tableTextEmail} ${classes.textColor}`}>{item.email}</div>
                                <div className={`${classes.tableTextRole} ${classes.textColor}`}>{capitalizeFirstLetter(item.role)}</div>
                                <div className={`${classes.phone} ${classes.tableText} ${classes.textColor}`}>{item.phone}
                                </div>

                                <div>{(AuthService.getUserRole() === 'admin') ?
                                    <Link to={`${routes.USERS}/${item._id}/${routes.EDIT}`}>
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
                                    <Link to={`${routes.USERS}/${item._id}/${routes.EDIT}`}>
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
                                    <Link to={`${routes.USERS}/${item._id}/${routes.EDIT}`}>
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
