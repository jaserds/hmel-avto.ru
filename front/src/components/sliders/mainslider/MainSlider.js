import React, { useEffect, Children, cloneElement } from "react";
import './main.css';


const MainSlider = ({children, offset, setPages, pages, isOpacity}) => {
    const PAGE_WIDTH = 876;

    

    useEffect(() => {
        setPages(
            Children.map(children, (child) => {
                return cloneElement(child, {
                    style: {
                        height: '100%',
                        minWidth: `${PAGE_WIDTH}px`,
                        maxWidth: `${PAGE_WIDTH}px`
                    },
                })
            })
        )
    }, [])


    return (
        <div className="main-slider__inner">
            
            <div className="window">
                <div className={isOpacity ? "all-pages-container animation-opacity" : "all-pages-container"} style={{transform: `translateX(${offset}px)`}}>{pages}</div>
            </div>
            
        </div>
        
    )
}

export default MainSlider;