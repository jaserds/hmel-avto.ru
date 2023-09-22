import React, {useState} from "react";
import HeaderTop from "../components/header/HeaderTop"
import LoginUser from "../components/login/LoginUser"
import LoginManager from "../components/login/LoginManager"
import Footer from "../components/footer/Footer";

const LoginPage = () => {
    const [currentComponent, setCurrentComponent] = useState('A')

    const handleToggleComponentA = () => {
        setCurrentComponent('A');
      };

      const handleToggleComponentB = () => {
        setCurrentComponent('B');
      };

    return (
    <div>
        <HeaderTop />
        <section className="section__registr">
            <div className="registration__box">
                <div className="registration__top">
                    <div onClick={handleToggleComponentA} className={currentComponent === "A" ? 'registration__user-box registration__select-user-box' : 'registration__user-box'}>
                        <p className="registration__user-title" onClick={handleToggleComponentA}>Авторизация пользователя</p>
                    </div>
                    <div onClick={handleToggleComponentB} className={currentComponent === "B" ? 'registration__diller-box registration__select-diller-box' : 'registration__diller-box'}>
                        <p className="registration__diller-title">Авторизация менеджера</p>
                    </div>
                </div>
                { currentComponent === 'A' ? <LoginUser /> : <LoginManager />}
            </div>
        </section>
        <Footer />
    </div>
    )
}


export default LoginPage;