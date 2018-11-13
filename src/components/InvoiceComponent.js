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

                Table {selected_order.table_number} <br/>
                Order {selected_order.id} <br/>
                Payment Details <br/>
                Total Php {selected_order.total} <br/>
                <ReactToPrint
                    trigger={() =>  <button>Print</button>}
                    content={() => ref}
                    onAfterPrint={() => setPrinted()}
                />
                <button 
                    disabled={!printed} 
                    onClick={() => handleCheckOut()}>Check Out</button>
            </div>)
        :
        null
    );
}