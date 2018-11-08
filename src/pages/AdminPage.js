import React, {Component}from 'react';
import {connect} from 'react-redux';
import AdminContainer from '../containers/AdminContainer';

import * as route from '../constants/routes';

class AdminPage extends Component{
    constructor(props) {
        super(props);
    }
  
   render() {
       return (
        <AdminContainer/>
       )
   }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(AdminPage);