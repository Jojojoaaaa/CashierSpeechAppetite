import React, {Component}from 'react';
import AdminComponent from '../components/AdminComponent';
import '../styles/AdminStyles.css';

class AdminContainer extends Component{
   constructor(props) {
    super(props);
   }

   render() {
       return (
           <div className='admin-container'>
                <AdminComponent/>
           </div>
           
       )
   }
}

export default AdminContainer;