import React from 'react';

import moment from 'moment';
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
                    <text>Table</text>
                    <text id="num-textbold">{order.table_number}</text>
                    </div>
                    <div className="order-details">
                        <text>Order #{order.id}</text>
                        <br/>
                        {moment(order.date).format("LT")}
                    </div>
                </div>)
        })
    );
}