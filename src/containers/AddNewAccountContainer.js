import React, {Component}from 'react';
import moment from 'moment';

import ModalComponent from '../components/ModalComponent';

import axios from '../axios';
import * as url from '../constants/urls';
import * as type from '../constants/type';

class AddNewAccountContainer extends Component{
   constructor(props) {
    super(props);
    this.state = {
        first_name: '',
        last_name:'',
        contact_number: '',
        password: '',
        confirm_password:'',
        prompt: '',
        admin_password: '',
        valid: false,
        show_modal:false,
        modal_message: '',
        modal_type: '',
    }
   }
    handleHideModal = () => {
        this.setState({
            show_modal: false
        })
    }
    componentDidMount () {
        
    }
    handleInputChange = (state, value) => {
        this.setState({
            [state]: value
        }, () => this.check());
    }
    handleAdd = () => {
        const {admin_password} = this.state;
        const post_data = {password: admin_password};
        axios.post(url.LOGIN, post_data)
            .then(response => {
                if (response.data === 0) {
                    this.addAccount();
                }
                else {
                    this.setState({
                        show_modal: true,
                        modal_type: type.ERROR,
                        modal_message:'Admin password is incorrect.'
                    })   
                }
            })
            .catch(error => {
                this.setState({
                    show_modal: true,
                    modal_type: type.ERROR,
                    modal_message: type.PRE_ERROR_MESSAGE + error.message + type.POST_ERROR_MESSAGE
                })            
            });
    }
    
    addAccount = () => {
        const {
            first_name,
            last_name,
            contact_number,
            password,
        } = this.state;
        
        const waiter_id = moment().format('YYYY') + last_name;
        const post_data = {
            first_name: first_name,
            last_name: last_name,
            contact_number: contact_number,
            password: password,
            waiter_id: waiter_id
        };
        
        axios.post(url.INSERT_ACCOUNT, post_data)
            .then(response => {
                console.log(response.data);
                if (response.data === type.SUCCESS) {
                    this.setState({
                        show_modal: true,
                        modal_message: 'Account has been added',
                        modal_type: type.SUCCESS
                    })
                    this.props.handleAdded()
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
            })

    }
    
    check = () => {
        const {
            first_name,
            last_name,
            contact_number,
            password,
            confirm_password,
            admin_password,
        } = this.state;
        let valid = ((first_name.length >0) 
                    && (last_name.length > 0) 
                    && (contact_number.length > 10) 
                    && (password.length > 5) 
                    && (confirm_password===password) 
                    && (admin_password.length>0));
        this.setState({
            valid: valid
        });
    }
    
    render() {
        const {
            first_name,
            last_name,
            contact_number,
            password,
            confirm_password,
            admin_password,
            valid,
            show_modal,
            modal_message,
            modal_type
        } = this.state;
      
        const prompt = valid ? '' : 'Please fill out the fields properly'
        const handleCancel = this.props.handleCancel;
        const handleInputChange = this.handleInputChange;
        const handleHideModal = this.handleHideModal;
        const handleAdd = this.handleAdd;
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
        return (
            <div className='modal'>
                <div className='modal-add-account'>
                {modal}
                    {/* way unod and modal-add-input */}
                    <input 
                        value={first_name}
                        onChange={(e) => handleInputChange('first_name', e.target.value)}
                        id='modal-add-input' 
                        type='text' 
                        placeholder='First Name'/>
                    <input 
                        value={last_name}
                        onChange={(e) => handleInputChange('last_name', e.target.value)}
                        id='modal-add-input' 
                        type='text' 
                        placeholder='Last Name'/>
                    <input 
                        value={contact_number}
                        onChange={(e) => handleInputChange('contact_number', e.target.value)}
                        id='modal-add-input' 
                        type='number' 
                        placeholder='Contact Number'/>
                    <div className='text-prompt'>*password must be more than 5 characters* </div>
                    <input 
                        value={password}
                        onChange={(e) => handleInputChange('password', e.target.value)}                    
                        id='modal-add-input'
                        type='password' 
                        placeholder='Password'/>
                    <input 
                        value={confirm_password}
                        onChange={(e) => handleInputChange('confirm_password', e.target.value)}
                        id='modal-add-input' 
                        type='password' 
                        placeholder='Confirm Password'/>
                    <input 
                        value={admin_password}
                        onChange={(e) => handleInputChange('admin_password', e.target.value)}
                        id='modal-add-input' 
                        type='password' 
                        placeholder='Admin Password'/>
                    <div className='text-prompt'>{prompt}</div>
                    <div className='admin-buttons'>
                    <button onClick={() => handleCancel()} className='button-menu' id='button-stroke'>Cancel</button>
                    <button disabled={!valid} onClick={()=>handleAdd()} className='button-menu' id='button-fill'>Confirm</button>
                    </div>
                </div>
            </div>
        )
    }
    }

export default AddNewAccountContainer;