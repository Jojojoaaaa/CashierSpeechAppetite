import React from 'react';

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
            onClick={()=> handleAddNewAccount()}>Add New</button>
        </div>
    </div>
    );
}