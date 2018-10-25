import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import './App.css';

import * as route from './constants/routes';

import NavbarContainer from './containers/NavbarContainer';
import HeaderComponent from './components/HeaderComponent';
import CashierPage from './pages/CashierPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='app'> 
          <NavbarContainer/>
          <div className='box-2'>
            <HeaderComponent/>
            <div className='page-container'>
              <Route path ={route.CASHIER} component={CashierPage}/>
              <Route path ={route.ADMIN} component={AdminPage}/>
              <Route path ={route.LOGIN} component={LoginPage}/>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
