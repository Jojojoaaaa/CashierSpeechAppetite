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
        categories,
        sort_by
    } = props;
    
    const categories_check = 
        categories 
        ?
            categories.map(c => 
                (
                    <div key={c} >
                    <label className="container">{c}
                    <input type="checkbox" onClick={(e) => handleCategoryClick(c)}/>
                    <span className="checkmark"></span>
                    </label>
                    </div>
                )
            )
        :
            null;
        const az_class = (sort_by==='name') ? 'button-sort selected' : 'button-sort';
        const price_class = (sort_by==='price') ? 'button-sort selected' : 'button-sort';
        const servings_class = (sort_by==='servings') ? 'button-sort selected' : 'button-sort';
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
                            className={az_class}
                            id='button-sort-name'
                            onClick={() => handleMenuSortName()}>A-Z</button>
                        <button
                            className={price_class}
                            id='button-sort-price'
                            onClick={() => handleMenuSortPrice()}>Price</button>
                        <button
                            className={servings_class}
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