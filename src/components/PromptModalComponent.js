import React from 'react';
import '../styles/ModalStyles.css';

export default function PromptModalComponent(props) {
    const {
       handleConfirm,
       handleDecline,
       modal_message
    } = props;

    return (
        <div id="myModal" className="modal">
            <div className="modal-content">
                <img
                    alt = 'question mark'/>
                <p>{modal_message}</p>
                {props.children}
                <span 
                    className="close"
                    onClick={()=>handleConfirm()}>Confirm</span>
                <span 
                    className="close"
                    onClick={()=>handleDecline()}>Cancel</span>
            </div>
        </div>  
    );
}