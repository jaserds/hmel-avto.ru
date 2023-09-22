import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../index";
import { MAIN_ROUTE } from "../../utils/consts";


const RegistrationManager = () => {

    const [inn, setInn] = useState('');
    const [organizationName, setOrganizationName] = useState('');
    const [jobTitle, setJobTitle] = useState('');

    const [email, setEmail] = useState('')
    const [emailIsChange, setEmailIsChange] = useState(false)
    const [emailError, setEmailError] = useState('* Емайл не может быть пустым')

    const [password, setPassword] = useState('')
    const [passwordIsChange, setPasswordIsChange] = useState(false)
    const [passwordError, setPasswordError] = useState('* Пароль не может быть пустым')

    const [fio, setfio] = useState('')
    const [fioIsChange, setfioIsChange] = useState(false)
    const [fioError, setfioError] = useState('* ФИО не может быть пустым')

    const [phone, setphone] = useState('')
    const [phoneIsChange, setphoneIsChange] = useState(false)
    const [phoneError, setphoneError] = useState('* Телефон не может быть пустым')

    const [formValid, setFormValid] = useState(false)
    const {user} = useContext(Context);

    const navigate = useNavigate();

    useEffect(() => {
        if (emailError || passwordError|| phoneError|| fioError){
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError, phoneError, fioError])


    const clickHandler = () => {
        user.registrationManager(fio, phone, email, password, inn, organizationName, jobTitle, "NoActiveManager").then(data => {
            navigate(MAIN_ROUTE)
        })
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(e.target.value).toLowerCase())){
            setEmailError('* Некорректный email');
        }
        else {
            setEmailError('');
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,16}$/;
        if (!e.target.value) {
            setPasswordError('* Пароль не может быть пустым')
            return
        }

        if (!passwordRegex.test(String(e.target.value))) {
            setPasswordError('* Пароль должен быть не меньше 5 и не больше 16 символов и должен содержать заглавную букву.')
        } else {
            setPasswordError('')
        }
    }

    const fioHandler = (e) => {
        setfio(e.target.value) 
        if (e.target.value){
            setfioError('')
        } else {
            setfioError('* ФИО не может быть пустым')
        }
    }

    const phoneHandler = (e) => {
        setphone(e.target.value) 
        if (e.target.value.length < 11){
            setphoneError('* Некорректный номер телефона')
            return
        }

        if (e.target.value){
            setphoneError('')
        } else {
            setphoneError('* Телефон не может быть пустым')
        }
    }

    const changeOf = (e) => {
        switch (e.target.name) {
        case 'email':
            setEmailIsChange(true)
            break
        case 'password':
            setPasswordIsChange(true)
            break
        case 'fio':
            setfioIsChange(true)
            break
        case 'phone':
            setphoneIsChange(true)
            break
        }
    }

    return (
        <div className="registration__center">
            <div className="registration__center-left">
        <div className="registration-center-left__input-box">
            <p className="registration-center-legt__text">ФИО сотрудника</p>
            {(fioIsChange && fioError) && <div className="error_input" style={{color: '#DC4C3E'}}>{fioError}</div>}
            <input onBlur={e => changeOf(e)} onChange={e => fioHandler(e)} value={fio} id="inputFIO" className="registration-center-left__input" type="text" placeholder="Иванов Иван Иванович" />
        </div>
        <div className="registration-center-left__input-box">
            <p className="registration-center-legt__text">ИНН организации</p>
            <input id="inputINN" className="registration-center-left__input" value={inn} onChange={(e) => {setInn(e.target.value)}} type="text" placeholder="Введите ИНН 10 цифр" />
        </div>
        <div className="registration-center-left__input-box">
            <p className="registration-center-legt__text">Наименование организации</p>
            <input id="inputNameCompany" className="registration-center-left__input" value={organizationName} onChange={(e) => {setOrganizationName(e.target.value)}} type="text" placeholder="ООО 'ХмелАвто'" />
        </div>
        <div className="registration-center-left__input-box">
            <p className="registration-center-legt__text">Должность</p>
            <input  id="inputJobTitle" className="registration-center-left__input" value={jobTitle} onChange={(e) => {setJobTitle(e.target.value)}} type="text" placeholder="Введите свою должность" />
        </div>
        <div className="registration-center-left__input-box">
            <p className="registration-center-legt__text">Телефон</p>
            {(phoneIsChange && phoneError) && <div className="error_input" style={{color: '#DC4C3E'}}>{phoneError}</div>}
            <input onBlur={e => changeOf(e)} onChange={e => phoneHandler(e)} value={phone} id="inputPhone" className="registration-center-left__input" type="text" placeholder="Введите ваш номер телефона" />
        </div>
        <div className="registration-center-left__input-box">
            <p className="registration-center-legt__text">Почта</p>
            {(emailIsChange && emailError) && <div className="error_input" style={{color: '#DC4C3E'}}>{emailError}</div>}
            <input onBlur={e => changeOf(e)} onChange={e => emailHandler(e)} value={email} id="inputMail" className="registration-center-left__input" type="email" placeholder="Введите свою почту" />
        </div>
        <div className="registration-center-left__input-box">
            <p className="registration-center-legt__text">Пароль</p>
            {(passwordIsChange && passwordError) && <div className="error_input" style={{color: '#DC4C3E'}}>{passwordError}</div>}
            <input onBlur={e => changeOf(e)} onChange={e => passwordHandler(e)} value={password} id="inputPassword" className="registration-center-left__input" type="password" placeholder="Введите пароль" />
        </div>
        <div className="registration-center-left__message-text"></div>
        <button className="registration-center-left__btn egistration-center-left__btn_margin" disabled={!formValid} onClick={clickHandler}>Зарегистрироваться</button>
    </div>
    {/* <div className="registration__center-rigth">
        <div className="registration-center-rigth__photo-box">
            <p className="registration-center-rigth__photo-text">Загрузите аватар</p>
            <div className="registration-center-rigth__photo-wrapper">
                <div className="registration-center-rigth__photo"></div>
            </div>
        </div>
    </div> */}
        </div>  
    )
}

export default RegistrationManager