import React, {Component}from 'react';
import moment from 'moment';

import axios from '../axios';
import * as url from '../constants/urls'
import * as type from '../constants/type';

import OrdersComponent from '../components/OrdersComponent';
import OrderComponent from '../components/OrderComponent';
import InvoiceComponent from '../components/InvoiceComponent';
import ModalComponent from '../components/ModalComponent';
import PrompModalComponent from '../components/PromptModalComponent';

class CashierContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            selected_order: {},
            printed: false,
            modal_type: '',
            modal_message: '',
            show_modal: false,
            show_prompt: false,
            confirm_method: '',
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

    handleHideModal = () => {
        this.setState({
            show_modal: false
        })
    }
    retrieveAllOrders = () => {
       const post_data = {status: type.SERVED};

       axios.post(url.RETRIEVE_ORDERS, post_data)
        .then(response => {
            const orders = response.data;
            this.setState({orders: orders})
        })
        .catch(error => {
            this.setState({
                show_modal: true,
                modal_type: type.ERROR,
                modal_message: type.PRE_ERROR_MESSAGE + error.message + type.POST_ERROR_MESSAGE
            })
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
                this.setState({
                    show_modal: true,
                    modal_type: type.ERROR,
                    modal_message: type.PRE_ERROR_MESSAGE + error.message + type.POST_ERROR_MESSAGE
                })
            })
    }
    setPrinted = () => {
        this.setState({printed: true});
    }
    setPrintedFalse = () => {
        this.setState({printed: false});
    }
    handleCheckOut = () => {
        this.setState({
            show_prompt: true,
            modal_message: 'Are you sure you want to checkout?',
            confirm_method: () => this.checkout()
        })
    }
    handleCancel = () => {
        this.setState({
            show_prompt: false
        })
    }
    checkout = () => {
        const post_data = {
            order_id: this.state.selected_order.id,
            status_update: type.PAID
        }
        axios.post(url.UPDATE_ORDERS_STATUS, post_data)
            .then(response => {
                if (response.data > 0) {
                    this.setState({
                        show_prompt: false,
                        show_modal: true,
                        modal_message: 'Order has been updated.',
                        modal_type: type.SUCCESS
                    })
                    this.setPrintedFalse();
                    this.clearSelectedOrder();
                }
                  else {
                    this.setState({
                        show_modal: true,
                        modal_message: 'Something went wrong...',
                        modal_type: type.ERROR
                    })
                }
            })
            .catch(error => {
                this.setState({
                    show_modal: true,
                    modal_message: type.PRE_ERROR_MESSAGE + error.message + type.POST_ERROR_MESSAGE,
                    modal_type: type.ERROR
                })
              });
    }
   render() {
       const {
           orders,
           selected_order,
           printed, 
           modal_message,
           modal_type,
           show_modal,
           show_prompt, 
           confirm_method,
            } = this.state;
        
       const handleOrderClick = this.handleOrderClick;
       const setPrinted = this.setPrinted;
       const handleCheckOut = this.handleCheckOut;
       const handleHideModal = this.handleHideModal;
       const handleCancel =this.handleCancel;
            
       const modal = (
            show_modal 
                ?
                    <ModalComponent
                        modal_message={modal_message}
                        modal_type={modal_type}
                        handleClick={handleHideModal}
                    />
                :
                null
       )
       const prompt = (
           show_prompt
                ?
                    <PrompModalComponent
                        handleConfirm={confirm_method}
                        handleDecline={handleCancel}
                        modal_message={modal_message}/>
                :
                null
       )
       return (
        <div className='cashier-container'>
            {modal}
            {prompt}
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