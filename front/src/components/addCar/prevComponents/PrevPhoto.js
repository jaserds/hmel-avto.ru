
import React from "react";


const PrevPhoto = (props) => {

    const handleDragStart = (e) => {
        e.dataTransfer.setData('text/plain', props.dataIndex.toString());
      };
    
      const handleDragOver = (e) => {
        e.preventDefault();
      };
    
      const handleDrop = (e) => {
        e.preventDefault();
        const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
        props.onDrop(draggedIndex, props.dataIndex);
      };

    return (
        <div 
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            draggable={true} 
            className="photo-car__prev-img-box"
            onClick={props.onClick}
            data-indexphoto={props.index}>

            <img className="photo-car__prev-img" src={props.src} alt=""/>
        </div>
    )
}

export default PrevPhoto;