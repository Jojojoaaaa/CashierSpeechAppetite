import React, {Component}from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

import '../styles/HomeStyles.css';
import '../styles/HeaderStyles.css';
import '../styles/NavbarStyles.css';

import * as route from '../constants/routes';
import * as actions from '../store/actions';
import NavbarContainer from '../containers/NavbarContainer';
import HeaderComponent from '../components/HeaderComponent';
import PromptModalComponent from '../components/PromptModalComponent';
import CashierPage from './CashierPage';
import AdminPage from './AdminPage';

import bg from '../assets/home-bg.svg';

class HomePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            show_modal: false,
            modal_message: ''
        }
    }

    componentWillMount() {
        if (!this.props.auth) {
            this.props.history.push(route.LOGIN);
        }
    }
    handleLogout = () => {
        this.setState({
            show_modal:true,
            modal_message: 'Are you sure you want to log out?'
        })
    }
    handleConfirmLogout = () => {
        this.setState({
            show_modal: false
        }, () => this.logout())
    }
    handleCancelLogout = () => {
        this.setState({
            show_modal: false
        });
    }
    logout = () => {
        this.props.onLogout();
        this.props.history.push(route.LOGIN);
    }
    render() {
        const {
            show_modal,
            modal_message,
        } = this.state;

        const handleLogout = this.handleLogout;
        const handleCancelLogout = this.handleCancelLogout;
        const handleConfirmLogout = this.handleConfirmLogout;
        const modal = (
            show_modal
                ?
                    <PromptModalComponent
                        handleConfirm={handleConfirmLogout}
                        handleDecline={handleCancelLogout}
                        modal_message={modal_message}/>
                :
                null
        )
       return (
        <div className='screen-box'> 
            {modal}
            <NavbarContainer/>
            <div className='right-box'>
                <HeaderComponent
                    handleLogout = {handleLogout}/>
                <div className='page-container'>
                    <Route exact path ={route.CASHIER} component={CashierPage}/>
                    <Route path ={route.ADMIN} component={AdminPage}/>
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

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.unAuthorize())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);