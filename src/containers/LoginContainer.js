import React, {Component}from 'react';

import LoginComponent from '../components/LoginComponent';

import axios from '../axios';
import * as url from '../constants/urls';
import * as routes from '../constants/routes';
import * as type from '../constants/type';

import ModalComponent from '../components/ModalComponent';

class LoginContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            modal_type: '',
            modal_message: '',
            show_modal: false,
        }
    }
    componentWillMount() {
    }
    handlePasswordInput = password => {
        this.setState({password: password})
    }
    handleHideModal = () => {
        this.setState({
            show_modal: false
        })
    }
    handleLogin = password => {
        const post_data = {password: password};
        axios.post(url.LOGIN, post_data)
            .then(response => {
                if (response.data === 0) {
                    this.props.onLogin();
                    this.props.history.push(routes.HOME)
                }
                else {
                    this.setState({
                        show_modal: true,
                        modal_type: type.ERROR,
                        modal_message:'Your password is incorrect.'
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
    render() {
        const {
            password,
            modal_message,
            modal_type,
            show_modal,
        } = this.state;
      
        const handlePasswordInput = this.handlePasswordInput;
        const handleLogin = this.handleLogin;
        const handleHideModal = this.handleHideModal;

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
        <div className='login-container'>
            {modal}
            <LoginComponent 
                handlePasswordInput={handlePasswordInput}
                handleLogin={handleLogin}
                password={password}/>
        </div>
       )
   }
}

export default LoginContainer;