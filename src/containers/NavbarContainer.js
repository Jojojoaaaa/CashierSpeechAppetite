import React, {Component}from 'react';
import NavbarComponent from '../components/NavbarComponent';

class NavbarContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
          password: ""
        }
        
    }

   render() {
       return (
            <NavbarComponent/>
       )
   }
}

export default NavbarContainer;