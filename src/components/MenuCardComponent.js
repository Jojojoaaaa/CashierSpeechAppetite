import React from 'react';

export default function MenuCardComponent(props) {
    const {
        edit_mode,
        image_source,
        name,
        desc,
        price,
        servings,
        cat_image_source
    } = props;
    return (
        <div className='menu-card'>
            <img id='menu-profile-image' src={image_source}></img>
            <input 
                type='text'
                defaultValue={name}
                disabled={!edit_mode}/>
            <input 
                type='text'
                defaultValue={desc}
                disabled={!edit_mode}/>
            <br/>
            Php <input 
                type='number'
                value={price}
                disabled={!edit_mode}/>
            <input 
                type='number'
                value={servings}
                disabled={!edit_mode}/> Servings 
            <br/>
            <img id='category-image' src={cat_image_source}></img>
        </div>
    );
}