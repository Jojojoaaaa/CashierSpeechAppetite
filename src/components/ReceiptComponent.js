import React from 'react';

import * as content from '../constants/content.js';

import moment from 'moment';

export default function ReceiptComponent(props) {
    const {
        selected_order,
    } = props;
    return (
       <div className='receipt-content'>
            <div className='receipt-header'>
                {content.HEADER}
            </div>
            <div className='receipt-order-details'>
                <div>{moment(selected_order.date).format("lll")}</div>
                <div>OR No.:00000424{selected_order.id}</div>
                <div>Waiter: {selected_order.waiter_id}</div>
                <div>{selected_order.order_type}</div>
            </div>
            <div className='receipt-heading'>
                        <div id='receipt-item-name'>Item</div>
                        <div className='receipt-item'>Price</div>
                        <div className='receipt-item'>Qty</div>
                        <div className='receipt-item'>Amount</div>
            </div>
            <div>
                {selected_order.order_items 
                ?
                <div className='receipt-orders'>
                    {(selected_order.order_items.map(item => {
                        return (
                            <div className='receipt-item-card' key={item.menu}>                          
                                <div id='receipt-item-name'>{item.menu}</div>
                                <div className='receipt-item'>{item.price}</div>
                                <div className='receipt-item'>{item.qty}</div>
                                <div className='receipt-item'>{item.qty * item.price}</div>
                            </div>
                        )
                    }))}
                    </div>
                : 
                null}
            </div>
            <div className='receipt-total'>
                <div className="total-flex">
                    <div>Net Amount Php</div> 
                    <div>{(selected_order.total-selected_order.total*0.12).toFixed(2)}</div>
                </div>
                <div className="total-flex">
                    <div>VAT (12%)</div> 
                    <div>{(selected_order.total*0.12).toFixed(2)}</div>
                </div>
                <div className="total-flex">
                    <div>Total Php</div> 
                    <div>{(selected_order.total).toFixed(2)}</div>
                </div>
            </div>

            <div className='receipt-footer'>
                {content.FOOTER}
            </div>
       </div>
    );
}