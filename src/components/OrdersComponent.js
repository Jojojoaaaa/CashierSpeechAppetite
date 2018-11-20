import React from 'react';

import moment from 'moment';
import design from '../assets/cashier/icon-design.svg';
export default function OrdersComponent(props) {
    const {
        orders,
        handleOrderClick} = props;
 
    return (    
        orders.map(order => (
            <div 
                className='order-card' 
                key={order.id}
                onClick={() => handleOrderClick(order.id, order.table_number)}>
                <div className='order-table-num'>
                <text>Table</text>
                <text id="num-textbold">{order.table_number}</text>
                </div>
                <div className="order-details">
                    <text>Order #{order.id}</text>
                    <br/>
                    {moment(order.date).format("LT")}
                </div>
                <div className="order-design">
                    <img src={design} alt=""></img>
                </div>
            </div>
        ))
    );
}