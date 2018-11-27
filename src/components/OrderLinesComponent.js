import React from 'react';

export default function OrderLinesComponent(props) {
    const {
        date,
        item_description,
        qty,
        price,
        total,
    } = props; 

    return (
        <div className='order-line'>
            <div className='flex-short'>{date}</div>
            <div className='flex-long' id='text-emphasize'>{item_description}</div>
            <div className='flex-short'>{qty}</div>
            <div className='flex-short'>Php {price}</div>
            <div className='flex-short' id='text-emphasize'>Php {total}</div>
        </div>
    );
}