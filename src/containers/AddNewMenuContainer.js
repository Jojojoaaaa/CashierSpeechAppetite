import React, {Component}from 'react';
import AddNewMenuComponent from '../components/AddNewMenuComponent';

import axios from '../axios';
import * as url from '../constants/urls';
import * as type from '../constants/type';

import add_placeholder from '../assets/menu/add-placeholder.svg';
import cat_placeholder from '../assets/menu/cat-placeholder.svg';
class AddNewMenuContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            image_source: add_placeholder ,
            cat_image_source: cat_placeholder,
            name: "",
            desc: "",
            servings: 0,
            price: 0,
            category_edit_mode: false,
            category_name: '',
            image_edit_mode: false
        }
    }

    handleImageClick = () => {
        this.setState({
            image_edit_mode: true,
        });
    }
    handleInputChange = (state, value) => {
        this.setState({[state]: value});
    }
    handleCategoryClick = () => {
        this.setState({category_edit_mode: true});
    }
    handleCategorySelect = (category) => {
        const post_data = {category: category};
        axios.post(url.RETRIEVE_CATEGORY_IMAGE, post_data)
            .then(response => {
                const new_image = response.data;
                this.setState({
                    cat_image_source: type.IMAGE_PREFIX + new_image, 
                    category_edit_mode: false,
                    category_name: category, 
                });
            })
            .catch(error => alert(error.message))    
    }
    render() {
    const {
        image_source,
        cat_image_source,
        name,
        desc,
        servings,
        price,
        category_edit_mode,
        category_name,
        image_edit_mode,
    } = this.state;
    const categories = this.props.categories;
    const handleCancelAdd = this.props.handleCancelAdd;

    const handleImageClick = this.handleImageClick;
    const handleCategoryClick = this.handleCategoryClick;
    const handleInputChange = this.handleInputChange;
    const handleCategorySelect = this.handleCategorySelect;
       return (
        <AddNewMenuComponent 
            categories={categories}
            handleCancelAdd={handleCancelAdd}
            image_source={image_source}
            cat_image_source={cat_image_source}
            name={name}
            desc={desc}
            servings={servings}
            price={price}
            category_edit_mode={category_edit_mode}
            category_name={category_name}
            image_edit_mode={image_edit_mode}
            handleImageClick={handleImageClick}
            handleCategoryClick={handleCategoryClick}
            handleCategorySelect={handleCategorySelect}
            handleInputChange={handleInputChange}/>
       )
    }
}

export default AddNewMenuContainer;