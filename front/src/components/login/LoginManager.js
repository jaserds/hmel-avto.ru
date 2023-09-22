import { useContext, useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {MAIN_ROUTE, REGISTRATION_ROUTE} from '../../utils/consts'
import { Context } from "../../index";
import { observer } from "mobx-react-lite";


const LoginManager = observer(() => {
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const [errorText, setErrorText] = useState('');
    const {user} = useContext(Context);
    const navigate = useNavigate();

    const clickLogin = () => {
        user.loginManager(email, password, "Manager").then(data => {
            if (data.message){
                setErrorText(data.message)
            }
            else{
                user.setIsUser(data.data.userData.userDto)
                navigate(MAIN_ROUTE)
            }
        })
        
        // return navigate(MAIN_ROUTE);
    }

    return (
        <div className="registration__center">
            <div className="registration__center-left">
                <div className="registration-center-left__input-box">
                    <p className="registration-center-legt__text">Почта</p>
                    <input id="inputMail" className="registration-center-left__input" onChange={e => setEmail(e.target.value)} value={email} name="email" type="email" placeholder="Введите почту" />
                </div>
                <div className="registration-center-left__input-box">
                    <p className="registration-center-legt__text">Пароль</p>
                    <input id="inputPassword" className="registration-center-left__input" onChange={e => setpassword(e.target.value)} value={password} name="password" type="password" placeholder="Введите пароль" />
                </div>
                <div className="registration-center-left__message-text">{errorText}</div>
                <div className="registration-center-left__btn-box">
                    <button onClick={clickLogin} className="login-center-left__btn">Войти</button>
                    <NavLink to={REGISTRATION_ROUTE}><button className="registration-center-left__btn">Зарегистрироваться</button></NavLink>
                </div>
                
            </div>
        </div>  
    )
})

export default LoginManager