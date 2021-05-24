import React from 'react';
import {Link, useParams} from "react-router-dom";

import AuthService from "../../../Services/auth.service";
import './UsersListHeader.css'
import routes from "../../../Constants/routes.enum";


const UsersListHeader = ({upArrow, titleBtn, titleHeader, title, titleBtnEdit, EditInf, icon}) => {
    let params = useParams();
    if (!params[routes.INFLUENCER_ID]) {
        params[routes.INFLUENCER_ID] = 0
    }

    const myFunction = () => {
        document.getElementById("myDropdown").classList.toggle("show");
    }
    return (
        <header className={'header'}>
            <div className={'headerRightBlock'}>
                <h1 className={titleHeader}>{title}</h1>
            </div>

            {(AuthService.getUserRole() === 'admin' || AuthService.getUserRole() === 'manager')? <Link to={`${params[routes.INFLUENCER_ID]}/${routes.EDIT}`} className={EditInf ? 'EditSrc' : 'DispNone'}
                   style={icon}>
                <div className={EditInf}>{titleBtnEdit}</div>
            </Link> : ''}

            <div
                className={'dropdown'}>{(AuthService.getUserRole() === 'admin' || AuthService.getUserRole() === 'manager') ?
                <button className={'dropbtn'} onClick={() => myFunction()}><img src={upArrow} alt={'upArrow'}
                                                                                className={'upArrow'}/><span
                    className={'titleBtn'}>{titleBtn}</span></button> : ""}
                <div id='myDropdown' className={'dropdownContent'}>
                    <div className={'content'}>
                        <Link exact to="#" className={'linkBtn Compaign'}>Campaign</Link>
                        <Link to={`/${routes.INFLUENCERS}/${routes.CREATE}`}
                              className={'linkBtn Influencer'}>Influencer</Link>
                        <Link to={`/${routes.USERS}/${routes.CREATE}`} className={'linkBtn User'}>Internal User</Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default UsersListHeader;
