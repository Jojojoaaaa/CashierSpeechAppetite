import React from 'react';
import ReactToPrint from 'react-to-print';
import ReceiptComponent from './ReceiptComponent';

export default function InvoiceContainer(props) {
        const {
            selected_order,
            setPrinted,
            checkout,
            onChangeCash,
            order_summaries
        } = props;
        const id = selected_order.id;
        const valid = order_summaries[id] ? order_summaries[id].valid : false;
        const cash = order_summaries[id] ? order_summaries[id].cash : false;
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
                            selected_order={selected_order}
                            cash={cash}
                            change={cash - selected_order.total}
                            valid={valid}
                            />

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
                    <div className="payment-flex">
                        <div id="text-title"> Cash </div>
                        <input 
                            id="text-amount"
                            type='number' 
                            value= {cash} 
                            onChange={(e) => onChangeCash(selected_order, e.target.value)} 
                            hidden={!selected_order.printed}
                            />
                    </div>
                    <div className="payment-flex">
                        <div id="text-title"> Change </div>
                        <div 
                            id="text-amount"
                            hidden={!selected_order.printed}
                            >
                            Php {(valid) ? cash - selected_order.total : 0}
                        </div>
                    </div>
                    
                    <div className="invoice-buttons">
                        <ReactToPrint
                            trigger={() =>  <button className="button-invoice">Bill</button>}
                            content={() => ref}
                            onAfterPrint={() => setPrinted(selected_order.id)}
                        />
                        <ReactToPrint
                            trigger={() =>  <button className="button-invoice"disabled={!(valid &&selected_order.printed)}>Check Out</button>}
                            content={() => ref}
                            onAfterPrint={() => checkout()}
                        />
                    </div>
                    
                </div>)
            :
            null
        );
}
