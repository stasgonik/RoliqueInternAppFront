import React from 'react';
import {Link} from "react-router-dom";
import './UsersListHeader.css'
import AuthService from "../../../Services/auth.service";


const UsersListHeader = ({upArrow, titleBtn, titleHeader, title}) => {

	const myFunction = () => {
		document.getElementById("myDropdown").classList.toggle("show");
	}
	return (
		<header className={'header'}>
			<div className={'headerRightBlock'}>
				<h1 className={titleHeader}>{title}</h1>
			</div>
			 <div className={'dropdown'}>{(AuthService.getUserRole() === 'admin' || AuthService.getUserRole() === 'manager') ?
				<button className={'dropbtn'} onClick={() => myFunction()}><img src={upArrow} alt={'upArrow'} className={'upArrow'}/><span className={'titleBtn'}>{titleBtn}</span></button> : ""}
				<div id='myDropdown' className={'dropdownContent'}>
					<div className={'content'}>
						<Link to="#" className={'linkBtn Compaign'}>Compaign</Link>
						<Link to="#" className={'linkBtn Influencer'}>Influencer</Link>
						<Link to="users/create" className={'linkBtn User'}>Internal User</Link>
					</div>
				</div>
			</div>
		</header>
	)
}
export default UsersListHeader;
