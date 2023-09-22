import React, { useContext } from 'react';
import { Context } from "../../index"

const NavBar = () => {
  const { user } = useContext(Context)
  return (
    <header className="header-card">
      <div className="container">
        <div className="header-card__wrapper">
          <div className="header__left-box">
            <img src="images/svg/logo.svg" alt="" className="header-card__logo" />
          </div>
          {user.isAuth ?
            <div className="header__right-box">
              <div className="user-box">
                <img src="images/user1.png" alt="" className="user-box__avatar" />
                <div className="user-box__user-name">Сагин С.С.</div>
              </div>
              <a href="index.html" className="header__btn-registration">Выйти</a>
            </div>
            :
            <div className="header__right-box">
              <a href="index.html" className="header__btn-registration">Войти/Зарегистрироваться</a>
            </div>
          }
        </div>
      </div>
    </header>
  )
}

export default NavBar;