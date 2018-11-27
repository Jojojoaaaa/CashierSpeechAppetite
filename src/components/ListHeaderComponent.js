import React from 'react';

export default function ListHeaderComponent(props) {
    const {
        column1,
        column2,
        column3,
        column4,
        column5,
        wild_class
    } = props
    return (
       <div className='account-lines-header'>
           <div className='account-short'>{column1}</div>
           <div className={wild_class}>{column2}</div>
           <div className='account-short'>{column3}</div>
           <div className='account-short'>{column4}</div>
           <div className='account-short'>{column5}</div>
       </div>
    );
}