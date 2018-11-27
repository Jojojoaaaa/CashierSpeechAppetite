import React, {Component}from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import AdminContainer from '../containers/AdminContainer';
import MenuContainer from '../containers/MenuContainer';
import OrdersContainer from '../containers/OrdersContainer';
import AccountsContainer from '../containers/AccountsContainer';

import * as route from '../constants/routes';

class AdminPage extends Component{
    constructor(props) {
        super(props);
    }
  
   render() {
       return (
        <div>
            <Route exact path={route.MANAGE_ACCOUNT} component={AccountsContainer}/>
            <Route exact path={route.MENU} component={MenuContainer}/>
            <Route exact path={route.ADMIN} component={AdminContainer}/>
            <Route exact path={route.ORDERS} component={OrdersContainer}/>
        </div>
       )
   }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(AdminPage);