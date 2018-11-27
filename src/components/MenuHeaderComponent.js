import React from 'react';

import add from '../assets/menu/icon-add.svg';
import filter from '../assets/menu/icon-filter.svg';
import category from '../assets/menu/icon-category.svg';
export default function MenuHeaderComponent(props) {
    const {
        add_menu,
        handleFilterClick,
        filter_visible, 
        handleSearchQueryChange,
        handleAddMenuClick
    }  = props; 
    return (
        <div className='menu-header-box'>
            <div id='text-heading'>Menu</div>
            <div className='header-search'>
            <div className='search-box'>
                <input 
                    id='input-box'
                    type='text'
                    placeholder='Enter menu name'
                    onChange={(e) => handleSearchQueryChange(e.target.value)}/>
            </div>
            </div>
            <div className="header-button">
            {!add_menu 
                ?
                <button id='btn-add' onClick={() => handleAddMenuClick()}><div>Add New</div><img src={add}></img></button>
                :
                null
            }
            {/* <button id='btn-cat'><img src={category}></img><div>CATEGORY</div></button> */}
            {!filter_visible
                ?
                (<button className='btn-filter' onClick={() => handleFilterClick()}><img src={filter}></img>FILTERS</button>)
                :
                null
            }
            </div>
        </div>
    );
}