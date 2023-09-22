import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../../index"
import { LOGIN_ROUTE, MAIN_ROUTE } from '../../utils/consts'
import { NavLink } from 'react-router-dom';
import { observer } from "mobx-react-lite"
import ProfileMenu from './ProfileMenu';
import ProfileMenuMin from './ProfileMenuMin';
import logo5 from "./logo5.svg";
import userImg from "./user1.png";


const HeaderTop = observer(() => {
  const { user } = useContext(Context)
  const [menuProfile, setMenuProfile] = useState(false);
  const [menuProfileMin, setMenuProfileMin] = useState(false);

  const toggleMenu = () => {
    setMenuProfile(!menuProfile);
    setMenuProfileMin(!menuProfileMin);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.profile-menu__wrapper')) {
        setMenuProfile(false);
      }
      
      if (!event.target.closest('.profile-menu__wrapper-min')) {
        setMenuProfileMin(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <header className="header-card">
      <div className="container">
        <div className="header-card__wrapper">
          <div className="header__left-box">
            <NavLink to={MAIN_ROUTE}>
              <img src={logo5} alt="" className="header-card__logo" />
            </NavLink>
          </div>
          {
            user.isAuth ?
              <div className="header__right-box">
                <div className='user-box__profile-inner' onClick={() => toggleMenu()}>
                  <img src={userImg} alt="Фотография профиля" className="user-box__avatar" />
                  <div className="user-box__user-name">{user.userName}</div>
                  {menuProfile && <ProfileMenu />}
                  {menuProfileMin && <ProfileMenuMin />}
                </div>
                <NavLink to={MAIN_ROUTE} className="header-top__btn-exit" onClick={() => { user.logout() }}>Выйти</NavLink>
              </div>
              :
              <div className="header__right-box">
                <NavLink to={LOGIN_ROUTE} className="header__btn-registration">Войти/Зарегистрироваться</NavLink>
              </div>
          }
        </div>
      </div>
    </header>
  )
})

export default HeaderTop