import React from 'react';
import '../styles/ModalStyles.css';

import question from '../assets/modal/icon-question.svg';

export default function PromptModalComponent(props) {
    const {
       handleConfirm,
       handleDecline,
       modal_message
    } = props;

    return (
        <div id="myModal" className="modal">
            <div className="modal-prompt">
                <div className='modal-logo'>
                <img
                    src={question}
                    alt = ''/>
                </div>
                <div className='modal-box-content'>
                    <div className='modal-message'>{modal_message}
                    {props.children}</div>
                    <div className='modal-buttons'>
                        <button 
                            className="button-stroke"
                            onClick={()=>handleDecline()}>Cancel</button>
                        <button 
                            className="button-fill"
                            onClick={()=>handleConfirm()}>Confirm</button>
                    </div>
                </div>
            </div>
        </div>  
    );
}