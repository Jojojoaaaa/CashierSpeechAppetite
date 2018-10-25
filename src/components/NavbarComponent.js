import React from 'react';
import {Link} from 'react-router-dom';

import '../styles/NavbarStyles.css';

import * as route from '../constants/routes';

export default function NavbarComponent(props) {
    return (
        <div className='nav-container'>
            <div>
                <Link to={route.CASHIER}>(icon)Cashier</Link>
            </div>
            <div>
                <Link to={route.ADMIN}>(icon)Admin</Link>
            </div>
        </div>
    );
}