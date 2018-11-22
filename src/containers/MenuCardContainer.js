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
        category_edit_mode: false,
        category_name: '',
        image_edit_mode: false
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
       });
    }
    handleCancelClick = () => {
        this.retrieveMenuProfile();
        this.setState({
            edit_mode: false,
            category_edit_mode: false,
            image_edit_mode:false
        });
    }
    handleCategoryClick = () => {
        const {
            edit_mode, 
        } = this.state;
        if (edit_mode) {
            this.setState({
                category_edit_mode: true,
            });
        }
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
    handleSaveClick = () => {
        const {
            name,
            desc,
            price,
            servings,
            category_name
        } = this.state
        let {image_source} = this.state;
        const image = image_source.split(',')[1];

        const id = this.id;
        const post_data = {
            id: id,
            image: image,
            name: name,
            desc: desc,
            price: price,
            servings: servings,
            category_name: category_name
        };
 
        axios.post(url.UPDATE_MENU_PROFILE, post_data)
            .then(response => {
                alert(response.data);
            })
            .catch(error => {
                alert(error.message);
            })
        this.setState({
            edit_mode: false
        }); 
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
    handlePictureChange = (picture) => {
        this.getBase64(picture).then(base64 => {
           this.setState({
               image_source: base64,
               image_edit_mode: false
           });
          });
    }
    handleImageClick = () => {
        const {edit_mode} =this.state;
        if (edit_mode) {
            this.setState({
                image_edit_mode: true,
            });
        }
    }
    getBase64 = (file) => {
        return new Promise((resolve,reject) => {
           const reader = new FileReader();
           reader.onload = () => resolve(reader.result);
           reader.onerror = error => reject(error);
           reader.readAsDataURL(file);
        });
    }
    render() {
        const {
                edit_mode,
                image_source,
                name,
                desc,
                price,
                servings,
                cat_image_source,
                category_edit_mode,
                image_edit_mode
            } = this.state;
        const categories = this.props.categories;
        const handleEditMode = this.handleEditMode;   
        const handleNameChange = this.handleNameChange;
        const handleDescChange = this.handleDescChange;
        const handlePriceChange = this.handlePriceChange;
        const handleServingsChange = this.handleServingsChange;
        const handlePictureChange = this.handlePictureChange;
        const handleCategoryClick = this.handleCategoryClick;
        const handleCategorySelect = this.handleCategorySelect;
        const handleCancelClick = this.handleCancelClick;
        const handleImageClick = this.handleImageClick;
        const handleSaveClick = this.handleSaveClick;


        const edit_button_class = (edit_mode) ? 'hide' : '';
        const options_class = (edit_mode) ? '' : 'hide';
        const category_class = (category_edit_mode) ? 'hide' : '';
        const category_options_class = (category_edit_mode) ? '' : 'hide';
        const image_class = (image_edit_mode) ? 'hide' : '';
        const image_picker_class = (image_edit_mode) ? '' : 'hide';
        return (
            <MenuCardComponent
                edit_mode={edit_mode}
                edit_button_class={edit_button_class}
                options_class={options_class}
                image_class={image_class}
                image_picker_class={image_picker_class}
                image_source={image_source}
                name={name}
                desc={desc}
                price={price}
                servings={servings}
                cat_image_source={cat_image_source}  
                categories={categories}
                handleEditMode={handleEditMode}
                category_class={category_class}
                category_options_class={category_options_class}
                handleNameChange={handleNameChange}
                handleDescChange={handleDescChange}
                handlePriceChange={handlePriceChange}
                handleServingsChange={handleServingsChange}
                handleCategoryClick={handleCategoryClick}
                handleCategorySelect={handleCategorySelect}
                handleCancelClick={handleCancelClick}
                handlePictureChange={handlePictureChange}
                handleImageClick={handleImageClick}
                handleSaveClick={handleSaveClick}/>
        )
    }
}

export default MenuCardContainer;