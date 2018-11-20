import React from 'react';

export default function FilterComponent(props) {
    const {
        handleFilterClick
    } = props;
    return (
       <div>
           <button
            onClick={() => handleFilterClick()}>FILTER</button>
       </div>
    );
}