import React, {Component}from 'react';
import AddNewMenuComponent from '../components/AddNewMenuComponent';
import ModalComponent from '../components/ModalComponent';

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
            image_edit_mode: false,
            show_modal: false,
            modal_message: '',
            modal_type: ''
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
    handleHideModal = () => {
        this.setState({show_modal: false}, () => this.props.handleCancelAdd());
        this.props.retrieveAllMenu()
    }
    handleSave =() => {
        const {
            name,
            desc,
            servings,
            price,
            category_name
        } = this.state;
        let {image_source} = this.state;
        //image is a base64 encoded image 
        const image = image_source.split(',')[1];
        const post_data = {
            image: image,
            name: name,
            description:desc,
            servings:servings,
            price: price,
            category_name };
        axios.post(url.INSERT_MENU, post_data)
            .then(response =>{
                if (response.data === type.SUCCESS) {
                    this.setState({
                        show_modal: true,
                        modal_message: 'Menu has been added',
                        modal_type: type.SUCCESS
                    })
                }
                else {
                    this.setState({
                        show_modal: true,
                        modal_message: 'Something went wrong...',
                        modal_type: type.ERROR
                    })
                }
               
            })
            .catch(error => {
                this.setState({
                show_modal: true,
                modal_message: type.PRE_ERROR_MESSAGE + error.message + type.POST_ERROR_MESSAGE,
                modal_type: type.ERROR
                })
                this.props.handleCancelAdd();

            })
        }
    handlePictureChange = (picture) => {
        this.setState({picture: picture});
        this.getBase64(picture).then(base64 => {
           this.setState({
               image_source: base64,
               image_edit_mode: false
           });
          });
        // this.getBlob(picture).then(blob => {
        //    const b = new Blob ([new Uint8Array(blob)], {type : "image/jpeg"});
        //     this.setState({
        //         image_blob: b
        //     })
        // });
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
            modal_message,
            modal_type,
            show_modal,
            image_source,
            cat_image_source,
            name,
            desc,
            servings, 
            price,
            category_edit_mode,
            category_name,
            image_edit_mode
        } = this.state;
    const categories = this.props.categories;
    const handleCancelAdd = this.props.handleCancelAdd;

    const handleImageClick = this.handleImageClick;
    const handleCategoryClick = this.handleCategoryClick;
    const handleInputChange = this.handleInputChange;
    const handleCategorySelect = this.handleCategorySelect;
    const handlePictureChange = this.handlePictureChange;
    const handleHideModal = this.handleHideModal;
    const handleSave = this.handleSave;

    const modal = (
        show_modal
            ?
            <ModalComponent
                modal_message={modal_message}
                modal_type={modal_type}
                handleClick={handleHideModal}/>
            :
            null
        );
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
            handleInputChange={handleInputChange}
            handlePictureChange={handlePictureChange}
            handleSave={handleSave}>
            {modal}
        </AddNewMenuComponent>
       )
    }
}

export default AddNewMenuContainer;