
import React from "react";


const PrevPhoto = (props) => {

    function dragStartHandler(e, carPhoto){
        console.log("drag", carPhoto)
    }

    function dragEndHandler(e){

    }

    function dragOverHandler(e){
        e.preventDefault()
    }

    function dropHandler(e, carPhoto){
        e.preventDefaukt()
        console.log("drop", carPhoto);
    }

    return (
        <div 
            onDragStart={(e) => dragStartHandler(e, props.carPhoto)}
            onDragLeave={(e) => dragEndHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, props.carPhoto)}
            draggable={true} 
            className="photo-car__prev-img-box"
            onClick={props.onClick}
            data-indexphoto={props.index}>

            <img className="photo-car__prev-img" src={props.src} alt=""/>
        </div>
    )
}

export default PrevPhoto;