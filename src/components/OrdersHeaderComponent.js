import React from 'react';

import filter from '../assets/menu/icon-filter.svg';
export default function OrdersHeaderComponent(props) {
    const {
        handleFilterClick,
        filter_visible,
        handleSearchQueryChange,
    } = props;
    return (
        <div className='order-header-box'>
        <div id='text-heading'>Orders</div>
        <div className='header-search'>
        <div className='search-box'>
            <input 
                id='input-box'
                type='text'
                placeholder='Enter order name'
                onChange={(e) => handleSearchQueryChange(e.target.value)}/>
        </div>
        </div>
        <div className="header-button">
       
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