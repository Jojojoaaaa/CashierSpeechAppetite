import React, {Component}from 'react';
import { connect } from 'react-redux';

import LoginContainer from '../containers/LoginContainer';

import * as routes from '../constants/routes';
import * as actions from '../store/actions';

class LoginPage extends Component{
   constructor(props) {
    super(props);
   }
 
   render() {
       return (
        <LoginContainer {...this.props}/>
       )
   }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(LoginPage);