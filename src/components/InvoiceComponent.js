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
                    className='invoice-section'>
                    <div  ref ={(el) =>ref = el}>
                        <ReceiptComponent   
                        selected_order={selected_order}/>

                    </div>
                </div>
                {/* do not remove */}

                <div className="invoice-table">
                <div id="text-table">Table {selected_order.table_number}</div>
                <div id="text-order">Order #{selected_order.id}</div>
                </div>
                
                
                <div className="invoice-payment">
                    <div id="text-payment">Payment Details</div>
                    <div className="payment-flex">
                        <div id="text-title">Net Amount</div> 
                        <div id="text-amount">Php {(selected_order.total-selected_order.total*0.12).toFixed(2)}</div>
                    </div>
                    <div className="payment-flex">
                        <div id="text-title">VAT (12%)</div> 
                        <div id="text-amount">Php {(selected_order.total*0.12).toFixed(2)}</div>
                    </div>
                    <div className="payment-flex">
                        <div id="text-title">Total</div> 
                        <div id="text-amount">Php {(selected_order.total).toFixed(2)}</div>
                    </div>
                </div>

                <div className="invoice-buttons">
                    <ReactToPrint
                        trigger={() =>  <button className="button-invoice">Print</button>}
                        content={() => ref}
                        onAfterPrint={() => setPrinted()}
                    />
                    <button 
                        className="button-invoice"
                        disabled={!printed} 
                        onClick={() => handleCheckOut()}>Check Out</button>
                </div>
                
            </div>)
        :
        null
    );
}