import React, {Component}from 'react';
import moment from 'moment';

import axios from '../axios';
import * as url from '../constants/urls'
import * as status from '../constants/type';

import '../styles/CashierStyles.css';

import OrdersComponent from '../components/OrdersComponent';

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
            console.log(this.state.orders);
        })
        .catch(error => {
            alert(error.message);
        })
        //every two seconds
    }
    handleOrderClick = (order_id) => {
        const post_data = {order_id: order_id};
        console.log(post_data);
    }
    
   render() {
       const {
           orders} = this.state;
       const handleOrderClick = this.handleOrderClick;
       return (
        <div className='cashier-container'>
            <div className='orders'>
                <OrdersComponent
                    orders={orders}
                    handleOrderClick={handleOrderClick}/>
            </div>
        </div>
       )
   }
}

export default CashierContainer;