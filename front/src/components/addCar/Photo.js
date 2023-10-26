import React, { useRef, useState } from "react";
import PrevPhoto from "./prevComponents/PrevPhoto"
import downloadIcon from "./downloadicon.png"


const Photo = (props) => {
    const [previewImages, setPreviewImages] = useState([]);
    const fileInputRef = useRef(null);
    const [nextId, setNextId] = useState(0);

    const handleClick = () => {
      fileInputRef.current.click();
    };
  
    const handleFileChange = (e) => {
        const files = e.target.files;
        const newPreviewImages = [];
    
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const reader = new FileReader();
    
          reader.onloadend = () => {
            const id = nextId + i;
            newPreviewImages.push({id, src: reader.result, filename: files[i].name});
    
            if (newPreviewImages.length === files.length) {
                setPreviewImages((prevImages) => [...prevImages, ...newPreviewImages]);
                props.setFilesImages((prevFilesImages) => [...prevFilesImages, ...Array.from(files)])
                setNextId(nextId + files.length)
            }
          };
          reader.readAsDataURL(file);
        }
      };

    const handleDelete = (id, name) => {
        const imageWrappers = document.querySelector(`[data-indexphoto="${id}"]`);
        imageWrappers.classList.add('remove-prev-car');
        props.setFilesImages((pevImages) => pevImages.filter((image) => image.name !== name))
        setTimeout(() => {
            setPreviewImages((prevImages) => prevImages.filter((image) => image.id !== id));
        }, 300)
    };

    const handleDrop = (draggedIndex, droppedIndex) => {
        const newImages = [...previewImages];
        const [draggedImage] = newImages.splice(draggedIndex, 1);
        newImages.splice(droppedIndex, 0, draggedImage);
        props.setFilesImages((pevFiles) => {
            const newFiles = [...pevFiles];
            const [draggedFiles] = newFiles.splice(draggedIndex, 1);
            newFiles.splice(droppedIndex, 0, draggedFiles);
            return newFiles;
        });
        setPreviewImages(newImages);
      };

    return (
        <section className="photo-car car__section">
        <div className="characteristic-car">
            <div className="characteristic-car__inner">
                <h2 className="add-car__title">Фотографии</h2>
                <div className="photo-download-iamge__box">
                    <input id="photoFile" type="file" accept="iamge/*,.png,.jpg,.jpeg,.web," ref={fileInputRef} multiple onChange={handleFileChange}/>
                    <img className="photo-download__image" src={downloadIcon} alt="Картинка загрузка изображений на сайт" onClick={handleClick} />
                    <p className="photo-download__text">Загрузите фотографии автомобиля</p>
                </div>
                <p className="photo-download__information-text">* Не более 24 фотографий (jpg, jpeg, png)</p>
                <div className="photo-car__prev-box">
                    {previewImages.map((image, index) => {
                        return <PrevPhoto
                        key={image.id}
                        src={image.src}
                        index={image.id}
                        dataIndex={index}
                        onClick={() => {handleDelete(image.id, image.filename)}}
                        onDrop={handleDrop}
                        />
                    })}
                </div>
            </div>
        </div>
    </section>
    )
}

export default Photo;