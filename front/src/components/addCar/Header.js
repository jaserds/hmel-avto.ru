import React from 'react';
import { NavLink } from 'react-router-dom';
import logoHeader from "./logo55.svg"

const Header = () => {
    return (
        <header className="addcar-header">
            <div className="container">
                <div className="addcar-header__wprapper">
                <NavLink to="/">
                    <img src={logoHeader} alt="" className="addcar-header__logo" />
                </NavLink>
                    <h1 className="addcar-header__title">Добавить автомобиль на сайт</h1>
                    <NavLink to="/" className="addcar-header__close-page">Закрыть</NavLink>
                </div>
            </div>
        </header>
    )
}


export default Header