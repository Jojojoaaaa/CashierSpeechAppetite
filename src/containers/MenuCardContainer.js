import React, {Component}from 'react';
import MenuCardComponent from '../components/MenuCardComponent';


import axios from '../axios';
import * as url from '../constants/urls';

class MenuCardContainer extends Component{
   constructor(props) {
    super(props);
    this.state = {
        image_source: "",
        cat_image_source: "",
        name: "",
        desc: "",
        servings: 0,
        price: 0,
        edit_mode: false,
    }
    this.id = this.props.id;
   }
   componentDidMount() {
       this.retrieveMenuProfile();
   }
   retrieveMenuProfile = () => {
    const post_data = {id: this.id};
    axios.post(url.RETRIEVE_MENU_PROFILE, post_data)
        .then(response => {
            const menu_profile = response.data;
            this.setState({
                image_source: "data:image/png;base64, "+menu_profile.image,
                cat_image_source:  "data:image/png;base64, "+menu_profile.category_image,
                name: menu_profile.name,
                desc: menu_profile.description,
                servings: menu_profile.servings,
                price: menu_profile.price
            })
        })
        .catch(error => alert(error.message));
    }

   render() {
       const {
            edit_mode,
            image_source,
            name,
            desc,
            price,
            servings,
            cat_image_source
        } = this.state;

       return (
        <MenuCardComponent
            edit_mode={edit_mode}
            image_source={image_source}
            name={name}
            desc={desc}
            price={price}
            servings={servings}
            cat_image_source={cat_image_source}/>
       )
   }
}

export default MenuCardContainer;