import React from 'react';

export function OrderLinesHeaderComponent(props) {
    return (
       <div className='order-lines-header'>
           <div>Date</div>
           <div>Item Description</div>
           <div>Oty</div>
           <div>Price</div>
           <div>Total</div>
       </div>
    );
}

export function OrderLinesComponent(props) {
    const {
        date,
        item_description,
        qty,
        price,
        total,
    } = props; 

    return (
        <div className='order-line'>
        <div>{date}</div>
        <div>{item_description}</div>
        <div>{qty}</div>
        <div>{price}</div>
        <div>{total}</div>
    </div>
    );
}