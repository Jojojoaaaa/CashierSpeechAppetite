import React, {Component}from 'react';
import CashierComponent from '../components/HomeComponent';
import '../styles/CashierStyles.css';

class CashierContainer extends Component{
   constructor(props) {
    super(props);
   }

   render() {
       return (
        <div className='cashier-container'>
            <CashierComponent/>
        </div>
       )
   }
}

export default CashierContainer;