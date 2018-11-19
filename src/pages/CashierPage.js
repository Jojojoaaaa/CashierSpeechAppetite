import React, {Component}from 'react';
import {connect} from 'react-redux';
import CashierContainer from '../containers/CashierContainer';

// import * as route from '../constants/routes';
import '../styles/CashierStyles.css';

class CashierPage extends Component{
   constructor(props) {
    super(props);
   }

   render() {
       return (
        <CashierContainer {...this.props}/>
       )
   }
}
const mapStateToProps = state => {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(CashierPage);