import React from 'react';
import {Link} from 'react-router-dom';

import cashier from '../assets/navbar/btn-cashier.svg';
import admin from '../assets/navbar/btn-admin.svg';

import * as route from '../constants/routes';

export default function NavbarComponent(props) {
    return (
        <div className="nav-container">
                <div className="button-flex" id="btn-cashier" ><Link to={route.CASHIER}><img src={cashier} ></img></Link></div>
                <div className="button-flex" id="btn-admin"><Link to={route.ADMIN}><img src={admin} ></img></Link></div> 
        </div>
    );
}