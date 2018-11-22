import React from 'react';

export default function FilterComponent(props) {
    const {
        handleFilterClick,
        handleCategoryClick,
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
                <button>A-Z</button>
                <button>PRICE</button>
            </div>
            <div>Filter by Category</div>
            <div>
                {categories_check}
            </div>
       </div>
    );
}