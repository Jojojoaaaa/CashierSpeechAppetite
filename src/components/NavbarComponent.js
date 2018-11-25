import React from 'react';
import {Link} from 'react-router-dom';

import cashier from '../assets/navbar/btn-cashier.svg';
import admin from '../assets/navbar/btn-admin.svg';
import settings from '../assets/navbar/icon-settings.svg';

import * as route from '../constants/routes';

export default function NavbarComponent(props) {
    const {
        cashier_class,
        admin_class
    } = props;
    
    return (
        <div className="nav-container">
            <div className='nav-pages'>
                <div 
                    className={"button-flex"+cashier_class}
                    id="btn-cashier">
                        <Link to={route.CASHIER}>
                            <img src={cashier} ></img>
                        </Link>
                </div>
                <div 
                    className={"button-flex"+admin_class} 
                    id="btn-admin">
                        <Link to={route.ADMIN}>
                            <img src={admin} ></img>
                        </Link>
                </div>
            </div> 
            <div>
                <img  className='nav-settings' src={settings}></img>
            </div>
        </div>
    );
}