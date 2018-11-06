import React, {Component}from 'react';
import moment from 'moment';

import axios from '../axios';
import * as url from '../constants/urls'
import * as status from '../constants/type';

import '../styles/CashierStyles.css';

import OrdersComponent from '../components/OrdersComponent';
import OrderComponent from '../components/OrderComponent';

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
   
    retrieveAllOrders = () => {
       const post_data = {status: status.SERVED};

       axios.post(url.RETRIEVE_ORDERS, post_data)
        .then(response => {
            let orders = response.data;
            this.setState({orders: orders})
        })
        .catch(error => {
            alert(error.message);
        })
        //every two seconds
    }
    handleOrderClick = (order_id) => {
        const post_data = {order_id: order_id};
        axios.post(url.RETIEVE_ORDER_INVOICE, post_data)
            .then(response => {
                if (response.data.order_items.length > 0) {
                    this.setState({selected_order: response.data})
                    //console.log(response.data);
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
       
       return (
        <div className='cashier-container'>
            <div className='orders'>
                <OrdersComponent
                    orders={orders}
                    handleOrderClick={handleOrderClick}/>
            </div>
            <div className="order">
                <OrderComponent
                    order_items= {selected_order.order_items}/>
            </div>
            <div className='receipt'> 
                receipt
            </div>
        </div>
       )
   }
}

export default CashierContainer;