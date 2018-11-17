import React, {Component}from 'react';
import {withRouter} from 'react-router-dom';

import MenuHeaderContianer from '../containers/MenuHeaderContainer';
import MenuCardContainer from '../containers/MenuCardContainer'
import '../styles/MenuStyles.css';

import axios from '../axios';
import * as url from '../constants/urls';


class MenuContainer extends Component{
   constructor(props) {
    super(props);
    this.state = {
        menu: []
    }
   }

   componentDidMount() {
       this.retrieveAllMenu();
   }
   retrieveAllMenu = () => {
       axios.get(url.RETRIEVE_ALL_MENU)
        .then(response => {
            this.setState({menu: response.data});
            console.log(response.data);
        })
        .catch(error => {
            alert(error.message);
        })
      
   }
   render() {
       const {menu} = this.state;

       const menu_cards = (
            menu 
            ?
            menu.map(m => <MenuCardContainer key={m.id} id={m.id}/>)
            : 
            null
        );
       return (
        <div className='menu-container'>
            <div className='menu-content'>
                <div className='menu-header'>
                    <MenuHeaderContianer/>                
                </div>
                <div className='menu-cards'>
                   {menu_cards}
                </div>
            </div>
            <div className='menu-filter' style={{display: 'none'}}>filter</div>
        </div>

       )
   }
}

export default withRouter(MenuContainer);