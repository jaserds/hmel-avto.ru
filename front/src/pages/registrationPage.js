import React, {useState} from "react";
import HeaderTop from "../components/header/HeaderTop"
import RegistrationUser from "../components/registration/RegistrationUser";
import RegistrationManager from "../components/registration/RegistrationManager";
import Footer from "../components/footer/Footer";


const RegistrationPage = () => {

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
                            <p className="registration__user-title">Регистрация пользователя</p>
                        </div>
                        <div onClick={handleToggleComponentB} className={currentComponent === "B" ? 'registration__diller-box registration__select-diller-box' : 'registration__diller-box'}>
                            <p className="registration__diller-title">Регистрация менеджера</p>
                        </div>
                    </div> 
                    { currentComponent === 'A' ? <RegistrationUser /> : <RegistrationManager />}
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default RegistrationPage;