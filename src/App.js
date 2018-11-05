import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

// import './App.css';
import * as route from './constants/routes';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path ={route.LOGIN} component={LoginPage}/>
          <Route path ={route.HOME} component={HomePage}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
