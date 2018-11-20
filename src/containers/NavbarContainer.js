import React, {Component}from 'react';
import {withRouter} from 'react-router-dom';

import NavbarComponent from '../components/NavbarComponent';
import * as route from '../constants/routes';

class NavbarContainer extends Component{
    constructor(props) {
        super(props);
    }

   render() {
       const selected_page = this.props.location.pathname; 

       const cashier_class = (selected_page === route.CASHIER) ? " cashier-active" : '';
       const admin_class = (selected_page === route.ADMIN) ? " admin-active" : ''; 

       return (
            <NavbarComponent
                cashier_class={cashier_class}
                admin_class={admin_class}/>
       )
   }
}

export default withRouter(NavbarContainer);