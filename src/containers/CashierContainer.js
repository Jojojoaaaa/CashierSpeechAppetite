import React, {Component}from 'react';
import moment from 'moment';

import axios from '../axios';
import * as url from '../constants/urls'
import * as status from '../constants/type';

import OrdersComponent from '../components/OrdersComponent';
import OrderComponent from '../components/OrderComponent';
import InvoiceComponent from '../components/InvoiceComponent';

class CashierContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            selected_order: {},
            printed: false
        }
    }
    componentWillMount() {
        if (this.props.auth) {
            this.retrieveAllOrders();          
        }
    }
    componentWillUnmount() {
        clearTimeout(this.update);
    }
    retrieveAllOrders = () => {
       const post_data = {status: status.SERVED};

       axios.post(url.RETRIEVE_ORDERS, post_data)
        .then(response => {
            const orders = response.data;
            this.setState({orders: orders})
        })
        .catch(error => {
            alert(error.message);
            clearTimeout(this.update);
        })
        this.update = setTimeout(this.retrieveAllOrders, 2000);
    }
    clearSelectedOrder = () => {
        this.setState({selected_order: {}});
    }
    handleOrderClick = (order_id, table_number) => {
        const post_data = {order_id: order_id};
        axios.post(url.RETRIEVE_ORDER_INVOICE, post_data)
            .then(response => {
                if (response.data.order_items.length > 0) {
                    const selected_order = {...response.data, table_number: table_number}
                    this.setState({selected_order: selected_order})
                    this.setPrintedFalse();
                }
            })
            .catch(error => {
                alert(error.message);
            })
    }
    setPrinted = () => {
        this.setState({printed: true});
    }
    setPrintedFalse = () => {
        this.setState({printed: false});
    }
    handleCheckOut = () => {
        const post_data = {
            order_id: this.state.selected_order.id,
            status_update: status.PAID
        }
        axios.post(url.UPDATE_ORDERS_STATUS, post_data)
            .then(response => {
                if (response.data > 0) {
                    alert('Order has been updated.');
                    this.setPrintedFalse();
                    this.clearSelectedOrder();
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
       const {
           orders,
           selected_order,
           printed, 
            } = this.state;
        
       const handleOrderClick = this.handleOrderClick;
       const setPrinted = this.setPrinted;
       const handleCheckOut = this.handleCheckOut;
       return (
        <div className='cashier-container'>
            <div className='orders'>
                <OrdersComponent
                    selected_order={selected_order}
                    orders={orders}
                    handleOrderClick={handleOrderClick}/>
            </div>
            <OrderComponent
                order_items= {selected_order.order_items}/>
           <InvoiceComponent
                    selected_order={selected_order}
                    printed={printed}
                    setPrinted={setPrinted}
                    handleCheckOut={handleCheckOut}/>
        </div>
       )
   }
}

export default CashierContainer;