import React from 'react';

import * as route from '../constants/routes';

export default function AdminComponent(props) {
        const {
            handleRedirect
            } = props; 
    return (
        <div  className='admin-container'>
            <div className='admin-design'>Welcome Admin</div>
            <div className='admin-nav'>
                <div className='manage-account-box'>
                    Manage Waiter Account <br/>
                    <button onClick={() => handleRedirect(route.MANAGE_ACCOUNT)}>Create</button>
                </div>
                <div className='menu-box'>
                    Menu <br/>
                    <button onClick={() => handleRedirect(route.MENU)}>View</button>
                </div>
                <div className='orders-box'>
                    Orders <br/>
                    <button onClick={() => handleRedirect(route.ORDERS)}>View</button>
                </div>
            </div>
        </div>
    );
}