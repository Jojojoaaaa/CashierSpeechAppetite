import React, {Component} from 'react';
import ReactToPrint from 'react-to-print';
import ReceiptComponent from '../components/ReceiptComponent';

import axios from '../axios';

import * as url from '../constants/urls';
import * as status from '../constants/type';

class InvoiceContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            printed: false
        }
    }
    setPrinted = () => {
        const {printed} = this.state;
        this.setState({printed: !printed})
    }
    handleCheckOut = () => {
        const post_data = {
            order_id: this.props.selected_order.id,
            status_update: status.PAID
        }
        axios.post(url.UPDATE_ORDERS_STATUS, post_data)
            .then(response => {
                if (response.data > 0) {
                    alert('Order has been updated.');
                    this.setPrinted();
                    this.props.clearSelectedOrder();
                }
                  else {
                    alert('Something went wrong...');
                }
            })
            .catch(error => {
                alert(error.message);
              });
    }
    render() {
        const {selected_order} = this.props;
        const {printed} = this.state;
        const setPrinted = this.setPrinted;
        const handleCheckOut = this.handleCheckOut;

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
}

export default InvoiceContainer;