import React from 'react';

import moment from 'moment';
import design from '../assets/cashier/icon-design.svg';
export default function OrdersComponent(props) {
    const {
        selected_order,
        orders,
        handleOrderClick} = props;
    return (    
        orders.map(order => {
            const order_class = (selected_order.id === order.id) ? 'selected-order-card' : 'order-card';
            return ( <div 
                    className={order_class} 
                    key={order.id}
                    onClick={() => handleOrderClick(order.id, order.table_number)}>
                    <div className='order-table-num'>
                    <div>Table</div>
                    <div id="num-textbold">{order.table_number}</div>
                    </div>
                    <div className="order-details">
                        <div>Order #{order.id}</div>
                        <br/>
                        {moment(order.date).format("LT")}
                    </div>
                    <div className="order-logo">
                        <img src={design}></img>
                    </div>
                </div>)
        })
    );
}