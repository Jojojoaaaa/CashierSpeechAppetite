import React, {Component}from 'react';

import ListHeaderComponent from '../components/ListHeaderComponent';
import AccountLineContainer from './AccountLineContainer';
import ModalComponent from '../components/ModalComponent';
import AccountHeaderComponent from '../components/AccountHeaderComponent';
import AddNewAccountContainer from './AddNewAccountContainer';

import axios from '../axios';
import * as url from '../constants/urls';
import * as type from '../constants/type';
import '../styles/AccountsStyles.css';

class AccountsContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            modal_type: '',
            modal_message: '',
            show_modal: false,
            waiter_ids: [],
            add_account: false
        }
    }
    componentDidMount() {
        this.retrieveWaiterIDs();
    }
    handleHideModal =() => {
        this.setState({
            show_modal: false
        })
    }
    handleAddNewAccount = () => {
        this.setState({
            add_account: true
        })
    }
    handleCancelAdd = ()=> {
        this.setState({
            add_account:false
        })
    }
    handleConfirmAdd = () => {
        this.setState({
            add_account: false
        })
        this.retrieveWaiterIDs();
    }
    handleSearchQueryChange = (search_query) => {
        if (search_query ==='') {
            this.retrieveWaiterIDs();
        }
        else {
            const {waiter_ids} = this.state;
            let match = new RegExp(search_query, 'i');

            const filtered_waiter = waiter_ids.filter(waiter => match.test(waiter));
            this.setState({waiter_ids: filtered_waiter});
        }
        
    };
    retrieveWaiterIDs = () => {
        axios.post(url.RETRIEVE_USERS)
            .then(response => {
                this.setState({
                    waiter_ids: response.data
                })
            })
            .catch(error => {
                this.setState({
                    show_modal: true,
                    modal_type: type.ERROR,
                    modal_message: type.PRE_ERROR_MESSAGE + error.message + type.POST_ERROR_MESSAGE
                })
            });
    }
    render() {
        const {
            modal_message,
            modal_type,
            show_modal,
            waiter_ids,
            add_account
        } = this.state;

        const handleHideModal = this.handleHideModal;
        const handleSearchQueryChange = this.handleSearchQueryChange;
        const handleAddNewAccount = this.handleAddNewAccount;
        const handleConfirmAdd = this.handleConfirmAdd;
        const handleCancelAdd = this.handleCancelAdd;
        const retrieveWaiterIDs = this.retrieveWaiterIDs;
        const modal = (
            show_modal
                ?
                <ModalComponent
                    modal_message={modal_message}
                    modal_type={modal_type}
                    handleClick={handleHideModal}/>
                :
                null
        );
        const add = (
            add_account
                ?
                    <AddNewAccountContainer
                        handleAdded={handleConfirmAdd}
                        handleCancel={handleCancelAdd}/>  
                :
                    null
        )
        return (
            <div className='accounts-container'>
                {modal}
                {add}
                <div className='accounts-header'>
                    <AccountHeaderComponent
                        handleSearchQueryChange={handleSearchQueryChange}
                        handleAddNewAccount={handleAddNewAccount}/>
                </div>
                <div>
                    <ListHeaderComponent
                        column1='Waiter ID'
                        column2='First Name'
                        column3='Last Name'
                        column4='Contact No.'
                        column5='Password'
                        wild_class='flex-short'
                    />
                    
                    <div className='accounts'>
                        {waiter_ids[0]
                            ?
                                waiter_ids.map(id => <AccountLineContainer refresh={retrieveWaiterIDs}key={id} id={id}/>)
                            :
                            null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default AccountsContainer;