import React, { useContext } from "react"
import { NavLink } from 'react-router-dom';
import { MAIN_ROUTE, ADDCAR_ROUTE, ADMIN_ROUTE } from "../../utils/consts";
import { Context } from "../../index"
import {observer} from "mobx-react-lite"



const ProfileMenu = observer(() => {
    const {user} = useContext(Context)
    return (
        <div className="profile-menu__wrapper">
            {
                user.userRole  === "Manager" ?
                    <ul className="profile-menu__list">
                        <li className="profile-menu__item"><NavLink to={ADDCAR_ROUTE} className={'profile-menu__item-text'}>Добавить авто</NavLink></li>
                        <li className="profile-menu__item"><NavLink to={ADMIN_ROUTE} className={'profile-menu__item-text'}>Профиль</NavLink></li>
                        <li className="profile-menu__item"><NavLink to={MAIN_ROUTE} className={'profile-menu__item-text'} onClick={() => { user.logout() }}>Выйти</NavLink></li>
                    </ul>
                :
                    <ul className="profile-menu__list">
                        <li className="profile-menu__item"><NavLink to={MAIN_ROUTE} className={'profile-menu__item-text'} onClick={() => { user.logout() }}>Выйти</NavLink></li>
                    </ul>
            }
        </div>
    )
})

export default ProfileMenu