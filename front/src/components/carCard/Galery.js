import React, { useEffect, useState } from 'react';
import './gallery.css'
import closeImg from "./close.svg"


const Galery = (props) => {

  const [images, setImages] = useState('');

  const handleMouseEnter = (event) => {
    const src = event.target.getAttribute('src');
    setImages(src)
  };

  const handleCloseFullGallery = () => {
    props.isActive(false)
  }

  const hendleOnClick = () => {
    props.isActive(true)
    props.gallery(<div>
                    <img src={images} alt="" className="fullscreen-gallery__background" />
                    <button className="fullscreen-gallery__close-btn" onClick={handleCloseFullGallery}><img src={closeImg} alt="" /></button>
                    <div className="container">
                        <div className="fullscreen-gallery__inner">
                            <div className="fullscreen-image-letf-container">

                            </div>
                            <div className="fullscreen-images-container">
                              {
                                props.imagesData.map((imageData, index) => {
                                  const urlImage = imageData.url + imageData.fileName
                                  return (
                                  <div className="fullscreen__image-box" key={index}>
                                    <img src={urlImage} alt={`Изображение автомобиля № ${index}`} className="fullscreen__image" />
                                  </div>
                                  )
                                })
                              }
                            </div>
                        </div>
                    </div>
                  </div>)
        
  }
  
  useEffect(() => {
    if (props.imagesData.length !== 0){
      const imageUrl = props.imagesData[0].url + props.imagesData[0].fileName
      setImages(imageUrl)
    }
  }, [props.imagesData])
 
  return (
    <div className="product-card__gallery"> 
        <div className="product-card__image-container">
          <div className="product-card__item-container">
            <div className="product-card__item-data">
              <span style={{backgroundImage: `url(${images})`}} className="product-card__image-cover"></span>
              <img src={images} alt="" className="product-card__image" onClick={hendleOnClick}/>
            </div>
          </div>
        </div>
        <div className="product-card__gallery-botom-box">
            {
              props.imagesData.map((imageData, index) => {
                const urlImage = imageData.url + imageData.fileName
                return (
                  <div className="product-card__gallery-image-box" key={index}>
                    <img src={urlImage} alt={`Изображение автомобиля № ${index}`} className="product-card__gallery-image" onMouseEnter={handleMouseEnter}/>
                  </div>
                )
              })
            }
        </div>

      </div>
  )

} 

export default Galery;