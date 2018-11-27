import React, {Component}from 'react';
import moment from 'moment';

import axios from '../axios';
import * as url from '../constants/urls'
import * as type from '../constants/type';

import OrdersComponent from '../components/OrdersComponent';
import OrderComponent from '../components/OrderComponent';
import InvoiceContainer from '../components/InvoiceComponent';
import ModalComponent from '../components/ModalComponent';
import PrompModalComponent from '../components/PromptModalComponent';

class CashierContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            selected_order: {},
            printed_orders: [],
            order_summaries: {},
            modal_type: '',
            modal_message: '',
            show_modal: false,
            show_prompt: false,
            confirm_method: '',
            date : moment().format('LL'),
        }
    }
    componentWillMount() {
        if (this.props.auth) {
            //this.retrieveAllOrders();          
        }
    }
    componentWillUnmount() {
        clearTimeout(this.update);
    }
    onChangeCash =(selected_order, cash) => {
        const total = selected_order.total;
        const valid = (total<=cash);
        const id = selected_order.id;
        let order_summary = {valid: valid, cash: cash}
        let order_summaries = {...this.state.order_summaries}

        this.setState({
           order_summaries: {...order_summaries, [id]:order_summary}
        }, () => console.log(this.state.order_summaries));

    }
    handleHideModal = () => {
        this.setState({
            show_modal: false
        })
    }
    retrieveAllOrders = () => {
       const {date} = this.state; 
       const post_data = {status: type.SERVED, date: date};

       axios.post(url.RETRIEVE_ORDERS, post_data)
        .then(response => {
            const orders = response.data;
            console.log(orders);
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
                    const {printed_orders} = this.state;
                    let selected_order = {...response.data, table_number: table_number};
                    const printed = (printed_orders.includes(selected_order.id));
                    selected_order = {...selected_order, printed: printed};
                    this.setState({selected_order: selected_order})
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
    setPrinted = (id) => {
        const {printed_orders, selected_order} = this.state;
        this.setState({printed_orders: [...printed_orders, id], selected_order: {...selected_order, printed: true}});
    
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
           modal_message,
           modal_type,
           show_modal,
           show_prompt, 
           confirm_method,
           order_summaries,
            } = this.state;
       const handleOrderClick = this.handleOrderClick;
       const setPrinted = this.setPrinted;
       const handleCheckOut = this.handleCheckOut;
       const handleHideModal = this.handleHideModal;
       const handleCancel =this.handleCancel;
       const onChangeCash = this.onChangeCash;
       const checkout =this.checkout;
            
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
                        modal_message={modal_message}
                    />
                :
                null
       )
       const orders_component = (
           orders 
                ?
                    <OrdersComponent
                    selected_order={selected_order}
                    orders={orders}
                    handleOrderClick={handleOrderClick}
                    />
                :
                    null
        )
       return (
        <div className='cashier-container'>
            {modal}
            {prompt}
            <div className='orders'>
            {orders_component}
            </div>
            <OrderComponent
                order_items= {selected_order.order_items}/>
           <InvoiceContainer
                    selected_order={selected_order}
                    setPrinted={setPrinted}
                    checkout={checkout}
                    onChangeCash={onChangeCash}
                    order_summaries={order_summaries}/>
        </div>
       )
   }
}

export default CashierContainer;