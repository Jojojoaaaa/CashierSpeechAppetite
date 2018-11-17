import React, {Component}from 'react';
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
       console.log(this.props);
       const handleRedirect = this.handleRedirect;
       return (     
            <AdminComponent
                handleRedirect={handleRedirect}/>     
       )
   }
}

export default AdminContainer;