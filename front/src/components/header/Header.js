import React, { useContext, useState, useEffect } from 'react';
import CustomInput from "../inputs/CustomInput"
import { Context } from "../../index"
import { NavLink, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, MAIN_ROUTE } from '../../utils/consts'
import { observer } from "mobx-react-lite"
import ProfileMenu from './ProfileMenu';
import ProfileMenuMin from './ProfileMenuMin';
import InputServices from '../../services/InputServices';
import SearchCarsServices from '../../services/SearchCarsServices';
import logo5 from "./logo5.svg";
import userImg from "./user1.png";
import lupa from "./lupa.svg";

const Header = observer(({setPage}) => {
  const volumeDataSet = [
    { id: 1, "value": "0.7" },
    { id: 2, "value": "0.8" },
    { id: 3, "value": "1.0" },
    { id: 4, "value": "1.1" },
    { id: 5, "value": "1.2" },
    { id: 6, "value": "1.3" },
    { id: 7, "value": "1.4" },
    { id: 8, "value": "1.5" },
    { id: 9, "value": "1.6" },
    { id: 10, "value": "1.7" },
    { id: 11, "value": "1.8" },
    { id: 12, "value": "1.9" },
    { id: 13, "value": "2.0" },
    { id: 14, "value": "2.2" },
    { id: 15, "value": "2.3" },
    { id: 16, "value": "2.4" },
    { id: 17, "value": "2.5" },
    { id: 18, "value": "2.7" },
    { id: 19, "value": "2.8" },
    { id: 20, "value": "3.0" },
    { id: 21, "value": "3.2" },
    { id: 22, "value": "3.3" },
    { id: 23, "value": "3.5" },
    { id: 25, "value": "3.6" },
    { id: 26, "value": "4.0" },
    { id: 27, "value": "4.2" },
    { id: 28, "value": "4.4" },
    { id: 29, "value": "4.5" },
    { id: 30, "value": "4.6" },
    { id: 31, "value": "4.7" },
    { id: 32, "value": "5.0" },
    { id: 33, "value": "5.5" },
    { id: 34, "value": "5.7" },
    { id: 35, "value": "6.0" }];

  const ageDataSet = [
    { id: 1, "value": "2023" },
    { id: 2, "value": "2022" },
    { id: 3, "value": "2021" },
    { id: 4, "value": "2020" },
    { id: 5, "value": "2019" },
    { id: 6, "value": "2018" },
    { id: 7, "value": "2017" },
    { id: 8, "value": "2016" },
    { id: 9, "value": "2015" },
    { id: 10, "value": "2014" },
    { id: 11, "value": "2013" },
    { id: 12, "value": "2012" },
    { id: 13, "value": "2011" },
    { id: 14, "value": "2010" },
    { id: 15, "value": "2009" },
    { id: 16, "value": "2008" },
    { id: 17, "value": "2007" },
    { id: 18, "value": "2006" },
    { id: 19, "value": "2005" },
    { id: 20, "value": "2004" },
    { id: 21, "value": "2003" },
    { id: 22, "value": "2002" },
    { id: 23, "value": "2001" },
    { id: 23, "value": "2000" },
    { id: 23, "value": "1999" },
    { id: 23, "value": "1998" },
  ];

  const { user, cars } = useContext(Context);

  const [menuProfile, setMenuProfile] = useState(false);
  const [menuProfileMin, setMenuProfileMin] = useState(false);
  const navigate = useNavigate();
  
  const [brandData, setBrandData] = useState([]);
  const [brandValue, setBrandValue] = useState('');
  const [brandId, setBrandId] = useState(null);

  const [modelData, setModelData] = useState([]);
  const [modelIsActive, setModelIsActive] = useState(false);
  const [modelValue, setModelValue] = useState('');
  const [modelId, setModelId] = useState(null);

  const [generationIsActive, setGenerationIsActive] = useState(false);
  const [generationData, setGenerationData] = useState([]);
  const [generationValue, setGenerationValue] = useState('');
  const [generationId, setGenerationId] = useState(null);

  const [bodyValue, setBodyValue] = useState('');
  const [bodyData, setBodyData] = useState([]);
  const [bodyId, setBodyId] = useState(null);

  const [transsmissionValue, setTranssmissionValue] = useState('');
  const [transsmissionData, setTranssmissionData] = useState([]);
  const [transsmissionId, setTranssmissionId] = useState(null);

  const [engineValue, setEngineValue] = useState('');
  const [engineData, setEngineData] = useState([]);
  const [engineId, setEngineId] = useState(null);

  const [driveUnitValue, setDriveUnitValue] = useState('');
  const [driveUnitData, setDriveUnitData] = useState([]);
  const [driveUnitId, setDriveUnitId] = useState(null);

  const [volume, setVolume] = useState('');
  const [volumeData, setVolumeData] = useState([]);
  const [volumeEnd, setVolumeEnd] = useState('');
  const [volumeEndData, setVolumeEndData] = useState([]);
  const [volumeEndId, setVolumeEndId] = useState(null);
  const [volumeId, setVolumeId] = useState(null);

  const [ageValue, setAgeValue] = useState('');
  const [ageData, setAgeData] = useState([]);
  const [ageEndValue, setAgeEndValue] = useState('');
  const [ageEndData, setAgeEndData] = useState([]);
  const [ageEndId, setAgeEndId] = useState(null);
  const [ageId, setAgeId] = useState(null);

  const [mileageValue, setmileageValue] = useState('');
  const [mileageEndValue, setmileageEndValue] = useState('');

  const [priceValue, setPriceValue] = useState('');
  const [priceEndValue, setPriceEndValue] = useState('');

  const [searchText, setSearchText] = useState('');

  const changeData = (data) => {
    const dataNew = data.map((item) => {
      return { id: Object.values(item)[0], value: Object.values(item)[1] };
    });
    return dataNew;
  }

  const fetchData = async (params, method, element) => {
    const result = await method(...params);
    element(changeData(result.data));
  }

  useEffect(() => {
    if (brandValue !== '') {
      fetchData([brandValue], InputServices.getModelsByBrand, setModelData);
      fetchData([brandValue], InputServices.getBodyByBrand, setBodyData);
      fetchData([brandValue], InputServices.getTranssmissionByBrand, setTranssmissionData);
      setModelIsActive(true);
      setGenerationIsActive(false);
      setModelValue('');
      setGenerationValue('');
      setBodyValue('');
      setTranssmissionValue('');
      setDriveUnitValue('');
    } else {
      setModelIsActive(false);
      setGenerationIsActive(false);
      setModelValue('');
      setGenerationValue('');
      setBodyValue('');
      setTranssmissionValue('');
      setDriveUnitValue('');
    }
  }, [brandValue])

  useEffect(() => {

    if (modelValue !== '') {
      fetchData([brandValue, modelValue], InputServices.getGenerationByModel, setGenerationData)
      fetchData([brandValue, modelValue], InputServices.getBodyByModel, setBodyData)
      fetchData([brandValue, modelValue], InputServices.getTranssmissionByModel, setTranssmissionData)
      fetchData([modelValue], InputServices.getDriveUnitModel, setDriveUnitData)
      setGenerationIsActive(true)
      setGenerationValue('')
      setBodyValue('')
      setTranssmissionValue('')
      setDriveUnitValue('')
    } else {
      setGenerationIsActive(false)
      setGenerationValue('')
      setBodyValue('')
      setTranssmissionValue('')
      setDriveUnitValue('')
    }
  }, [modelValue])


  useEffect(() => {
    fetchData([], InputServices.getAllBrands, setBrandData);
    fetchData([], InputServices.getAllEgineTypes, setEngineData);
    fetchData([], InputServices.getAllDriveUnit, setDriveUnitData);
    setVolumeData(volumeDataSet);
    setVolumeEndData(volumeDataSet);
    setAgeData(ageDataSet);
    setAgeEndData(ageDataSet);

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

  const toggleMenu = () => {
    setMenuProfile(!menuProfile);
    setMenuProfileMin(!menuProfileMin);
  };

  const seracHandler = async (searchText) => {
    const textQuery = searchText.trim()
    const result = await SearchCarsServices.getSearchCars(`searchtext=${textQuery}`, 5, 1);
    setPage(2)
    cars.setSearchCars(result.data);
    navigate(`/all/car/search?searchtext=${textQuery}`);
  }

  const findHandler = async (...args) => {
    const dataCars = {
      'BrandID': args[0],
      'ModelID': args[1],
      'generation': args[2],
      'BodyID': args[3],
      'TranssmissnionTypeID': args[4],
      'EnginTypeID': args[5],
      'DriveUnitID': args[6],
      'VolumeEngine': args[7],
      'VolumeEngineEnd': args[8],
      'age': args[9],
      'ageEnd': args[10],
      'mileage': args[11],
      'mileageEnd': args[12],
      'price': args[13],
      'priceEnd': args[14]
    }

    let optionsQurey = [];

    setPage(2)

    for (let key in dataCars) {
      if (dataCars[key] !== null && dataCars[key] !== '') {
        optionsQurey.push(`${key}=${dataCars[key]}`);
      }
    }

    setBrandId(null)
    setModelId(null)
    setGenerationId(null)
    setBodyId(null)
    setTranssmissionId(null)
    setEngineId(null)
    setDriveUnitId(null)
    setVolume('')
    setVolumeEnd('')
    setAgeValue('')
    setAgeEndValue('')
    setmileageValue('')
    setmileageEndValue('')
    setPriceValue('')
    setPriceEndValue('')

    const result = await InputServices.getSearchCars(optionsQurey.join('&'));
    cars.setSearchCars(result.data);

    navigate(`/all/car/search?${optionsQurey.join('&')}`);
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
        <div className="header-content">
          <div className="header-top">
            <div className="header-top__inner-menu">
              <NavLink to={MAIN_ROUTE}>
                <img className="header-top__logo" src={logo5} alt="Логотип сайта" />
              </NavLink>
            </div>
            {
              user.isAuth ?
                <div className="user-box">
                  <div className='user-box__profile-inner' onClick={() => toggleMenu()}>
                    <img src={userImg} alt="Фотография профиля" className="user-box__avatar" />
                    <div className="user-box__user-name">{user.userName}</div>
                    {menuProfile && <ProfileMenu />}
                    {menuProfileMin && <ProfileMenuMin />}
                  </div>
                  <NavLink to={MAIN_ROUTE} className="header-top__btn-exit" onClick={() => { user.logout() }}>Выйти</NavLink>
                </div>
                :
                <NavLink to={LOGIN_ROUTE} className="header-top__btn">Войти/Зарегистрироваться</NavLink>

            }
          </div>
          
            <h1 className="header-content__title">
              Подберите проверенный автомобиль
            </h1>
            <h2 className="header-content__subtitle">
              История каждого автомобиля на нашем сайте
            </h2>
            <div className="header-search">
              <div className="header-search__inner-input">
                <img className="header-search__icon" alt="22" src={lupa} />
                <input id="serach-input" className="header-search__input" value={searchText} onChange={(e) => {setSearchText(e.target.value)}} type="search" placeholder="Найти объявление" />
              </div>
              <button className="header-search__btn-find" onClick={() => {seracHandler(searchText)}}>Найти</button>
            </div>

            <div className="header-content">
                <div className="header-options">
                    <div className="header-options__item-box">
                        <div className="header-options__item">
                        <CustomInput className="jselect__input" type="text" value={brandValue} placeholder="Бренд"
                          data={brandData} setId={setBrandId} isActive={true} setValue={setBrandValue} isAddCar={false}/>
                        </div>
                    </div>
                    <div className="header-options__item-box">
                        <div className="header-options__item">
                        <CustomInput className="jselect__input" type="text" value={modelValue} placeholder="Модель"
                  data={modelData} setId={setModelId} isActive={modelIsActive} setValue={setModelValue} isAddCar={false}/>
                        </div>
                    </div>
                    <div className="header-options__item-box">
                        <div className="header-options__item">
                        <CustomInput className="jselect__input" type="text" value={generationValue} placeholder="Поколение"
                  data={generationData} setId={setGenerationId} isActive={generationIsActive} setValue={setGenerationValue} isAddCar={false}/> 
                        </div>
                    </div>
                    <div className="header-options__double-box">
                        <div className="double-item">
                        <CustomInput className="jselect__input" type="text" value={bodyValue} placeholder="Кузов"
                    data={bodyData} setId={setBodyId} isActive={true} setValue={setBodyValue} isAddCar={false}/>
                        </div>
                        <div className="double-item">
                        <CustomInput className="jselect__input" type="text" value={transsmissionValue} placeholder="Коробка"
                    data={transsmissionData} setId={setTranssmissionId} isActive={true} setValue={setTranssmissionValue} isAddCar={false}/>
                        </div>
                    </div>
                    <div className="header-options__double-box">
                        <div className="double-item">
                        <CustomInput className="jselect__input" type="text" value={engineValue} placeholder="Двигатель"
                    data={engineData} setId={setEngineId} isActive={true} setValue={setEngineValue} isAddCar={false}/>
                        </div>
                        <div className="double-item">
                        <CustomInput className="jselect__input" type="text" value={driveUnitValue} placeholder="Привод"
                    data={driveUnitData} setId={setDriveUnitId} isActive={true} setValue={setDriveUnitValue} isAddCar={false}/>
                        </div>
                    </div>
                    <div className="header-options__stuck-box">
                        <div className="stuck-item stuck-item-l">
                        <CustomInput className="jselect__input" type="number" value={volume} placeholder="Объем от, л"
                    data={volumeData} setId={setVolumeId} isActive={true} setValue={setVolume} isAddCar={false}/>
                        </div>
                        <div className="stuck-item stuck-item-r">
                        <CustomInput className="jselect__input" type="number" value={volumeEnd} placeholder="До"
                    data={volumeEndData} setId={setVolumeEndId} isActive={true} setValue={setVolumeEnd} isAddCar={false}/>
                        </div>
                    </div>
                    <div className="header-options__stuck-box">
                        <div className="stuck-item stuck-item-l">
                        <CustomInput className="jselect__input" type="number" value={ageValue} placeholder="Год"
                    data={ageData} setId={setAgeId} isActive={true} setValue={setAgeValue} isAddCar={false}/>
                        </div>
                        <div className="stuck-item stuck-item-r">
                        <CustomInput className="jselect__input" type="number" value={ageEndValue} placeholder="До"
                    data={ageEndData} setId={setAgeEndId} isActive={true} setValue={setAgeEndValue} isAddCar={false}/>
                        </div>
                    </div>
                    <div className="header-options__stuck-box">
                        <div className="stuck-item stuck-item-l">
                        <input className="jselect__input" type="number" value={mileageValue} placeholder="Пробег от, км"
                    onChange={(element) => { setmileageValue(element.target.value)}}/>
                        </div>
                        <div className="stuck-item stuck-item-r">
                        <input className="jselect__input" type="number" value={mileageEndValue} placeholder="До"
                    onChange={(element) => { setmileageEndValue(element.target.value)}}/>
                        </div>
                    </div>
                    <div className="header-options__stuck-box">
                        <div className="stuck-item stuck-item-l">
                        <input className="jselect__input" type="number" value={priceValue} placeholder="Цена от, ₽"
                    onChange={(element) => { setPriceValue(element.target.value) }} />
                        </div>
                        <div className="stuck-item stuck-item-r">
                        <input className="jselect__input" type="number" value={priceEndValue} placeholder="До"
                    onChange={(element) => { setPriceEndValue(element.target.value) }}/>
                        </div>
                    </div>

                </div>
            </div>

            <div className="header-bottom">
            <button className="header-bottom__btn-show" onClick={() => {
              findHandler(brandId, modelId, generationId, bodyId, transsmissionId, engineId, driveUnitId, volume, volumeEnd,
                ageValue, ageEndValue, mileageValue, mileageEndValue, priceValue, priceEndValue)
            }}>
              Посмотреть варианты</button>
          </div>
          </div>
        </div>
      </div>
      <div className="header__transition"></div>
    </header>
  )
})

export default Header;