import React, {Component}from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

import '../styles/HomeStyles.css';
import * as route from '../constants/routes';

import NavbarContainer from '../containers/NavbarContainer';
import HeaderComponent from '../components/HeaderComponent';
import CashierPage from './CashierPage';
import AdminPage from './AdminPage';

class HomePage extends Component{
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (!this.props.auth) {
            this.props.history.push(route.LOGIN);
        }
    }
    render() {
       return (
        <div className='screen-box'> 
            <NavbarContainer/>
            <div className='right-box'>
                <HeaderComponent/>
                <div className='page-container'>
                    <Route exact path ={route.CASHIER} component={CashierPage}/>
                    <Route exact path ={route.ADMIN} component={AdminPage}/>
                </div>
            </div>
        </div>
       )
    }
}
const mapStateToProps = state => {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(HomePage);