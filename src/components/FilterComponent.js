import React from 'react';

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
                        <input 
                            type="checkbox"
                            onClick={(e) => handleCategoryClick(c)}/>{c}
                    </div>
                )
            )
        :
            null;
    return (
       <div>
           <button
            onClick={() => handleFilterClick()}>FILTER</button>
            <div>Sort By</div>
            <div>
                <button
                    onClick={() => handleMenuSortName()}>A-Z</button>
                <button
                    onClick={() => handleMenuSortPrice()}>Price</button>
                <button
                    onClick={() => handleMenuSortServings()}>Servings</button>
            </div>
            <div>Filter by Category</div>
            <div>
                {categories_check}
            </div>
            <button
                onClick={() => handleApplyFiltersClick()}>APPLY FILTERS</button>
       </div>
    );
}