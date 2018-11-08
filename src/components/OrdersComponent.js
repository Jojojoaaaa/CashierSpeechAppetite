import React from 'react';

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
                        {order.table_number}
                </div>
                <div>
                    {order.id}
                    <br/>
                    {order.date}
                </div>
            </div>
        ))
    );
}