import React from 'react';

export function OrderLinesHeaderComponent(props) {
    return (
       <div className='order-lines-header'>
           <div className='flex-short'>Date</div>
           <div className='flex-long'>Item Description</div>
           <div className='flex-short'>Qty</div>
           <div className='flex-short'>Price</div>
           <div className='flex-short'>Total</div>
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
            <div className='flex-short'>{date}</div>
            <div className='flex-long' id='text-emphasize'>{item_description}</div>
            <div className='flex-short'>{qty}</div>
            <div className='flex-short'>Php {price}</div>
            <div className='flex-short' id='text-emphasize'>Php {total}</div>
        </div>
    );
}