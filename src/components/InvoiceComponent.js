import React from 'react';
import ReactToPrint from 'react-to-print';
import ReceiptComponent from '../components/ReceiptComponent';

export default function InvoiceComponent(props) {
    const {
        selected_order,
        setPrinted,
        handleCheckOut,
        printed,
    } = props;
    let ref = "";
    return (
        selected_order.order_items
        ?
            (<div className='invoice'>
                {/* di kitanon ni pero do not remove */}
                <div 
                    className='receipt-section'>
                    <div  ref ={(el) =>ref = el}>
                        <ReceiptComponent/>
                    </div>
                </div>
                {/* do not remove */}

                <div className="receipt-table">
                <text id="text-table">Table {selected_order.table_number}</text>
                <text id="text-order">Order #{selected_order.id}</text>
                </div>
                
                
                <div className="receipt-payment">
                    <div id="text-payment">Payment Details</div>
                    <div className="payment-flex">
                        <text id="text-title">Net Amount</text> 
                        <text id="text-amount">Php {(selected_order.total-selected_order.total*0.12).toFixed(2)}</text>
                    </div>
                    <div className="payment-flex">
                        <text id="text-title">VAT (12%)</text> 
                        <text id="text-amount">Php {(selected_order.total*0.12).toFixed(2)}</text>
                    </div>
                    <div className="payment-flex">
                        <text id="text-title">Total</text> 
                        <text id="text-amount">Php {(selected_order.total).toFixed(2)}</text>
                    </div>
                </div>

                <div className="receipt-buttons">
                    <ReactToPrint
                        trigger={() =>  <button className="button-receipt">Print</button>}
                        content={() => ref}
                        onAfterPrint={() => setPrinted()}
                    />
                    <button 
                        className="button-receipt"
                        disabled={!printed} 
                        onClick={() => handleCheckOut()}>Check Out</button>
                </div>
                
            </div>)
        :
        null
    );
}