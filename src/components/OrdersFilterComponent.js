import React from 'react';


import filters from '../assets/order/icon-filter.svg';
import close from '../assets/menu/icon-close.svg';

import * as type from '../constants/type';

export default function OrdersFilterComponent(props) {
    const {
        handleFilterClick,
        filter,
        sort_by,
        handleSort,
        handleFilter
    } = props;
    const az_class = (sort_by===type.NAME_SORT) ? 'button-sort selected' : 'button-sort';
    const date_class = (sort_by===type.DATE_SORT) ? 'button-sort selected' : 'button-sort';
    const qty_class = (sort_by===type.QTY_SORT) ? 'button-sort selected' : 'button-sort';
    
    const today_class = (filter===type.TODAY_FILTER) ? 'button-sort selected' : 'button-filter-sort';
    const month_class = (filter===type.MONTH_FILTER) ? 'button-sort selected' : 'button-filter-sort';
    const year_class = (filter===type.YEAR_FILTER) ? 'button-sort selected' : 'button-filter-sort';

    return (
       <div className='filter-box'>
            <div className="filter-content">
                <div className="filter-nav">
                    <div id='text-filter'><img src={filters} id='icon-filter'></img>FILTERS</div>
                    <div>
                    <button 
                    id='button-close'               
                    onClick={() => handleFilterClick()}
                    ><img src={close}></img></button></div>
                </div>
                <div className='filter-sort'>
                    <div className='text-heading'>Sort By</div>
                    <div className='sort-buttons'>
                        <button
                            className={date_class}
                            id='button-sort-left'
                            onClick={() => handleSort(type.DATE_SORT)}
                            >Date</button>
                        <button
                            className={qty_class}
                            id='button-sort-middle'
                            onClick={() => handleSort(type.QTY_SORT)}
                            >Quantity</button>
                        <button
                            id='button-sort-right'
                            className={az_class}
                            onClick={() => handleSort(type.NAME_SORT)}                            // onClick={() => handleMenuSortName()}
                            >A-Z</button>
                    </div>
                </div>
                <div className='filter-date'>
                    <div className='text-heading'>Filter by Date</div>
                    <div className='sort-buttons'>
                        <button
                            className={today_class}
                            id='button-sort-left'
                            onClick={() => handleFilter(type.TODAY_FILTER)}
                            >Today</button>
                        <button
                            id='button-sort-middle'
                            className={month_class}
                            onClick={() => handleFilter(type.MONTH_FILTER)}
                            >This Month</button>
                        <button
                            className={year_class}
                            id='button-sort-right'
                            onClick={() => handleFilter(type.YEAR_FILTER)}
                            >This Year</button>                          
                    </div>
                </div>
            </div>
        </div>
    );
}