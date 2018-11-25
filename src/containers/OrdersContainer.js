import React, {Component}from 'react';
import ReactToPrint from 'react-to-print';

import OrdersHeaderComponent from '../components/OrdersHeaderComponent';
import {OrderLinesComponent, OrderLinesHeaderComponent} from '../components/OrderLinesComponent';
import ModalComponent from '../components/ModalComponent';
import OrdersFilterComponent from '../components/OrdersFilterComponent';

import moment from 'moment';

import '../styles/OrdersStyles.css';

import axios from '../axios';
import * as url from '../constants/urls';
import * as type from '../constants/type';
class OrdersContainer extends Component{
    constructor(props) {
        super(props);
            this.state = {
                date : moment().format('LL'),
                week: [],
                show_modal: false,
                modal_type: '',
                modal_message: '',
                order_lines: [],
                filter_visible: false,
                filter: type.TODAY_FILTER,
                sort_by: ''
            }
    }
    componentDidMount() {
        this.retrieveAllOrders();
    }
    handleFilterClick = () => {
        const {filter_visible} = this.state;
        this.setState({
                filter_visible: !filter_visible
            });
    }
    handleSort =(sort)=> {
        let order_lines = [...this.state.order_lines];
        const {filter} = this.state;
        switch(sort) {
            case type.DATE_SORT:
                if (filter !== type.WEEK_FILTER) {
                    order_lines.sort(this.sortDate);
                }
                break;
            case type.NAME_SORT:
                order_lines.sort(this.sortName);
                break;
            case type.QTY_SORT:
                order_lines.sort(this.sortQty);
                break;
        }
        this.setState({
            sort_by: sort,
            order_lines:order_lines});
    }
    handleFilter = (filter) => {
        switch(filter) {
            case type.TODAY_FILTER:
                const date = moment().format('LL');
                this.setState({date: date});
                this.retrieveFilteredOrders(date);
                break;
            case type.WEEK_FILTER:
            case type.MONTH_FILTER:
                const month = moment().format('MMMM');
                this.setState({date: month});
                this.retrieveFilteredOrders(month);
                break;
            case type.YEAR_FILTER:
                const year = moment().format('YYYY');
                this.setState({date: year});
                this.retrieveFilteredOrders(year);
            default:
        } 
        this.setState({filter: filter});
    }
    sortName = (a, b) => {
        if (a.item_description < b.item_description)
            return -1;
        if (a.item_description > b.item_description)
            return 1;
        return 0;
    }
    sortQty = (a, b) => {
        if (a.qty > b.qty)
            return -1;
        if (a.qty < b.qty)
            return 1;
        return 0;
    }
    sortDate = (a,b) => {
        a = moment(a.date);
		b = moment(b.date);
		return b.diff(a);
    }
    // sortMonth = (a,b) => {
    //     a = moment(a.date);
    //     b= moment(b.date);
    //     console.log(a.diff(b, 'months'));
    //     return a.diff(b, 'months');  
    // }
    retrieveAllOrders =() => {
        const {date} = this.state;
        const post_data = {
            date: date
        };
        axios.post(url.RETRIEVE_ORDER_RECORD_DAY,post_data)
            .then(response => {
                this.setState({
                    order_lines: response.data
                });
            })
            .catch(error => {
                this.setState({
                    show_modal: true,
                    modal_type: type.ERROR,
                    modal_message: type.PRE_ERROR_MESSAGE + error.message + type.POST_ERROR_MESSAGE
                });
            })
        
    }
    retrieveFilteredOrders =(date) => {
        const post_data = {
            date: date
        };
        axios.post(url.RETRIEVE_ORDER_RECORD_DAY,post_data)
            .then(response => {
                this.setState({
                    order_lines: response.data
                });
            })
            .catch(error => {
                this.setState({
                    show_modal: true,
                    modal_type: type.ERROR,
                    modal_message: type.PRE_ERROR_MESSAGE + error.message + type.POST_ERROR_MESSAGE
                });
            })
        
    }
    handleSearchQueryChange = (search_query) => {
        if (search_query === '') {
            const {filter} = this.state;
            switch(filter) {
                case type.TODAY_FILTER:
                this.retrieveAllOrders();
                break;
            }
         }
        else {
            const {order_lines} = this.state;
            var match = new RegExp(search_query, 'i');

            const filtered_menu = order_lines.filter(order => match.test(order.item_description));
            this.setState({order_lines: filtered_menu});
        }
    };
    handleCloseModal = () => {
        this.setState({
            show_modal: false
        })
    }

   render() {
        const {
            show_modal,
            modal_message,
            modal_type,
            order_lines,
            filter_visible,
            filter,
            sort_by
        } = this.state;
        const filter_class = (filter_visible) ? '' : 'hide';

        const handleCloseModal = this.handleCloseModal;
        const handleFilterClick = this.handleFilterClick;
        const handleSearchQueryChange = this.handleSearchQueryChange
        const handleSort = this.handleSort;
        const handleFilter = this.handleFilter;
        const modal = (
            show_modal 
            ? 
                <ModalComponent
                    modal_type={modal_type}
                    modal_message={modal_message}
                    handleClick={handleCloseModal}
                    />
            : 
            null
        );

        const order_lines_group = order_lines.map(order => (
            <OrderLinesComponent
                key={order.item_description}
                date={moment(order.date).format('l')}
                item_description={order.item_description}
                qty={order.qty}
                price={order.price}
                total={order.qty * order.price}/>
        ));
        
       return (
        <div className='orders-container'>
            <div className='orders-content'>
                <div className='orders-header'>
                    <OrdersHeaderComponent
                    handleFilterClick={handleFilterClick}
                    filter_visible={filter_visible}
                    handleSearchQueryChange={handleSearchQueryChange}/>
                </div>
                <div className='orders-pdf'>
                <ReactToPrint
                    trigger={() => <button className='button-pdf'>Export to PDF</button>}
                    content={() => this.ref}
                    />
                </div>
                <div  ref ={(el) =>this.ref = el}>
                    <OrderLinesHeaderComponent/>
                    <div className='order-lines'>
                        {order_lines_group}
                    </div>
                </div>
            </div>
            <div className={'orders-filter '+filter_class}>
                <OrdersFilterComponent
                handleFilterClick={handleFilterClick}
                handleSort={handleSort}
                handleFilter={handleFilter}
                filter={filter}
                sort_by={sort_by}/>
            </div>
            {modal}
        </div>
       )
   }
}

export default OrdersContainer;