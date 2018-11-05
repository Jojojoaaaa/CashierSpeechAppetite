import React, {Component}from 'react';
import {connect} from 'react-redux';
import CashierContainer from '../containers/CashierContainer';

import * as route from '../constants/routes';

class CashierPage extends Component{
   constructor(props) {
    super(props);
   }

//    componentWillMount() {
//         if (!this.props.auth) {
//             this.props.history.push(route.LOGIN);
//         }
//    }
   render() {
       return (
        <CashierContainer/>
       )
   }
}
const mapStateToProps = state => {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(CashierPage);