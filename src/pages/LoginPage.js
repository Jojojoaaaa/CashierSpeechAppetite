import React, {Component}from 'react';
import { connect } from 'react-redux';

import LoginContainer from '../containers/LoginContainer';

import '../styles/LoginStyles.css';
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

const mapDispatchToProps = dispatch => {
    return {
        onLogin: () => dispatch(actions.authorize())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);