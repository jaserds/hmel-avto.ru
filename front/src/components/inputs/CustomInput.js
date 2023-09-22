import React, { useState, useEffect, useRef } from 'react';
import '../../css/jinput.css'
import arrowImg from "./arrowInput.svg";
import clearImg from "./clearIcon.svg"
import InputServices from '../../services/InputServices';

const CustomInput = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenAddItem, setIsOpenAddItem] = useState(false)
    const [addInput, setAddInput] = useState('')
    const [addGenerationAge, setGenerationAge] = useState('')
    const [errorInput, setErrorInput] = useState('')
    const dropdownRef = useRef(null);
    const textPlus = "+";
    const data = [...props.data];

    const changeData = (data) => {
        const dataNew = data.map((item) => {
            return { id: Object.values(item)[0], value: Object.values(item)[1] };
        });
        return dataNew;
    }

    const fetchDataAllItems = async (method) => {
        const result = await method();
        return changeData(result.data);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                setErrorInput('');
                setIsOpenAddItem(false);
                setAddInput('');
            }
          };
      
          document.addEventListener('click', handleClickOutside);
      
          return () => {
            document.removeEventListener('click', handleClickOutside);
          };
    }, [])

    const selectedItem = (value, id) => {
        props.setValue(value);
        props.setId(id);
        setIsOpen(false);
    }

    const toggleDropdown = () => {
        if (props.isActive){        
            setIsOpen(true);

        }  
    };

    const openAddItem = () => {
        setIsOpenAddItem(!isOpenAddItem);
        console.log(data);
    }

    const dataRectur = (endAddItemId) => {
        if (addInput !== ''){
            data.push({id: endAddItemId, value: addInput})
            props.updateData(data)
            setAddInput('');
            setGenerationAge('');
            setErrorInput('');
        }
    }

    const addItemDataBase = async () => {       
        if (props.placeholder === 'Бренд'){
            const isElementInData = data.find((element) => element.value.toLowerCase() === addInput.toLowerCase());
            if (!isElementInData){
                await InputServices.addBrand(addInput).then((res) => {
                    dataRectur(res.data)
                })
            } else {
                setErrorInput('Такой бренд уже есть в списке')
            }
        }
        if (props.placeholder === 'Модель'){
            const isElementInData = data.find((element) => element.value.toLowerCase() === addInput.toLowerCase());
            if (!isElementInData){
                await InputServices.addModelByBrandId(addInput, props.stateIn.brand).then((res) => {
                    dataRectur(res.data)
                })
            } else {
                setErrorInput('Такая модель уже есть в списке')
            }
        }
        if (props.placeholder === 'Поколение' && addInput !== '' && addGenerationAge !== ''){
            const isElementInData = data.find((element) => element.value.toLowerCase() === addInput.toLowerCase());
            if (!isElementInData){
                await InputServices.addGenerationByModelId(addInput, addGenerationAge, props.stateIn.model).then((res) => {
                    dataRectur(res.data)
                });
            } else {
                setErrorInput('Такое поколение уже есть в списке')
            }
        }
        if (props.placeholder === 'Кузов'){
            const isElementInData = data.find((element) => element.value.toLowerCase() === addInput.toLowerCase());
            if(!isElementInData){
                if (props.stateIn.brand !== '' && props.stateIn.model !== ''){
                    let allBody = {};
                    allBody = await fetchDataAllItems(InputServices.getAllBody);
                    const findItem = allBody.find(item => item.value.toLowerCase() === addInput.toLowerCase());
                    
                    if (findItem){
                        await InputServices.addBodyByModel(props.stateIn.model, findItem.id).then((res) => {
                            dataRectur(res.data);
                        });
                    } else {
                        const NewBodyIdInDataBase = await InputServices.addBrandInDataBase(addInput);
                        await InputServices.addBodyByModel(props.stateIn.model, NewBodyIdInDataBase.data).then((res) => {
                            dataRectur(res.data);
                        });
                    }
                } else {
                    setErrorInput('Вы не ввели название кузова');
                }
            } else {
                setErrorInput('Такой кузов уже есть в списке');
            }
        }
        if (props.placeholder === 'Привод' && addInput !== ''){
            const isElementInData = data.find((element) => element.value.toLowerCase() === addInput.toLowerCase());
            if(!isElementInData){
                if (props.stateIn.brand !== '' && props.stateIn.model !== ''){
                    const allDriveUnits = await fetchDataAllItems(InputServices.getAllDriveUnit);
                    const findItem = allDriveUnits.find(item => item.value.toLowerCase() === addInput.toLocaleLowerCase());

                    if (findItem){
                        await InputServices.addDriveUnitByModel(props.stateIn.model, findItem.id).then((res) => {
                            dataRectur(res.data)
                        });
                    } else {
                        const NewDriveUnitIdInDataBase = await InputServices.addDriveUnitInDataBase(addInput);
                        await InputServices.addDriveUnitByModel(props.stateIn.model, NewDriveUnitIdInDataBase.data).then((res) => {
                            dataRectur(res.data)
                        });
                    }
                } else {
                    setErrorInput('Вы не ввели название привода');
                }
            } else {
                setErrorInput('Такой привод уже есть в списке');
            }
        }
        if (props.placeholder === 'Коробка' && addInput !== ''){
            const isElementInData = data.find((element) => element.value.toLowerCase() === addInput.toLowerCase());
            if(!isElementInData){
                if (props.stateIn.brand !== '' && props.stateIn.model !== ''){
                    const allTranssmissions = await fetchDataAllItems(InputServices.getAllTranssmissions);
                    const findItem = allTranssmissions.find(item => item.value.toLowerCase() === addInput.toLocaleLowerCase());

                    if (findItem){
                        await InputServices.addTranssmissionByModel(props.stateIn.model, findItem.id).then((res) => {
                            dataRectur(res.data)
                        });
                    } else {
                        const NewTranssmissionsIdInDataBase = await InputServices.addTranssmissionsInDataBase(addInput);
                        await InputServices.addTranssmissionByModel(props.stateIn.model, NewTranssmissionsIdInDataBase.data).then((res) => {
                            dataRectur(res.data)
                        });
                    }
                } else {
                    setErrorInput('Вы не ввели название трансмиссии');
                }
            } else {
                setErrorInput('Такой трансмиссии уже есть в списке');
            }
        }
        if (props.placeholder === 'Цвет' && addInput !== ''){
            const isElementInData = data.find((element) => element.value.toLowerCase() === addInput.toLowerCase());
            if (!isElementInData){
                await InputServices.addColorDatabase(addInput).then((res) => {
                    dataRectur(res.data)
                });
            } else {
                setErrorInput('Такой цвет уже есть в списке')
            }
        }
        if (props.placeholder === 'Город' && addInput !== ''){
            const isElementInData = data.find((element) => element.value.toLowerCase() === addInput.toLowerCase());
            if (!isElementInData){
                await InputServices.addCityDatabase(addInput).then((res) => {
                    dataRectur(res.data)
                });
            } else {
                setErrorInput('Такой город уже есть в списке')
            }
        }
    }
    return (
        <div className='jselect' ref={dropdownRef}>
            {props.isActive &&
                <div className="jselect__top">
                    <input 
                        className={props.className}  
                        type={props.type}
                        placeholder={props.placeholder}
                        value={props.value}
                        onClick={toggleDropdown}
                        onChange={(event) => {return  props.setValue(event.target.value)}}
                        readOnly
                    />
                    {!props.value ? 
                        <img className="jselect__arrow" src={arrowImg} alt='Стрелка управления' onClick={toggleDropdown}></img> :
                        <img className="jselect__arrow jselect__arrow_top" src={clearImg} alt='Стрелка управления' onClick={()=>{props.setValue(''); props.setId(null)}}></img>
                    }
                </div>
            }
            {!props.isActive &&
                <div className="jselect__top">
                    <input 
                        className={props.className}  
                        type={props.type}
                        placeholder={props.placeholder}
                        value={props.value}
                        onClick={toggleDropdown}
                        onChange={(event) => {return props.setValue(event.target.value)}}
                        disabled
                        readOnly
                    />
                    <img className="jselect__arrow" src={arrowImg} alt='Стрелка управления' onClick={toggleDropdown}></img>
                </div>
            }
           {isOpen &&
                <div className='jselect__bottom'>
                    <ul className="jselect__lsit">
                        {
                            data.map((item, index) => { return (
                                <li className='jselect__item' data-type='item' data-id={item.id} key={index} onClick={() => {selectedItem(item.value, item.id)}}>
                                    <span className="jselect__item-text" data-id={item.id} data-type="value">{item.value}</span>
                                </li>
                            )})
                        } 
                        { props.placeholder !== "Руль" && props.placeholder !== "Двигатель" && props.placeholder !== "Объем, л" && props.isAddCar &&
                            <li className='jselect__item jselect__add-item-btn' onClick={() => {openAddItem()}}>
                                <span className="jselect__item-text jselect__item-plus" data-type="value">{textPlus}</span>
                            </li>
                        }
                        { isOpenAddItem && props.placeholder === 'Поколение' ?
                            <div>
                                <div className='jselect__add-bottom-block jselect__add-bottom-block-tranlate-animation'>
                                    <div className='jselect__generation-inputs'>
                                        <input className={props.className + " jselect__add-item_input"} placeholder='Введите поколение' type='text' value={addInput} onChange={(event) => {return setAddInput(event.target.value)}}/>
                                        <input className={props.className + " jselect__add-item_input"} placeholder='Год поколения пример(2000 - 2023)' type='text' value={addGenerationAge} onChange={(event) => {return setGenerationAge(event.target.value)}}/>
                                    </div>
                                    <button className='jselect__add-button' onClick={() => {addItemDataBase()}}>Ок</button>
                                </div>
                                <span className='jselect__error-text'>{errorInput}</span>
                            </div>
                            : isOpenAddItem &&
                            <div>
                                <div className='jselect__add-bottom-block jselect__add-bottom-block-tranlate-animation'>
                                    <input className={props.className + " jselect__add-item_input"} type='text' value={addInput} onChange={(event) => {return setAddInput(event.target.value)}}/>
                                    <button className='jselect__add-button' onClick={() => {addItemDataBase()}}>Ок</button>
                                </div>
                                <span className='jselect__error-text'>{errorInput}</span>
                            </div>
                        }  
                    </ul>
                </div>
            }
        </div>
    );
}

export default CustomInput