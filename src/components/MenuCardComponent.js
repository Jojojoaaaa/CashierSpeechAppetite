import React from 'react';

export default function MenuCardComponent(props) {
    const {
        edit_mode,
        edit_button_display,
        image_source,
        name,
        desc,
        price,
        servings,
        cat_image_source,
        categories,
        handleEditMode,
        category_display,
        category_image_display,
        options_display,
        handleNameChange,
        handleDescChange,
        handlePriceChange,
        handleServingsChange,
        handleCategoryClick,
        handleCategorySelect,
        handleCancelClick,
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
                onClick={()=>handleEditMode()}
                style={edit_button_display}>EDIT</button>
            <img id='menu-profile-image' src={image_source}></img>
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
                    src={cat_image_source}
                    onClick={() => handleCategoryClick()}
                    style={category_image_display}/>
                <div className='dropdown-content' style={category_display}>
                {categories_dropdown}
                </div>
            </div>
            <button
                style={options_display}
                onClick={()=>handleCancelClick()}>Cancel</button>
            <button
                style={options_display}>Save</button>
        </div>
    );
}