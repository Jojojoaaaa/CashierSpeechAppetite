import React from 'react';
import ImageUploader from 'react-images-upload';

import edit from '../assets/menu/icon-edit.svg';
export default function MenuCardComponent(props) {
    const {
        edit_mode,
        image_edit_mode,
        category_edit_mode,
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
        <div className='menu-card'>
            <div className='card-edit'>
                {edit_mode
                    ?
                    null
                    :
                    <img src={edit}
                    className={'button-edit'}
                    onClick={()=>handleEditMode()}></img>
                }
            </div>
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
                            id={'menu-profile-image'}
                            className={'class-mo-mae '}
                            onClick={()=>handleImageClick()}
                            src={image_source}></img>
                }
            </div>
            <input
                className='menu-input'
                type='text'
                value={name}
                disabled={!edit_mode}
                onChange={(e) => handleInputChange('name',e.target.value)}/>
            <textarea 
                className='menu-input-desc'
                type='text'
                value={desc}
                rows="3"
                cols="37"
                disabled={!edit_mode}
                onChange={(e) => handleInputChange('desc',e.target.value)}/>
            <br/>
            Php <input
                className='menu-input'
                type='number'
                value={price}
                disabled={!edit_mode}
                onChange={(e) => handleInputChange('price',e.target.value)}/>
            <input 
                className='menu-input'
                type='number'
                value={servings}
                disabled={!edit_mode}
                onChange={(e) => handleInputChange('servings',e.target.value)}/> Servings 
            <br/>
            <div className='menu-category'> 
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
            {edit_mode
                ?
                <div>
                    <button
                        className={'class-mo-mae'}
                        onClick={()=>handleCancelClick()}>Cancel</button>
                    <button
                        className={'class-mo-mae'}
                        onClick={() => handleSaveClick()}>Save</button>
                </div>
                :
                null
            }
        </div>
    );
}