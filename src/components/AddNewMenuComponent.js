import React from 'react';
import ImageUploader from 'react-images-upload';

export default function AddNewMenuComponent(props) {
    const {
        categories,
        handleCancelAdd,
        handleImageClick,
        handleSave,
        handleCategoryClick,
        handleCategorySelect,
        handleInputChange,
        handlePictureChange,
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
        <div className='add-menu-card'>
            <div className={'image-section'}>
                {!image_edit_mode
                    ?
                    <img
                    className={'menu-profile-image'}
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
                        onChange={(pictures) => handlePictureChange(pictures[pictures.length-1])}
                        imgExtension={['.jpg', '.png']}
                        maxFileSize={5242880}
                    />
                }
            </div>
            <div className='card-content-box'>
                <div className='menu-name'>
                <textarea
                    className='menu-input'
                    id='input-name'
                    type='text'
                    placeholder='Enter Menu Name'
                    value={name}
                    onChange={(e)=> handleInputChange('name', e.target.value)}
                    />
                </div>
                <div className='menu-desc'>
                <textarea 
                    className='menu-input-desc'
                    type='text'
                    placeholder='Enter Menu Description'
                    rows="3"
                    cols="37"
                    value={desc}
                    onChange={(e) => handleInputChange('desc',e.target.value)}
                    />
                </div>
                <div className='menu-price'>
                    <div id='price-text'>Php</div>
                        <div><input
                            className='menu-input'
                            id='input-price'
                            type='number'
                            placeholder='Enter Price'
                            value={price}
                            onChange={(e) => handleInputChange('price',e.target.value)}
                            />
                    </div>
                </div>
                {props.children}
                <div className='menu-servings'>
                <div id='input-servings'>
                <input 
                    className='menu-input'
                    id='input-servings'
                    type='number'
                    placeholder='Enter Servings'
                    value={servings}
                    onChange={(e) => handleInputChange('servings',e.target.value)}/>
                    </div> 
                <div id='servings-text'>Servings</div>
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
                        <div>
                            <button
                                className='button-menu'
                                id='button-stroke'
                                onClick={()=>handleCancelAdd()}
                                >Cancel</button>
                            <button
                                className='button-menu'
                                id='button-fill'
                                onClick={() => handleSave()}
                                >Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}