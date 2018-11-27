import React, {Component}from 'react';
import {withRouter} from 'react-router-dom';
import PromptModalComponent from '../components/PromptModalComponent';

import NavbarComponent from '../components/NavbarComponent';
import axios from '../axios';
import * as route from '../constants/routes';
import * as url from '../constants/urls';
import * as type from '../constants/type';

class NavbarContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            admin_password: '',
            show_prompt: false,
            modal_message: '',
        }
    }

    handleSettingsClick = () => {
        this.setState({
            show_prompt: true,
            modal_message: 'Change admin password?'
        })
    }
    handleCancel = () => {
        this.setState({
            show_prompt: false
        })
    }
    handleChangePass = () => {
        const {admin_password, password} = this.state;
        const post_data = {password: admin_password};
        axios.post(url.LOGIN, post_data)
            .then(response => {
                if (response.data === 0) {
                    this.updatePassword(password);
                }
                else {
                    this.setState({
                        modal_message:'Admin password is incorrect.'
                    })   
                }
            })
            .catch(error => {
                this.setState({
                    modal_message: type.PRE_ERROR_MESSAGE + error.message + type.POST_ERROR_MESSAGE
                })            
            });
    }
    updatePassword = (pass) => {
        const post_data = {password: pass};
        axios.post(url.UPDATE_PASSWORD, post_data)
            .then(response => {
                if (response.data === type.SUCCESS) {
                    this.setState({
                      modal_message: 'Password has been changed',
                    }, () => this.handleCancel())
                }
                else {
                    this.setState({
                        modal_message: 'Something went wrong...',
                    })
                }
            })
            .catch(error=> {
                this.setState({
                    modal_message: type.PRE_ERROR_MESSAGE + error.message + type.POST_ERROR_MESSAGE
                })
            })
    
    }
    onChangeInput = (state, value ) => {
        this.setState({[state]: value});
    }
    render() {
        const {
            modal_message,
            show_prompt,
            show_modal,
            modal_type,
        } = this.state;
        const selected_page = this.props.location.pathname; 
    
       const onChangeInput = this.onChangeInput;
       const handleCancel = this.handleCancel;
       const handleSettingsClick = this.handleSettingsClick;
       const handleChangePass = this.handleChangePass;

       const cashier_class = (selected_page.includes(route.CASHIER)) ? " cashier-active" : '';
       const admin_class = (selected_page.includes(route.ADMIN)) ? " admin-active" : ''; 

       const prompt = (
        show_prompt
             ?
                 <PromptModalComponent
                     handleConfirm={handleChangePass}
                     handleDecline={handleCancel}
                     modal_message={modal_message}
                    >
                    <input 
                        type='password' 
                        onChange={(e) => onChangeInput('password',e.target.value)}
                        placeholder='New password'/>
                    <input type='password' 
                        onChange={(e) => onChangeInput('admin_password',e.target.value)}
                        placeholder='Current password'/>
                 </PromptModalComponent>
             :
             null
        )
       return (
            <NavbarComponent
            cashier_class={cashier_class}
            admin_class={admin_class}
            handleSettingsClick={handleSettingsClick}
            >
            {prompt}
            </NavbarComponent>            
                
       )
   }
}

export default withRouter(NavbarContainer);