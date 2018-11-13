import React, {Component}from 'react';
import {withRouter} from 'react-router-dom';
import AdminComponent from '../components/AdminComponent';
import '../styles/AdminStyles.css';

class AdminContainer extends Component{
   constructor(props) {
    super(props);
   }
   handleRedirect = (route_path) => {
    this.props.history.push(route_path);
   }
   render() {
       const handleRedirect = this.handleRedirect;
       return (
           <div className='admin-container'>
                <AdminComponent
                    handleRedirect={handleRedirect}/>
           </div>
           
       )
   }
}

export default withRouter(AdminContainer);