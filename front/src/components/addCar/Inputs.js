import React, {useEffect, useState} from "react";
import CustomInput from '../inputs/CustomInput';
import InputServices from "../../services/InputServices";


const Inputs = (props) => {
    
    const volumeDataSet = [
        {id: 1, "value": 0.7},
        {id: 2, "value": 0.8},
        {id: 3, "value": 1.0},
        {id: 4, "value": 1.1},
        {id: 5, "value": 1.2},
        {id: 6, "value": 1.3},
        {id: 7, "value": 1.4},
        {id: 8, "value": 1.5},
        {id: 9, "value": 1.6},
        {id: 10, "value": 1.7},
        {id: 11, "value": 1.8},
        {id: 12, "value": 1.9},
        {id: 13, "value": 2.0},
        {id: 14, "value": 2.2},
        {id: 15, "value": 2.3},
        {id: 16, "value": 2.4},
        {id: 17, "value": 2.5},
        {id: 18, "value": 2.7},
        {id: 19, "value": 2.8},
        {id: 20, "value": 3.0},
        {id: 21, "value": 3.2},
        {id: 22, "value": 3.3},
        {id: 23, "value": 3.5},
        {id: 25, "value": 3.6},
        {id: 26, "value": 4.0},
        {id: 27, "value": 4.2},
        {id: 28, "value": 4.4},
        {id: 29, "value": 4.5},
        {id: 30, "value": 4.6},
        {id: 31, "value": 4.7},
        {id: 32, "value": 5.0},
        {id: 33, "value": 5.5},
        {id: 34, "value": 5.7},
        {id: 35, "value": 6.0}];

    const [brandValue, setBrandValue] = useState('');
    const [modelValue, setModelValue] = useState('');
    const [generationValue, setGenerationValue] = useState('');
    const [bodyValue, setBodyValue] = useState('');
    const [transsmissionValue, setTranssmissionValue] = useState('');
    const [engineValue, setEngineValue] = useState('');
    const [driveUnitValue, setDriveUnitValue] = useState('');
    const [colorCar, setColorCar] = useState('');
    const [brandData, setBrandData] = useState([]);
    const [modelData, setModelData] = useState([]);
    const [modelIsActive, setModelIsActive] = useState(false);
    const [generationIsActive, setGenerationIsActive] = useState(false);
    const [generationData, setGenerationData] = useState([]);
    const [bodyData, setBodyData] = useState([]);
    const [transsmissionData, setTranssmissionData] = useState([]);
    const [engineData, setEngineData] = useState([]);
    const [driveUnitData, setDriveUnitData] = useState([]);
    const [volumeData, setVolumeData] = useState([]);
    const [colorCarData, setColorCarData] = useState([]);
    const [cityValue, setCityValue] = useState('')
    const [cityData, setCityData] = useState([])
    
    
    const changeData = (data) => {
        const dataNew = data.map((item) => {
            return { id: Object.values(item)[0], value: Object.values(item)[1] };
        });
        return dataNew;
    }

    const fetchData = async (params, method, element) => {
        const result = await method(...params)
        element(changeData(result.data))
    }

    useEffect(()=>{
        if (brandValue !== ''){
            fetchData([brandValue], InputServices.getModelsByBrand, setModelData)
            fetchData([brandValue], InputServices.getModelsByBrand, setModelData)
            fetchData([brandValue], InputServices.getBodyByBrand, setBodyData)
            fetchData([brandValue], InputServices.getTranssmissionByBrand, setTranssmissionData)
            setModelIsActive(true)
            setGenerationIsActive(false)
            setModelValue('')
            setGenerationValue('')
            setBodyValue('')
            setTranssmissionValue('')
            setDriveUnitValue('')
        }else{
            setModelIsActive(false)
            setGenerationIsActive(false)
            setModelValue('')
            setGenerationValue('')
            setBodyValue('')
            setTranssmissionValue('')
            setDriveUnitValue('')
        }
    }, [brandValue])

    useEffect(()=>{
        
        if (modelValue !== ''){
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
        fetchData([], InputServices.getAllEgineTypes, setEngineData)
        fetchData([], InputServices.getAllDriveUnit, setDriveUnitData)
        fetchData([], InputServices.getAllColors, setColorCarData)
        fetchData([], InputServices.getAllCities, setCityData)
        setVolumeData(volumeDataSet)
      }, []);

      const stateInputs = {
        'brand': props.dataSet.brandId,
        'model':  props.dataSet.modelId,
        'generation': props.dataSet.generation,
        'body': props.dataSet.bodyId,
        'engine': props.dataSet.engineId,
        'driveUnit': props.dataSet.driveUnitId,
        'transsmission': props.dataSet.transsmissionId,
        'color': props.dataSet.colorId,
        'city': props.dataSet.cityId
      }

    return (
        <section className="characteristic-car__section car__section">
        <div className="characteristic-car">                                                   
            <div className="characteristic-car__inner">
                <h2 className="add-car__title">Характеристики</h2>
                <div className="characteristic-car__items">
                    <input className="jselect__input" type="text" value={props.dataSet.Vin} placeholder="VIN" 
                        onChange={(element) => {props.dataSet.setVin(element.target.value)}}/>

                    <CustomInput className="jselect__input" id="addVIN" type="text" value={brandValue} placeholder="Бренд" 
                        data={brandData} updateData={setBrandData} setId={props.dataSet.setBrandId} isActive={true} setValue={setBrandValue} stateIn={stateInputs} isAddCar={true}/>

                    <CustomInput className="jselect__input" type="text" value={modelValue} placeholder="Модель"
                        data={modelData} updateData={setModelData} setId={props.dataSet.setModelId} isActive={modelIsActive} setValue={setModelValue} stateIn={stateInputs} isAddCar={true}/>

                    <CustomInput className="jselect__input" type="text" value={generationValue} placeholder="Поколение" 
                        data={generationData} updateData={setGenerationData} setId={props.dataSet.setGenerationId} isActive={generationIsActive} setValue={setGenerationValue} stateIn={stateInputs} isAddCar={true}/>

                    <CustomInput className="jselect__input" type="text" value={bodyValue} placeholder="Кузов" 
                         data={bodyData} updateData={setBodyData} setId={props.dataSet.setBodyId} isActive={true} setValue={setBodyValue} stateIn={stateInputs} isAddCar={true}/>

                    <CustomInput className="jselect__input" type="text" value={engineValue} placeholder="Двигатель" 
                        data={engineData} updateData={setEngineData} setId={props.dataSet.setEngineId} isActive={true} setValue={setEngineValue} stateIn={stateInputs} isAddCar={true}/>

                    <CustomInput className="jselect__input" type="text" value={driveUnitValue} placeholder="Привод" 
                        data={driveUnitData} updateData={setDriveUnitData} setId={props.dataSet.setDriveUnitId} isActive={true} setValue={setDriveUnitValue} stateIn={stateInputs} isAddCar={true}/>

                    <CustomInput className="jselect__input" type="text" value={transsmissionValue} placeholder="Коробка" 
                        data={transsmissionData} updateData={setTranssmissionData} setId={props.dataSet.setTranssmissionId} isActive={true} setValue={setTranssmissionValue} stateIn={stateInputs} isAddCar={true}/>

                    <CustomInput className="jselect__input" type="text" value={props.dataSet.rule} placeholder="Руль" 
                        setId={props.dataSet.setRuleId} data={[{id: 1, value: "Правый"}, {id: 2, value: "Левый"}]} isActive={true} setValue={props.dataSet.setRule} stateIn={stateInputs} isAddCar={true}/>

                    <CustomInput className="jselect__input" type="text" value={colorCar} placeholder="Цвет" 
                        data={colorCarData} updateData={setColorCarData} setId={props.dataSet.setColorId} isActive={true} setValue={setColorCar} stateIn={stateInputs} isAddCar={true}/>

                    <CustomInput className="jselect__input" type="number" value={props.dataSet.volume} placeholder="Объем, л" 
                        data={volumeData} setId={props.dataSet.setVolumeId} isActive={true} setValue={props.dataSet.setVolume} stateIn={stateInputs} isAddCar={true}/>

                    <input className="jselect__input" type="number" value={props.dataSet.powerEngine} placeholder="Мощьность, лс" 
                        onChange={(element) => {props.dataSet.setPowerEngine(+element.target.value)}}/>
                    <input className="jselect__input" type="number" value={props.dataSet.millageValue} placeholder="Пробег, км" 
                        onChange={(element) => {props.dataSet.setMillageValue(+element.target.value)}}/>
                    <input className="jselect__input" type="number" value={props.dataSet.ageValue} placeholder="Год" 
                        onChange={(element) => {props.dataSet.setAgeValue(+element.target.value)}}/>
                    <input className="jselect__input" type="number" value={props.dataSet.priceValue} placeholder="Цена" 
                        onChange={(element) => {props.dataSet.setPriceValue(+element.target.value)}}/>
                    <input className="jselect__input" type="text" value={props.dataSet.phoneValue} placeholder="Телефон" 
                        onChange={(element) => {props.dataSet.setPhoneValue(element.target.value)}} />

                    <CustomInput className="jselect__input" type="text" value={cityValue} placeholder="Город" 
                        data={cityData} updateData={setCityData} setId={props.dataSet.setCityId} isActive={true} setValue={setCityValue} stateIn={stateInputs} isAddCar={true}/>
                </div>
            </div>
        </div>
    </section>
    )
}


export default Inputs;