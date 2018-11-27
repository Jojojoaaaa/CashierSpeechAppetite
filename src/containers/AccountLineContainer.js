import React, {Component}from 'react';

import axios from '../axios';
import * as url from '../constants/urls';
import * as type from '../constants/type';

import btndelete from '../assets/admin/icon-delete.svg'
import edit from '../assets/admin/icon-edit.svg'
import ModalComponent from '../components/ModalComponent';
import PromptModalComponent from '../components/PromptModalComponent';

class AccountLineContainer extends Component{
   constructor(props) {
    super(props);
    this.state = {
        waiter_id: '',
        first_name: '',
        last_name: '',
        password: '',
        contact_number: '',
        modal_type: '',
        modal_message: '',
        show_modal: false,
        edit_mode: false,
        show_prompt: false,
    }
    this.id = this.props.id;
    }

    componentDidMount() {
        this.retrieveAccount();
    }
    handleCancel = () => {
        this.retrieveAccount();
        this.setState({
            edit_mode: false
        })
    }
    handleSave =() => {
        this.setState({
            edit_mode: false
        })
        const {first_name, last_name, contact_number, password, waiter_id} = this.state;
        const post_data = {
            waiter_id: waiter_id,
            first_name: first_name,
            last_name: last_name,
            contact_number:contact_number,
            password: password
        };
        axios.post(url.UPDATE_ACCOUNT, post_data)
            .then(response => {
                if (response.data === type.SUCCESS) {
                    this.setState({
                        show_modal: true,
                        modal_message: 'Account has been updated',
                        modal_type: type.SUCCESS
                    })
                }
                else {
                    this.setState({
                        show_modal: true,
                        modal_message: 'Something went wrong...',
                        modal_type: type.ERROR
                    })
                }
            })
            .catch(error =>{
                this.setState({
                    show_modal: true,
                    modal_message: type.PRE_ERROR_MESSAGE + error.message + type.POST_ERROR_MESSAGE,
                    modal_type: type.ERROR
                })
            })
    }
    handleHideModal =() => {
        this.setState({
            show_modal: false
        })
    }
    handleEdit =() => {
        this.setState({
            edit_mode: true
        })
    }
    onInputChange = (state, value) => {
        this.setState({
            [state] : value
        });
    }
    handleDelete = () => {
        this.setState({
            show_prompt: true,
            modal_message: 'Are you sure you want to delete account?'
        })
    }
    handleConfirmDelete = () => {
        this.setState({
            show_prompt: false
        })
        const {waiter_id} =this.state;
        const post_data = {waiter_id:waiter_id};

        axios.post(url.DELETE_ACCOUNT, post_data)
            .then(response => {
                if (response.data === type.SUCCESS) {
                    this.setState({
                        show_modal: true,
                        modal_message: 'Account has been deleted',
                        modal_type: type.SUCCESS
                    })
                    
                }
                else {
                    this.setState({
                        show_modal: true,
                        modal_message: 'Something went wrong...',
                        modal_type: type.ERROR
                    })
                }
                this.props.refresh();
            })
            .catch(error => {
                this.setState({
                    show_modal: true,
                    modal_message: type.PRE_ERROR_MESSAGE + error.message + type.POST_ERROR_MESSAGE,
                    modal_type: type.ERROR
                })
            })
    }
    handleCancelDelete = () => {
        this.setState({
            show_prompt: false
        })
    }
    retrieveAccount = () => {
        const post_data = {id: this.id}
        axios.post(url.RETRIEVE_PROFILE, post_data)
            .then(response => {
                const {waiter_id,first_name, last_name, password, contact_number} = response.data;
                this.setState({
                    waiter_id: waiter_id,
                    first_name: first_name,
                    last_name: last_name,
                    password: password,
                    contact_number: contact_number
                });
            })
            .catch(error => {
                this.setState({
                    show_modal: true,
                    modal_type: type.ERROR,
                    modal_message: type.PRE_ERROR_MESSAGE + error.message + type.POST_ERROR_MESSAGE
                });
            });
    }

    render() {
        const {
            modal_message,
            modal_type,
            show_modal,
            show_prompt,
            edit_mode,
            first_name,
            last_name,
            waiter_id,
            password,
            contact_number,
        } = this.state;

        const handleHideModal = this.handleHideModal;
        const handleEdit = this.handleEdit; 
        const handleSave = this.handleSave;
        const handleCancel = this.handleCancel;
        const onInputChange = this.onInputChange;
        const handleDelete = this.handleDelete;
        const handleCancelDelete = this.handleCancelDelete;
        const handleConfirmDelete = this.handleConfirmDelete;

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
        const prompt = (
            show_prompt
                ?
                <PromptModalComponent   
                    modal_message={modal_message}
                    handleConfirm={handleConfirmDelete}
                    handleDecline={handleCancelDelete}/>
                :
                null
        )
        return (
            <div className='account'>
            {modal}
            {prompt}
            <button
                onClick={()=> handleDelete()} className='account-button'><img src={btndelete}></img></button>
            <div className='flex-short-account'>{waiter_id}</div>
            <input 
                className='flex-short-account'
                type='text'
                disabled={!edit_mode}
                value={first_name}
                onChange={(e) => onInputChange('first_name', e.target.value)}
            />
            <input 
                className='flex-short-account'
                type='text'
                disabled={!edit_mode}
                value={last_name}
                onChange={(e) => onInputChange('last_name', e.target.value)}

            />
            <input 
                className='flex-short-account'
                type='number'
                disabled={!edit_mode}
                value={contact_number}
                onChange={(e) => onInputChange('contact_number', e.target.value)}
            />
            <input 
                className='flex-short-account'
                type='password'
                disabled={!edit_mode}
                value={password}
                onChange={(e) => onInputChange('password', e.target.value)}
            />
            {edit_mode
                ?
                <div>
                    <button onClick={() => handleSave()} className='account-button'>Save</button>
                    <button onClick={() => handleCancel()} className='account-button'>Cancel</button>
                </div>
                :
                <button onClick={() => handleEdit()} className='account-button'><img src={edit}></img></button>
            }
            </div>
        )
    }
}

export default AccountLineContainer;