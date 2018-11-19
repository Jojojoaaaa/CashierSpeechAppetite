import React, {Component}from 'react';
import MenuCardComponent from '../components/MenuCardComponent';


import axios from '../axios';
import * as url from '../constants/urls';
import * as type from '../constants/type';

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
        category_name: '',
        category_display: {display: 'none'},
        category_image_display: {display: ''},
        options_display: {display: 'none'},
        edit_button_display: {display: ''}
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
                image_source: type.IMAGE_PREFIX +menu_profile.image,
                cat_image_source:  type.IMAGE_PREFIX+menu_profile.category_image,
                name: menu_profile.name,
                desc: menu_profile.description,
                servings: menu_profile.servings,
                price: menu_profile.price,
                category_name: menu_profile.category_name
            })
        })
        .catch(error => alert(error.message));
    }
    handleEditMode = () => {
       this.setState({
           edit_mode: true,
           options_display: {display: ''},
           edit_button_display: {display: 'none'}
       });
    }
    handleCancelClick = () => {
        this.retrieveMenuProfile();
        this.restoreDefaultMode();
    }
    restoreDefaultMode  = () => {
        this.setState({
            edit_mode: false,
            options_display: {display: 'none'},
            edit_button_display: {display: ''}
        });
    }
    handleCategoryClick = () => {
        const {
            edit_mode, 
            category_display, 
            category_image_display
        } = this.state;
        if (edit_mode) {
            const display = (category_display.display === 'none') ? '' : 'none'; 
            const image_display = (category_image_display.display === 'none') ? '' : 'none'; 
            this.setState({
                category_display: {display: display},
                category_image_display: {display: image_display}});
        }
    }
    handleCategorySelect = (category) => {
        const post_data = {category: category};
        axios.post(url.RETRIEVE_CATEGORY_IMAGE, post_data)
            .then(response => {
                const new_image = response.data;
                this.setState({
                    cat_image_source: type.IMAGE_PREFIX + new_image, 
                    category_name: category 
                });
            })
            .catch(error => alert(error.message))    

        this.handleCategoryClick();
    }
    handleNameChange = (name) => {
        this.setState({name: name});
    }
    handleDescChange = (desc) => {
        this.setState({desc: desc});
    }
    handlePriceChange = (price) => {
        this.setState({price: price});
    }
    handleServingsChange = (servings) => {
        this.setState({servings: servings});
    }
    render() {
        const {
                edit_mode,
                edit_button_display,
                image_source,
                name,
                desc,
                price,
                servings,
                cat_image_source,
                category_display,
                category_image_display,
                options_display
            } = this.state;
        const categories = this.props.categories;
        const handleEditMode = this.handleEditMode;   
        const handleNameChange = this.handleNameChange;
        const handleDescChange = this.handleDescChange;
        const handlePriceChange = this.handlePriceChange;
        const handleServingsChange = this.handleServingsChange;
        const handleCategoryClick = this.handleCategoryClick;
        const handleCategorySelect = this.handleCategorySelect;
        const handleCancelClick = this.handleCancelClick;
        return (
            <MenuCardComponent
                edit_mode={edit_mode}
                edit_button_display={edit_button_display}
                image_source={image_source}
                name={name}
                desc={desc}
                price={price}
                servings={servings}
                cat_image_source={cat_image_source}  
                categories={categories}
                handleEditMode={handleEditMode}
                category_display={category_display}
                category_image_display={category_image_display}
                options_display={options_display}
                handleNameChange={handleNameChange}
                handleDescChange={handleDescChange}
                handlePriceChange={handlePriceChange}
                handleServingsChange={handleServingsChange}
                handleCategoryClick={handleCategoryClick}
                handleCategorySelect={handleCategorySelect}
                handleCancelClick={handleCancelClick}/>
        )
    }
}

export default MenuCardContainer;