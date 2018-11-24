import React, {Component}from 'react';

import '../styles/OrdersStyles.css';

class OrdersContainer extends Component{
   constructor(props) {
    super(props);
   }

   render() {
       return (
        <div className='orders-container'>
            <div className='orders-content'>
                <div className='orders-header'>

                </div>
                <div className='order-cards'>

                </div>
            </div>
            <div className='orders-filter'>

            </div>
        </div>
       )
   }
}

export default OrdersContainer;