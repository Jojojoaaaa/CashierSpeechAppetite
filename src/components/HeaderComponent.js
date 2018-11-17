import React from 'react';
import '../styles/HeaderStyles.css';

export default function HeaderComponent(props) {
    const {handleLogout} = props;
    return (
       <div className="header-container">
           <div>Logo</div>
           <div>
                Admin Icon 
               <div onClick={() => handleLogout()}>(Logout)</div>
            </div>
        
       </div>
    );
}