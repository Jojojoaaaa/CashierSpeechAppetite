import React from 'react';

import add from '../assets/menu/icon-add.svg';
export default function AccountHeaderComponent(props) {
    const {
        handleSearchQueryChange,
        handleAddNewAccount
    } = props;
    return (
        <div className='order-header-box'>
        <div id='text-heading'>Accounts</div>
        <div className='header-search'>
        <div className='search-box'>
            <input 
                id='input-box'
                type='text'
                placeholder='Enter keyword'
                onChange={(e) => handleSearchQueryChange(e.target.value)}/>
        </div>
        </div>
        <div className="header-button">
        <button
            onClick={()=> handleAddNewAccount()} id='btn-add'><div>Add New</div><img src={add}></img></button>
        </div>
    </div>
    );
}