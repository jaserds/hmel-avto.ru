import React, {useEffect, useState} from 'react';
import Header from './Header';
import Inputs from './Inputs';
import Pts from './Pts';
import Photo from './Photo';
import Description from './Description';
import Documents from './Documents';
import ButtonAddCar from './ButtonAddCar';

const AddCar = () => {
    const [Vin, setVin] = useState('');

    const [brandId, setBrandId] = useState(null)
    const [modelId, setModelId] = useState(null)
    const [generation, setGenerationId] = useState(null)
    const [bodyId, setBodyId] = useState(null)
    const [engineId, setEngineId] = useState(null)
    const [driveUnitId, setDriveUnitId] = useState(null)
    const [transsmissionId, setTranssmissionId] = useState(null)
    const [ruleId, setRuleId] = useState(null)
    const [colorId, setColorId] = useState(null)
    const [volumeId, setVolumeId] = useState(null)
    const [rule, setRule] = useState('');
    const [powerEngine, setPowerEngine] = useState('');
    const [volume, setVolume] = useState('');
    const [ageValue, setAgeValue] = useState('');
    const [millageValue, setMillageValue] = useState('');
    const [priceValue, setPriceValue] = useState('');
    const [filesDocument, setFilesDocument] = useState([]);
    const [filesImages, setFilesImages] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [persons, setPersons] = useState('');
    const [customs, setCustoms] = useState('');
    const [isDeffect, setIsDeffect] = useState('')
    const [isDeffectId, setIsDeffectId] = useState(null)
    const [customsId, setCustomsId] = useState(null);
    const [descriptionCar, setDescriptionCar] = useState('')
    const [phoneValue, setPhoneValue] = useState('')
    const [cityId, setCityId] = useState('')

    return (
        <div>
            <Header />
            <Inputs dataSet={{Vin, powerEngine, volume, ageValue, millageValue, priceValue, volumeId, rule, phoneValue,
                brandId, modelId, generation, bodyId, engineId, driveUnitId, transsmissionId, cityId, colorId,
                setBrandId, setModelId, setGenerationId, setBodyId, setEngineId, setDriveUnitId, setTranssmissionId, setRuleId, setColorId,
                setVin, setPowerEngine, setAgeValue, setVolume, setMillageValue, setPriceValue, setVolumeId, setRule, setPhoneValue, setCityId
            }}/>
            <Pts dataSet={{selectedOption, persons, customs, isDeffect, isDeffectId, customsId, setSelectedOption, setPersons, setCustoms, setIsDeffect, setIsDeffectId, setCustomsId}}/>
            <Photo setFilesImages={setFilesImages}/>
            <Description dataSet={{descriptionCar, setDescriptionCar}}/>
            <Documents setFilesDocument={setFilesDocument}/>
            <ButtonAddCar dataSet={{Vin, brandId, modelId, generation, bodyId, engineId, driveUnitId, transsmissionId, cityId, rule, phoneValue, colorId, powerEngine, 
                volume, ageValue, millageValue, priceValue, filesImages, selectedOption, persons, filesDocument, isDeffectId, customsId, descriptionCar}}/>
        </div>
    )
}

export default AddCar;