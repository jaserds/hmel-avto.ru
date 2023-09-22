import React from "react";
import "./modal.css"

const ModalError = ({active, setActive, textError}) => {
    
    return (
        <div className={active ? "modal-error active" : "modal-error"} onClick={() => {setActive(false)}}>
            <div className="modal-error__content" onClick={(e) => {e.stopPropagation}}>
                <p className="modal-error__text">{textError}</p>
            </div>
        </div>
    )
}

export default ModalError;