import React from 'react';
import * as type from '../constants/type';

import check from '../assets/modal/icon-check.svg';
import alert from '../assets/modal/icon-exclamation.svg';
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
            modal_image = alert;
            break;
        case type.SUCCESS: 
            modal_image = check;
            break;
    };


    return (
        <div id="myModal" className="modal">
            <div className="modal-content">
            <div className='modal-logo'>
                <img
                    src= {modal_image}/>
            </div>
            <div className='modal-box-content'>
                <div className='modal-message'>{modal_message}</div>
                <div className='modal-buttons'>
                <button 
                    className="button-fill"
                    onClick={() => handleClick()}>Close</button>
                </div>
            </div>
            </div>
        </div>  
    );
}