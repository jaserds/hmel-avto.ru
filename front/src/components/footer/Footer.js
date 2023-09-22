import React from "react";
import { NavLink } from "react-router-dom";
import { MAIN_ROUTE, POLICY_CON_ROUTE, RULES_CON_ROUTE, USER_AGREEMENT_CON_ROUTE } from "../../utils/consts";
import logoFooter from "./logo88.svg";
import logoTg from "./logotelegram.png";
import logoVk from "./logovk.png";
import logoYouTube from "./logoyoutube.png";


const Footer = () => {
  return (
    <footer className="footer">
        <div className="container">
            <div className="footer__container">
            <div className="footer__logo-block">
              <NavLink to={MAIN_ROUTE}>
                <img className="footer__logo" src={logoFooter} alt="Логотип"/>
              </NavLink>
                <p className="footer__logo-text">© 2022 – 2022 Продажа автомобилей – объявления, авторынки, автосалоны</p>
            </div>
            <div className="footer__menu-block">
                <ul className="footer__menu">
                    <li className="footer__menu-item"><NavLink to={RULES_CON_ROUTE}className="footer__menu-link">Парвила сайта</NavLink></li>
                    <li className="footer__menu-item"><a className="footer__menu-link" href="#">Наши контакты</a></li>
                    <li className="footer__menu-item"><NavLink to={POLICY_CON_ROUTE} className="footer__menu-link">Политика конфиденциальности</NavLink></li>
                    <li className="footer__menu-item"><a className="footer__menu-link" href="#">Размещение для диллеров</a></li>
                    <li className="footer__menu-item"><NavLink to={USER_AGREEMENT_CON_ROUTE} className="footer__menu-link">Пользовательское соглашение</NavLink></li>
                </ul>
                <ul className="footer__menu">
                    <li className="footer__menu-item"><a className="footer__menu-link" href="#">Разместить рекламу</a></li>
                    <li className="footer__menu-item"><a className="footer__menu-link" href="#">О проекте</a></li>
                    <li className="footer__menu-item"><a className="footer__menu-link" href="#">Помощь</a></li>
                </ul>
            </div>
            <div className="footer__social-media-block">
                <a className="footer__social-media-link" href="#">
                    <img className="footer__social-media-logo" src={logoTg} alt="Логотип соц. сети"/>
                </a>
                <a className="footer__social-media-link" href="#">
                    <img className="footer__social-media-logo" src={logoVk} alt="Логотип соц. сети"/>
                </a>
                <a className="footer__social-media-link" href="#">
                    <img className="footer__social-media-logo" src={logoYouTube} alt="Логотип соц. сети"/>
                </a>
            </div>
            </div>
        </div>
      </footer>
  )
}


export default Footer