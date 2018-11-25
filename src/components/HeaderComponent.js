import React from 'react';
import moment from 'moment'

import admin from "../assets/header/icon-admin.svg"
import logout from "../assets/header/btn-logout.svg"
import logo from "../assets/header/h-logo.svg"

export default function HeaderComponent(props) {
    const {handleLogout} = props;
    return (
       <div className="header-container">
            <div>
                <img alt="" src={logo}></img>
            </div>
            <div className="header-admin">
                <div id="header-flex"><img src={admin} alt="" id="icon-admin"></img>
                    Admin 
                    <br/> 
                    {moment().format("l")}
                </div>
                <div id="header-flex"><img src={logout} alt="" className="button" onClick={() => handleLogout()}></img></div>
            </div>    
       </div>
    );
}