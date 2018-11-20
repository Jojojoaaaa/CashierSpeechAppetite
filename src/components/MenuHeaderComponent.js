import React from 'react';

export default function MenuHeaderComponent(props) {
    const {
        handleFilterClick,
        filter_button_class
    }  = props; 
    return (
        <div>
        Menu
        <input 
            type='text'
            placeholder='Enter Value'/>
        <button>FIND</button>
        <button>Add New</button>
        <button 
            className={'class-mo-mae '+filter_button_class}                
            onClick={() => handleFilterClick()}>FILTERS</button>
    </div>
    );
}