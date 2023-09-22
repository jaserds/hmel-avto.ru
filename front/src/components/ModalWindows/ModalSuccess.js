import React from "react";
import "./modal.css"

const ModalSucces = ({active, setActive, textSucces}) => {
    
    return (
        <div className={active ? "modal-succes active" : "modal-succes"} onClick={() => {setActive(false)}}>
            <div className="modal-succes__content" onClick={(e) => {e.stopPropagation()}}>
                <p className="modal-succes__text">{textSucces}</p>
            </div>
        </div>
    )
}

export default ModalSucces;