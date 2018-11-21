import React from 'react';

import * as route from '../constants/routes';
import * as content from '../constants/content';

import account from '../assets/admin/icon-account.svg';
import menu from '../assets/admin/icon-menu.svg';
import order from '../assets/admin/icon-orders.svg';
export default function AdminComponent(props) {
        const {
            handleRedirect
            } = props; 
    return (
        <div  className='admin-container'>
            <div className='admin-nav'>
                <div className='admin-choices'>
                    <div className="choices-icon"><img src={account}></img></div>
                    <div className="choices-content" id="text-title">Accounts</div>
                    <div className="choices-content">{content.ACCOUNTS_DESC}</div>
                    <div className="choices-button"><button id="btn-view" onClick={() => handleRedirect(route.MANAGE_ACCOUNT)}>View</button></div>
                </div>
                <div className='admin-choices'>
                    <div className="choices-icon"><img src={menu}></img></div>
                    <div className="choices-content" id="text-title">Menu</div>
                    <div className="choices-content">{content.MENU_DESC}</div>
                    <div className="choices-button"><button id="btn-view" onClick={() => handleRedirect(route.MENU)}>View</button></div>
                </div>
                <div className='admin-choices'>
                    <div className="choices-icon"><img src={order}></img></div>
                    <div className="choices-content" id="text-title">Orders</div>
                    <div className="choices-content">{content.ORDERS_DESC}</div>
                    <div className="choices-button"><button id="btn-view" onClick={() => handleRedirect(route.ORDERS)}>View</button></div>
                </div>
            </div>
        </div>
    );
}