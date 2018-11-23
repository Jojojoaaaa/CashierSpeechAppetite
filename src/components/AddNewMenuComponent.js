import React from 'react';
import ImageUploader from 'react-images-upload';

export default function AddNewMenuComponent(props) {
    const {
        categories,
        handleCancelAdd,
        handleImageClick,
        handleCategoryClick,
        handleCategorySelect,
        handleInputChange,
        image_source,
        image_edit_mode,
        category_edit_mode,
        cat_image_source,
        name,
        desc,
        price,
        servings
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
            <div className={'image-section'}>
                {!image_edit_mode
                    ?
                    <img  
                    id={'menu-profile-image'}
                    className={'class-mo-mae'}
                    // alt=''
                    onClick={()=>handleImageClick()}
                    src={image_source}></img> 
                    :
                    <ImageUploader
                        className={'class-mo-mae'}
                        buttonClassName={'image-picker-button'}
                        withIcon={false}
                        withLabel={false}
                        buttonText='Choose Image'
                        singleImage={true}
                        withPreview={false}
                        // onChange={(pictures) => handlePictureChange(pictures[pictures.length-1])}
                        imgExtension={['.jpg', '.png']}
                        maxFileSize={5242880}
                    />
                }
            </div>
            <input
                className='menu-input'
                type='text'
                placeholder='Enter Menu Name'
                value={name}
                onChange={(e)=> handleInputChange('name', e.target.value)}
                />
            <textarea 
                className='menu-input-desc'
                type='text'
                placeholder='Enter Menu Description'
                rows="3"
                cols="37"
                value={desc}
                onChange={(e) => handleInputChange('desc',e.target.value)}
                />
            <br/>
            <input
                className='menu-input'
                type='number'
                placeholder='Enter Price'
                value={price}
                onChange={(e) => handleInputChange('price',e.target.value)}
                />
            <input 
                className='menu-input'
                type='number'
                placeholder='Enter Servings'
                value={servings}
                onChange={(e) => handleInputChange('servings',e.target.value)}
                /> 
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
            <button
                className={'class-mo-mae '}
                onClick={()=>handleCancelAdd()}
                >Cancel</button>
            <button
                className={'class-mo-mae '}
                // onClick={() => handleSaveClick()}
                >Save</button>
        </div>
    );
}