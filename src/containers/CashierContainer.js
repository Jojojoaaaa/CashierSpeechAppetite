import React, {Component}from 'react';
import moment from 'moment';

import axios from '../axios';
import * as url from '../constants/urls'
import * as status from '../constants/type';

import '../styles/CashierStyles.css';

import OrdersComponent from '../components/OrdersComponent';
import OrderComponent from '../components/OrderComponent';
import InvoiceContainer from './InvoiceContainer';

class CashierContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            selected_order: {},
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
        })
        this.update = setTimeout(this.retrieveAllOrders, 2000);
    }
    clearSelectedOrder = () => {
        this.setState({selected_order: {}});
    }
    handleOrderClick = (order_id, table_number) => {
        const post_data = {order_id: order_id};
        axios.post(url.RETIEVE_ORDER_INVOICE, post_data)
            .then(response => {
                if (response.data.order_items.length > 0) {
                    const selected_order = {...response.data, table_number: table_number}
                    this.setState({selected_order: selected_order})
                }
            })
            .catch(error => {
                alert(error.message);
            })
    }
    
   render() {
       const {
           orders,
           selected_order 
            } = this.state;
       const handleOrderClick = this.handleOrderClick;
       const clearSelectedOrder = this.clearSelectedOrder;
       return (
        <div className='cashier-container'>
            <div className='orders'>
                <OrdersComponent
                    orders={orders}
                    handleOrderClick={handleOrderClick}/>
            </div>
            <OrderComponent
                order_items= {selected_order.order_items}/>
           <InvoiceContainer
                selected_order={selected_order}
                clearSelectedOrder={clearSelectedOrder}/>
        </div>
       )
   }
}

export default CashierContainer;