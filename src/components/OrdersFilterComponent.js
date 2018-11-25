import React from 'react';


import filter from '../assets/menu/icon-filter.svg';
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
    
    const today_class = (filter===type.TODAY_FILTER) ? 'button-sort selected' : 'button-sort';
    const week_class = (filter===type.WEEK_FILTER) ? 'button-sort selected' : 'button-sort';
    const month_class = (filter===type.MONTH_FILTER) ? 'button-sort selected' : 'button-sort';
    const year_class = (filter===type.YEAR_FILTER) ? 'button-sort selected' : 'button-sort';

    return (
       <div className='filter-box'>
            <div className="filter-content">
                <div className="filter-nav">
                    <div id='text-filter'><img src={filter} id='icon-filter'></img>FILTERS</div>
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
                            id='button-sort-date'
                            onClick={() => handleSort(type.DATE_SORT)}
                            >Date</button>
                        <button
                            className={qty_class}
                            id='button-sort-quantity'
                            onClick={() => handleSort(type.QTY_SORT)}
                            >Quantity</button>
                        <button
                            id='button-sort-name'
                            className={az_class}
                            onClick={() => handleSort(type.NAME_SORT)}                            // onClick={() => handleMenuSortName()}
                            >A-Z</button>
                    </div>
                </div>
                <div className='filter-category'>
                    <div className='text-heading'>Filter by Date</div>
                    <div className='filter-buttons'>
                        <button
                            className={today_class}
                            id='button-sort-today'
                            onClick={() => handleFilter(type.TODAY_FILTER)}
                            >Today</button>
                        <button
                            className={week_class}
                            id='button-sort-week'
                            onClick={() => handleFilter(type.WEEK_FILTER)}
                            >This Week</button>
                        <button
                            id='button-sort-month'
                            className={month_class}
                            onClick={() => handleFilter(type.MONTH_FILTER)}
                            >This Month</button>
                        <button
                            className={year_class}
                            id='button-sort-year'
                            onClick={() => handleFilter(type.YEAR_FILTER)}
                            >This Year</button>                          
                    </div>
                </div>
            </div>
        </div>
    );
}