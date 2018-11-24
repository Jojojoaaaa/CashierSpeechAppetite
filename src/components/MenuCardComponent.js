import React from 'react';
import ImageUploader from 'react-images-upload';

import edit from '../assets/menu/icon-edit.svg';
export default function MenuCardComponent(props) {
    const {
        edit_mode,
        image_edit_mode,
        category_edit_mode,
        menu_card_class,
        image_source,
        name,
        desc,
        price,
        servings,
        cat_image_source,
        categories,
        handleInputChange,
        handleEditMode,
        handleCategoryClick,
        handleCategorySelect,
        handleCancelClick,
        handlePictureChange,
        handleImageClick,
        handleSaveClick,
    } = props;
    const categories_dropdown = 
        categories 
            ?  
                categories.map(c => 
                    (
                        <div 
                            key={c}
                            className='category-item'
                            onClick={() => handleCategorySelect(c)}>
                            <label>{c}</label><br/>
                        </div>
                    )
                )
            : 
                null;
    return (
        //main container
        <div className={'menu-card ' + menu_card_class}> 
            {/* main parts */}
            <div className="edit-flex">
                <div className='card-edit'>
                    {edit_mode
                        ?
                        null
                        :
                        <img src={edit}
                        className='button-edit'
                        onClick={()=>handleEditMode()}></img>
                    }
                </div>
            </div>
             {/* main parts */}
            <div className={'image-section'}>
                {image_edit_mode
                    ?
                        <ImageUploader
                            className={'class-mo-mae '}
                            buttonClassName={'image-picker-button'}
                            withIcon={false}
                            withLabel={false}
                            buttonText='Choose Image'
                            singleImage={true}
                            withPreview={false}
                            onChange={(pictures) => handlePictureChange(pictures[pictures.length-1])}
                            imgExtension={['.jpg', '.png']}
                            maxFileSize={5242880}/>
                    :
                        <img
                            alt=''
                            className={'menu-profile-image'}
                            onClick={()=>handleImageClick()}
                            src={image_source}></img>
                }
            </div>
             {/* main parts */}
            <div className='card-content-box'>
                <div className='menu-name'>            
                    <textarea
                    className='menu-input'
                    id='input-name'
                    type='text'
                    value={name}
                    disabled={!edit_mode}
                    onChange={(e) => handleInputChange('name',e.target.value)}/>
                </div>
                <div className='menu-desc'>
                    <textarea 
                    className='menu-input-desc'
                    type='text'
                    value={desc}
                    rows="3"
                    cols="37"
                    disabled={!edit_mode}
                    onChange={(e) => handleInputChange('desc',e.target.value)}/>
                </div>
                <div className='menu-price'>
                    <div id='price-text'>Php</div>
                        <div><input
                            className='menu-input'
                            id='input-price'
                            type='number'
                            value={(price)}
                            disabled={!edit_mode}
                            onChange={(e) => handleInputChange('price',e.target.value)}/>
                        </div>
                </div>
                <div className='menu-servings'>
                <div id='input-servings'>
                <input 
                    className='menu-input'
                    id='input-servings'
                    type='number'
                    value={servings}
                    disabled={!edit_mode}
                    onChange={(e) => handleInputChange('servings',e.target.value)}/>
                    </div>
                    <div id='servings-text'> Servings</div>
                </div>
                <div className='menu-category'> 
                    <div className='category-flex'>
                        {category_edit_mode
                            ?
                                <div className={'dropdown-content'}>
                                    {categories_dropdown}
                                </div>
                            :
                                <img 
                                    id='category-image' 
                                    className={'class-mo-mae'}
                                    src={cat_image_source}
                                    onClick={() => handleCategoryClick()}/>
                        }
                    </div>
                    <div className='menu-button'>
                    {edit_mode
                        ?
                        <div>
                            <button
                                className='button-menu'
                                id='button-stroke'
                                onClick={()=>handleCancelClick()}>Cancel</button>
                            <button
                                className='button-menu'
                                id='button-fill'
                                onClick={() => handleSaveClick()}>Save</button>
                        </div>
                        :
                        null
                    }
                    </div>
            </div>
            </div>
        </div>
    );
}