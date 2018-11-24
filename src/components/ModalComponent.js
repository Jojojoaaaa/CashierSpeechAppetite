import React from 'react';
import * as type from '../constants/type';

import '../styles/ModalStyles.css';
export default function ModalComponent(props) {
    const {
        modal_type,
        modal_message,
        handleClick
    } = props;
    let modal_image = '';
    switch(modal_type) {
        case type.ERROR: 
            modal_image = 'image nga error';
            break;
        case type.SUCCESS: 
            modal_image = 'immage nga scheck';
            break;
    };


    return (
        <div id="myModal" className="modal">
            <div className="modal-content">
                <img
                    alt = {modal_image}/>
                <p>{modal_message}</p>
                <span 
                    className="close"
                    onClick={() => handleClick()}>Close</span>
            </div>
        </div>  
    );
}