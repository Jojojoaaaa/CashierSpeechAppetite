import React, {Component}from 'react';
import MenuCardComponent from '../components/MenuCardComponent';
import ModalComponent from '../components/ModalComponent';
import PromptModalComponent from '../components/PromptModalComponent';

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
        image_edit_mode: false,
        image_blob: '',
        show_modal: false,
        modal_type: '',
        modal_message: '',
        show_prompt: false,
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
        .catch(error => {
            this.setState({
                show_modal: true,
                modal_type: type.ERROR,
                modal_message: type.PRE_ERROR_MESSAGE + error.message + type.POST_ERROR_MESSAGE
            })
        });
    }
    handleDeleteClick = () => {
        this.setState({
            show_prompt: true,
            modal_message: 'Are you sure you want to delete menu?'
        });
    }
    handleCancelDelete = () => {
        this.setState({show_prompt: false});
    }
    handleConfirmDelete = () => {
        this.setState({
            show_prompt: false
        })
        const id  =this.id;
        const post_data = {id:id};

        axios.post(url.DELETE_MENU, post_data)
            .then(response => {
                if (response.data === type.SUCCESS) {
                    this.setState({
                        show_modal: true,
                        modal_message: 'Menu has been deleted',
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
                this.props.refresh();
            })
            .catch(error => {
                this.setState({
                    show_modal: true,
                    modal_message: type.PRE_ERROR_MESSAGE + error.message + type.POST_ERROR_MESSAGE,
                    modal_type: type.ERROR
                })
            })
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
            .catch(error =>{
                this.setState({
                    show_modal: true,
                    modal_type: type.ERROR,
                    modal_message: type.PRE_ERROR_MESSAGE + error.message + type.POST_ERROR_MESSAGE
                });
            })    
    }
    handleSaveClick = () => {
        const {
            name,
            desc,
            price,
            servings,
            category_name,
            image_blob
        } = this.state
        let {image_source} = this.state;
        //image is a base64 encoded image 
        const image = image_source.split(',')[1];

        const id = this.id;
        let form_data = new FormData();
        form_data.set('id', id);
        form_data.set('name', name);
        form_data.set('desc', desc);
        form_data.set('price', price);
        form_data.set('servings', servings);
        form_data.set('category_name', category_name);
        form_data.append('image', image_blob);

        const post_data = {
            id: id,
            image: image,
            name: name,
            desc: desc,
            price: price,
            servings: servings,
            category_name: category_name
        };
        const header = {headers: {'Content-Type': 'multipart/form-data'}};
        axios.post(url.UPDATE_MENU_PROFILE, post_data)
            .then(response => {
                console.log(response.data)
                if (response.data === type.SUCCESS) {
                    this.setState({
                        show_modal: true,
                        modal_message: 'Menu has been updated',
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
            })
        this.setState({
            edit_mode: false
        }); 
    }
    handleHideModal =() => {
        this.setState({
            show_modal: false
        })
    }
    handleInputChange = (state, value) => {
        this.setState({[state]: value});
    }
    handlePictureChange = (picture) => {
        this.setState({picture: picture});
        this.getBase64(picture).then(base64 => {
           this.setState({
               image_source: base64,
               image_edit_mode: false
           });
          });
        this.getBlob(picture).then(blob => {
           const b = new Blob ([new Uint8Array(blob)], {type : "image/jpeg"});
            this.setState({
                image_blob: b
            })
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
    getBlob = (file) => {
        return new Promise((resolve,reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsArrayBuffer(file);
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
                image_edit_mode,
                show_modal,
                modal_message,
                modal_type,
                show_prompt
            } = this.state;
        const categories = this.props.categories;
        const handleEditMode = this.handleEditMode;   
        const handleInputChange = this.handleInputChange;
        const handlePictureChange = this.handlePictureChange;
        const handleCategoryClick = this.handleCategoryClick;
        const handleCategorySelect = this.handleCategorySelect;
        const handleCancelClick = this.handleCancelClick;
        const handleImageClick = this.handleImageClick;
        const handleSaveClick = this.handleSaveClick;
        const handleHideModal = this.handleHideModal;
        const handleDeleteClick = this.handleDeleteClick;
        const handleCancelDelete = this.handleCancelDelete;
        const handleConfirmDelete = this.handleConfirmDelete;

        const menu_card_class = (edit_mode) ? 'menu-edit-mode' : '';
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
        const prompt = (
            show_prompt
                ?
                <PromptModalComponent   
                    modal_message={modal_message}
                    handleConfirm={handleConfirmDelete}
                    handleDecline={handleCancelDelete}/>
                :
                null
        )
        return (
            <MenuCardComponent
                edit_mode={edit_mode}
                image_edit_mode={image_edit_mode}
                category_edit_mode={category_edit_mode}
                menu_card_class={menu_card_class}
                image_source={image_source}
                name={name}
                desc={desc}
                price={price}
                servings={servings}
                cat_image_source={cat_image_source}  
                categories={categories}
                handleEditMode={handleEditMode}
                handleInputChange={handleInputChange}
                handleCategoryClick={handleCategoryClick}
                handleCategorySelect={handleCategorySelect}
                handleCancelClick={handleCancelClick}
                handlePictureChange={handlePictureChange}
                handleImageClick={handleImageClick}
                handleSaveClick={handleSaveClick}
                handleDeleteClick={handleDeleteClick}>
                {modal}
                {prompt}
                </MenuCardComponent>
        )
    }
}

export default MenuCardContainer;