import React from "react";
import HeaderTop from "../components/header/HeaderTop";
import Footer from '../components/footer/Footer'


const UserAgreement = () => {

    return(
        <div className="site-rules__container">
            <HeaderTop />
            <div className="container">
            <h1 className="policy__title">Пользовательское Соглашение</h1>

            <p className="policy__text">Настоящее Пользовательское Соглашение (Далее Соглашение) регулирует отношения между ООО "ХМЕЛАВТО" (далее Хмел-Авто или Администрация) 
            с одной стороны и пользователем сайта с другой. Сайт Хмел-Авто не является средством массовой информации.</p>

            <p className="policy__text">Используя сайт, Вы соглашаетесь с условиями данного соглашения.
                Если Вы не согласны с условиями данного соглашения, не используйте сайт Хмел-Авто!</p>

                <h2 className="policy__subtitle">Предмет соглашения</h2>

                <p className="policy__text">Администрация предоставляет пользователю право на размещение на сайте следующей информации:</p>
                    <ul className="policy__list">
                    <li className="policy__list-item">Текстовой информации</li>
                    <li className="policy__list-item">Фотоматериалов</li>
                    <li className="policy__list-item">Ссылок на материалы, размещенные на других сайтах</li>
                </ul>

                <h2 className="policy__subtitle">Права и обязанности сторон</h2>

                <p className="policy__text">Пользователь имеет право:</p>
                <ul className="policy__list">
                    <li className="policy__list-item">осуществлять поиск информации на сайте</li>
                    <li className="policy__list-item">получать информацию на сайте</li>
                    <li className="policy__list-item">создавать информацию для сайта</li>
                    <li className="policy__list-item">копировать информацию на другие сайты с разрешения Администрации сайта</li>
                    <li className="policy__list-item">копировать информацию на другие сайты с разрешения правообладателя</li>
                    <li className="policy__list-item">использовать информацию сайта в личных некоммерческих целях</li>
                    <li className="policy__list-item">использовать информацию сайта в коммерческих целях с разрешения Администрации</li>
                    <li className="policy__list-item">использовать информацию сайта в коммерческих целях с разрешения правообладателей</li>
                </ul>

                <h2 className="policy__subtitle">Администрация имеет право:</h2>
                <ul className="policy__list">
                    <li className="policy__list-item">по своему усмотрению и необходимости создавать, изменять, отменять правила</li>
                    <li className="policy__list-item">ограничивать доступ к любой информации на сайте</li>
                    <li className="policy__list-item">создавать, изменять, удалять информацию</li>
                    <li className="policy__list-item">удалять учетные записи</li>
                    <li className="policy__list-item">отказывать в регистрации без объяснения причин</li>
                </ul>

                <h2 className="policy__subtitle">Пользователь обязуется:</h2>
                <ul className="policy__list">
                    <li className="policy__list-item">обеспечить достоверность предоставляемой информации</li>
                    <li className="policy__list-item">не распространять информацию, которая направлена на пропаганду войны, разжигание национальной, расовой или религиозной ненависти и вражды, а также иной информации, за распространение которой предусмотрена уголовная или административная ответственность</li>
                    <li className="policy__list-item">не нарушать работоспособность сайта</li>
                    <li className="policy__list-item">не создавать несколько учётных записей на Сайте, если фактически они принадлежат одному и тому же лицу</li>
                    <li className="policy__list-item">не совершать действия, направленные на введение других Пользователей в заблуждение</li>
                    <li className="policy__list-item">не передавать в пользование свою учетную запись и/или логин и пароль своей учетной записи третьим лицам</li>
                    <li className="policy__list-item">не регистрировать учетную запись от имени или вместо другого лица за исключением случаев, предусмотренных законодательством РФ</li>
                    <li className="policy__list-item">не размещать материалы рекламного, эротического, порнографического или оскорбительного характера, а также иную информацию, размещение которой запрещено или противоречит нормам действующего законодательства РФ</li>
                    <li className="policy__list-item">не использовать скрипты (программы) для автоматизированного сбора информации и/или взаимодействия с Сайтом и его Сервисами</li>
                </ul>

                <h2 className="policy__subtitle">Администрация обязуется:</h2>
                <ul className="policy__list">
                    <li className="policy__list-item">поддерживать работоспособность сайта за исключением случаев, когда это невозможно по независящим от Администрации причинам.</li>
                    <li className="policy__list-item">предоставить всю доступную информацию о Пользователе уполномоченным на то органам государственной власти в случаях, установленных законом</li>
                </ul>

                <h2 className="policy__subtitle">Ответственность сторон</h2>
                <ul className="policy__list">
                    <li className="policy__list-item">пользователь лично несет полную ответственность за распространяемую им информацию</li>
                    <li className="policy__list-item">администрация не несет никакой ответственности за достоверность информации, скопированной из других источников</li>
                    <li className="policy__list-item">администрация не несёт ответственность за несовпадение ожидаемых Пользователем и реально полученных услуг</li>
                    <li className="policy__list-item">администрация не несет никакой ответственности за услуги, предоставляемые третьими лицами</li>
                    <li className="policy__list-item">в случае возникновения форс-мажорной ситуации (боевые действия, чрезвычайное положение, стихийное бедствие и т. д.) Администрация не 
                    гарантирует сохранность информации, размещённой Пользователем, а также бесперебойную работу информационного ресурса</li>
                </ul>

                <h2 className="policy__subtitle">Условия действия Соглашения</h2>

                <p className="policy__text">Данное Соглашение вступает в силу при любом использовании данного сайта.
                Соглашение перестает действовать при появлении его новой версии.
                Администрация оставляет за собой право в одностороннем порядке изменять данное соглашение по своему усмотрению.
                Администрация не оповещает пользователей об изменении в Соглашении.</p>
            </div>
            <Footer />
        </div>
    )
}

export default UserAgreement;