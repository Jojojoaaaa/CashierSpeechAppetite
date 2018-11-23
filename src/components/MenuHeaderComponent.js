import React from 'react';

import add from '../assets/menu/icon-add.svg';
import filter from '../assets/menu/icon-filter.svg';
export default function MenuHeaderComponent(props) {
    const {
        handleFilterClick,
        filter_button_class
    }  = props; 
    return (
        <div className='menu-header-box'>
            <div id='text-heading'>Menu</div>
            <div className='header-search'>
            <div className='search-box'>
                <input 
                    id='input-box'
                    type='text'
                    placeholder='Enter menu name'/>
                <button id='btn-find'>FIND</button>
            </div>
            </div>
            <div className="header-button"><button id='btn-add'><div>Add New</div><img src={add}></img></button>
            <button 
                className={filter_button_class}                
                onClick={() => handleFilterClick()}><img src={filter}></img>FILTERS</button></div>
        </div>
    );
}