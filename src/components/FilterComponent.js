import React from 'react';

import filter from '../assets/menu/icon-filter.svg';
import close from '../assets/menu/icon-close.svg';
export default function FilterComponent(props) {
    const {
        handleFilterClick,
        handleCategoryClick,
        handleMenuSortName,
        handleMenuSortPrice,
        handleMenuSortServings,
        handleApplyFiltersClick,
        categories
    } = props;
    
    const categories_check = 
        categories 
        ?
            categories.map(c => 
                (
                    <div key={c} >
                    <label class="container">{c}
                    <input type="checkbox" onClick={(e) => handleCategoryClick(c)}/>
                    <span class="checkmark"></span>
                    </label>
                    </div>
                )
            )
        :
            null;
    return (
        <div className='filter-box'>
            <div className="filter-content">
                <div className="filter-nav">
                    <div id='text-filter'><img src={filter} id='icon-filter'></img>FILTERS</div>
                    <div>
                    <button 
                    id='button-close'               
                    onClick={() => handleFilterClick()}><img src={close}></img></button></div>
                </div>
                <div className='filter-sort'>
                    <div className='text-heading'>Sort By</div>
                    <div className='sort-buttons'>
                        <button
                            className='button-sort'
                            id='button-sort-name'
                            onClick={() => handleMenuSortName()}>A-Z</button>
                        <button
                            className='button-sort'
                            id='button-sort-price'
                            onClick={() => handleMenuSortPrice()}>Price</button>
                        <button
                            className='button-sort'
                            id='button-sort-servings'
                            onClick={() => handleMenuSortServings()}>Servings</button>
                    </div>
                </div>
                <div className='filter-category'>
                    <div className='text-heading'>Filter by Category</div>
                        <div>
                            {categories_check}
                        </div>
                </div>
            </div>
            <div className='filter-button'>
            <button 
            id='button-filter'
            onClick={() => handleApplyFiltersClick()}>APPLY FILTERS</button></div>
        </div>
    );
}