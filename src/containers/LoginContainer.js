import React, {Component}from 'react';

import axios from '../axios';


import LoginComponent from '../components/LoginComponent';

import * as url from '../constants/urls';
import * as routes from '../constants/routes';

class LoginContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            password: ""
        }
    }
    componentWillMount() {
    }
    handlePasswordInput = password => {
        this.setState({password: password})
    }
    handleLogin = password => {
        const post_data = {password: password};
        axios.post(url.LOGIN, post_data)
            .then(response => {
                if (response.data === 0) {
                    this.props.onLogin();
                    this.props.history.push(routes.HOME)
                }
            })
            .catch(error => {
                alert("There's been a " + error.message + ", please make sure that the server is running.");
            });
        
    }
    render() {
        const {
            password
            } = this.state;
      
        const handlePasswordInput = this.handlePasswordInput;
        const handleLogin = this.handleLogin;
       return (
        <div className='login-container'>
            <LoginComponent 
                handlePasswordInput={handlePasswordInput}
                handleLogin={handleLogin}
                password={password}/>
        </div>
       )
   }
}

export default LoginContainer;