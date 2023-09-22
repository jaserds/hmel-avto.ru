import React, {useState} from "react";
import CustomInput from "../inputs/CustomInput";


const Pts = (props) => {
    
    const handleOptionChange = (event) => {
        props.dataSet.setSelectedOption(+event.target.value);
      };

    return (
        <section className="pts-car car__section">
            <div className="characteristic-car">
                <div className="characteristic-car__inner">
                    <h2 className="add-car__title">ПТС</h2>
                    <h3 className="pts__subtitle">Документ</h3>
                    <div className="pts-car__document">
                        <div className="form_radio_btn">
                            <input id="radio-1" type="radio" name="radio" value="1" checked={props.dataSet.selectedOption === 1} onChange={handleOptionChange}/>
                            <label htmlFor="radio-1">Оригинал</label>
                        </div>
                        
                        <div className="form_radio_btn">
                            <input id="radio-2" type="radio" name="radio" value="2" checked={props.dataSet.selectedOption === 2} onChange={handleOptionChange}/>
                            <label htmlFor="radio-2">Дубликат</label>
                        </div>
                        
                        <div className="form_radio_btn">
                            <input id="radio-3" type="radio" name="radio" value="3" checked={props.dataSet.selectedOption === 3} onChange={handleOptionChange}/>
                            <label htmlFor="radio-3">Нет</label>
                        </div>  
                    </div>
                    <h3 className="pts__subtitle">Состояние автомобиля</h3>
                    <div id="defectCarIsDefect">
                        <CustomInput className="jselect__input" type="text" value={props.dataSet.isDeffect} placeholder="Имеются/Нет дефектов" 
                                data={[{id: 1, "value": "Имеются дефекты"}, {id: 0, "value": "Нет дефектов"}]} setId={props.dataSet.setIsDeffectId} isActive={true} setValue={props.dataSet.setIsDeffect}/>
                    </div>
                    <p className="pts-car__text">Сколько владельцев у авто?</p>
                    <input className="pts-car__input" type="number" value={props.dataSet.persons} name="ownersInput" placeholder="Количество владельцев" 
                    onChange={(element) => {props.dataSet.setPersons(+element.target.value)}} /> 
                    <p className="pts-car__text">Растаможен?</p>
                    <div id="defectCarIsDefect">
                        <CustomInput className="jselect__input" type="text" value={props.dataSet.customs} placeholder="Да/Нет" 
                            data={[{id: 1, value: "Да"}, {id: 0, value: "Нет"}]} setId={props.dataSet.setCustomsId} isActive={true} setValue={props.dataSet.setCustoms} />
                    </div>
                </div>
            </div>
        </section>        
    )
}

export default Pts;