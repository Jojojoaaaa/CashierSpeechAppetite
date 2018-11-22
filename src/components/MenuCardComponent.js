import React from 'react';
import ImageUploader from 'react-images-upload';

export default function MenuCardComponent(props) {
    const {
        edit_mode,
        edit_button_class,
        image_class,
        image_picker_class,
        options_class,
        image_source,
        name,
        desc,
        price,
        servings,
        cat_image_source,
        categories,
        handleEditMode,
        category_class,
        category_options_class,
        handleNameChange,
        handleDescChange,
        handlePriceChange,
        handleServingsChange,
        handleCategoryClick,
        handleCategorySelect,
        handleCancelClick,
        handlePictureChange,
        handleImageClick,
        handleSaveClick
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
            <button 
                className={'class-mo-mae '+edit_button_class}
                onClick={()=>handleEditMode()}>EDIT</button>
            <div className={'image-section'}>
                <ImageUploader
                    className={'class-mo-mae '+image_picker_class}
                    buttonClassName={'image-picker-button'}
                    withIcon={false}
                    withLabel={false}
                    buttonText='Choose Image'
                    singleImage={true}
                    withPreview={false}
                    onChange={(pictures) => handlePictureChange(pictures[pictures.length-1])}
                    imgExtension={['.jpg', '.png']}
                    maxFileSize={5242880}/>
                <img  
                    id={'menu-profile-image'}
                    className={'class-mo-mae '+image_class}
                    onClick={()=>handleImageClick()}
                    src={image_source}></img>
            </div>
            <input
                className='menu-input'
                type='text'
                value={name}
                disabled={!edit_mode}
                onChange={(e) => handleNameChange(e.target.value)}/>
            <textarea 
                className='menu-input-desc'
                type='text'
                value={desc}
                rows="3"
                cols="37"
                disabled={!edit_mode}
                onChange={(e) => handleDescChange(e.target.value)}/>
            <br/>
            Php <input
                className='menu-input'
                type='number'
                value={price}
                disabled={!edit_mode}
                onChange={(e) => handlePriceChange(e.target.value)}/>
            <input 
                className='menu-input'
                type='number'
                value={servings}
                disabled={!edit_mode}
                onChange={(e) => handleServingsChange(e.target.value)}/> Servings 
            <br/>
            <div className='menu-category'> 
                <img 
                    id='category-image' 
                    className={'class-mo-mae '+category_class}
                    src={cat_image_source}
                    onClick={() => handleCategoryClick()}/>
                <div className={'dropdown-content '+category_options_class}>
                {categories_dropdown}
                </div>
            </div>
            <button
                className={'class-mo-mae '+options_class}
                onClick={()=>handleCancelClick()}>Cancel</button>
            <button
                className={'class-mo-mae '+options_class}
                onClick={() => handleSaveClick()}>Save</button>
        </div>
    );
}