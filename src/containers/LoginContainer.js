import React, {Component}from 'react';
import LoginComponent from '../components/LoginComponent';
import '../styles/LoginStyles.css';

class LoginContainer extends Component{
   constructor(props) {
    super(props);
   }
   componentWillMount() {
       console.log(this.props);
   }
   render() {
       return (
        <div className='login-container'>
            <LoginComponent/>
        </div>
       )
   }
}

export default LoginContainer;