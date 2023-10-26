import React, {useEffect, useRef, useState} from "react";
import { NavLink, useParams } from "react-router-dom";
import HmelAvtoLogo from '../CarsPanel/img/logo-hmel-avto.svg';
import carIcon from '../CarsPanel/img/car-menu-icon.svg';
import homeIcon from '../CarsPanel/img/home.svg';
import { ADMIN_ROUTE, MAIN_ROUTE } from "../../../utils/consts";
import CarsServices from "../../../services/CarsServices";
import completeDocument from "./img/CompleteDocument.png";
import plusDocument from "./img/plusDocument.png";
import documentDeleteImg from "./img/DeleteDocumentImg.svg"
import success_green from "./img/success_green.svg"
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { Editor as WysiwygEditor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import AdminPanelServices from "../../../services/AdminPanelServices";

const CarDetails = () => {

    const [showModalDelImg, setShowModalDelImg] = useState(false);
    const [showModalDelDoc, setShowModalDelDoc] = useState(false);
    const [showDelAutoModal, setShowDelAutoModal] = useState(false);
    const [showRestoreAutoModal, setShowRestoreAutoModal] = useState(false);
    const [showModalAddExpenses, setShowModalAddExpenses] = useState(false);
    const [showIconSuccessDescription, setShowIconSuccessDescription] = useState(false);
    const [showIconSuccessCharacteristics, setShowIconSuccessCharacteristics] = useState(false);
    const [indexExpensesOptions, setIndexExpensesOptions] = useState(null)
    const [showModalExpensesOptions, setShowModalExpensesOptions] = useState(false)
    const [deleteID, setDeleteID] = useState(null);
    const params = new FormData();
    const carID = useParams()
    const fileInputRef = useRef(null);
    const DocumentInputRef = useRef(null);
    const [car, setCar] = useState({});
    const [images, setImages] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [descriptionCar, setDescriptionCar] = useState()
    const [totlaExpenses, setTotalExpenses] = useState()
    const [characteristics, setCharacteristics] = useState({
        "price": car.Price,
        "phone": car.phone,
        "mileage": car.Mileage,
        "age": car.Age,
        "VIN": car.VIN
    });

    const [expensesData, setExpensesData] = useState({
        "expensesName": "", 
        "expensesDataTime": "", 
        "expensesSumma": "",
    })

    const [allExpenses, setAllExpenses] = useState([]) 
    params.append('carID', carID.id)

    const handleSave = () => {
        const htmlContent = convertToHTML(editorState.getCurrentContent());
        if (htmlContent !== undefined) {
            setDescriptionCar(htmlContent);
        }
    };  

    const fetchDataAllExpenses = async () => {
        try {
            await AdminPanelServices.getExpensesByCarID(carID.id).then((data) => {setAllExpenses(data.data);}) 
        } catch (error) {
            console.error(error)
        }
    }
    const fetchDataTotalExpenses = async () => {
        try {
            await AdminPanelServices.getTotalExpenses(carID.id).then((data) => {setTotalExpenses(data.data[0].TotalExpenses)}) 
        } catch (error) {
            console.error(error)
        }
    }

    const fetchDataCars = async () => {
        try {
            const responce = await CarsServices.getCarByCarId(carID.id);
            setCar(responce.data)
            const contentBlocks = convertFromHTML(responce.data.DescriptionOfDefects);
            const contentState = ContentState.createFromBlockArray(contentBlocks);
            const newEditorState = EditorState.createWithContent(contentState);
            setEditorState(newEditorState);
        } catch (error) {
            console.error(error)
        }
    }

    const fetchDataImages = async () => {
        try {
            const responce = await CarsServices.getAllPhotoByCarId(carID.id)
            setImages(responce.data)
        } catch (error) {
            console.error(error)
        }
    }

    const fetchDataDocuments = async () => {
        try {
            const responce = await CarsServices.getAllDocumentsByCarId(carID.id)
            setDocuments(responce.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {

        const handleOutsideClick = (event) => {
            if (!event.target.closest('.modalExpensesOptions')) {
                setShowModalExpensesOptions(false);
            }
      
            if (!event.target.closest('.modalExpensesOptions')) {
                setShowModalExpensesOptions(false);
            }
          };
          
          document.addEventListener('mousedown', handleOutsideClick);

        fetchDataCars();
        fetchDataImages();
        fetchDataDocuments();
        fetchDataAllExpenses();
        fetchDataTotalExpenses();
    }, [])

    useEffect(() => {
        setCharacteristics((prevState) => ({
            ...prevState,
            "price": car.Price,
            "phone": car.phone,
            "mileage": car.Mileage,
            "age": car.Age,
            "VIN": car.VIN}))
    }, [car])

    const openModalDelImg = (itemID) => {
        setShowModalDelImg(true);
        setDeleteID(itemID)
    };

    const openModalDelDoc = (itemID) => {
        setShowModalDelDoc(true);
        setDeleteID(itemID)
    };
    
    const closeModalDelImg = () => {
    setShowModalDelImg(false);
    };

    const closeModalDelDoc = () => {
        setShowModalDelDoc(false);
    };

    const handleDeleteDocument = (documentID) => {
        setDocuments((prevDocumetn) => prevDocumetn.filter((document) => document.documentID !== documentID))
        AdminPanelServices.delDocumentByID(documentID)
        closeModalDelDoc()
        
    }

    const handleDeleteImage = (photoID) => {
        setImages((prevPhotos) => prevPhotos.filter((photo) => photo.photoID !== photoID))
        AdminPanelServices.delPhotoByID(photoID)
        closeModalDelImg()
    }
    
    const addExpensesOpneFormHnadler = () => {
        setShowModalAddExpenses(!showModalAddExpenses)
    }

    const handleClickAddPhoto = () => {
        fileInputRef.current.click();
    };

    const handleClickAddDocument = () => {
        DocumentInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files.length != 0 && files !== null){
            for (let i = 0; i < files.length; i++) {
                params.append('files', files[i]);
            }
        } else {
            return
        }
        AdminPanelServices.addPhotos(params).then(() => {fetchDataImages()});
    };

    const handleDocumentChange = (e) => {
        const documents = e.target.files;
        if (documents.length != 0 && documents !== null){
            for (let i = 0; i < documents.length; i++) {
                params.append('documents', documents[i]);
            }
        } else {
            return
        }
        AdminPanelServices.addDocuments(params).then(() => {fetchDataDocuments()});
    }

    const updateDescription = () => {
        AdminPanelServices.updateDescriptionCar(descriptionCar, carID.id).then((data) => {
            if (data === "Описание успешно изменено") {
                setShowIconSuccessDescription(true); setTimeout(()=> {
                    setShowIconSuccessDescription(false)}, 2000)
            }
        })
    }

    const updateCharacteristics = () => {
        AdminPanelServices.updateCharacteristics(characteristics, carID.id).then((data) => {
            if (data === "Описание успешно изменено") {
                setShowIconSuccessCharacteristics(true); setTimeout(()=> {
                    setShowIconSuccessCharacteristics(false)}, 2000)
            }
        })
    }

    const addExpensesData = () => {
        if (expensesData.expensesName === '' || expensesData.expensesDataTime === '' || expensesData.expensesSumma === '') {
            return
        } else {
            AdminPanelServices.addExpensesByCarID(expensesData.expensesName, expensesData.expensesDataTime, expensesData.expensesSumma, carID.id).then(() => {
                fetchDataAllExpenses()
                fetchDataTotalExpenses();
            });
        }
    }

    const openModlaExpensesDelete = (index) => {
        setIndexExpensesOptions(index)
        setShowModalExpensesOptions(!showModalExpensesOptions)
    }

    const deleteExpenses = (expensesID, expensesSumm) => {
        AdminPanelServices.delExpensesByID(expensesID)
        setTotalExpenses(Number(totlaExpenses) - expensesSumm)
        console.log(allExpenses, expensesID);
        setAllExpenses((prevExpenses) => prevExpenses.filter((expenses) => expenses.id !== expensesID))
        setShowModalExpensesOptions(!showModalExpensesOptions)
    }

    const delCarHandler = () => {
        AdminPanelServices.deleteAuto(carID.id);
        setShowDelAutoModal(!showDelAutoModal)
        setCar((prev) => ({...prev, 'isSite': 0}))
    }

    const restoreCarHandler = () => {
        AdminPanelServices.restoreAuto(carID.id)
        setShowRestoreAutoModal(!showRestoreAutoModal)
        setCar((prev) => ({...prev, 'isSite': 1}))
    }

    return (
        <section className="main__section">
            <div className="admin-panel__left-container">
                <img className="left-container__logo" src={HmelAvtoLogo} alt="Логотип компании hmel-avto"/>
                <div className="left-container__menu-block">
                    <NavLink className="left-container__menu-block-link" to={ADMIN_ROUTE}>
                        <img src={carIcon} alt="Иконка автомобили" className="left-container__img"/>
                        <p className="left-container__text-menu">Назад</p>
                    </NavLink>
                </div>
                <div className="left-container__menu-block left-container__menu-block_bottom">
                <NavLink className="left-container__menu-block-link" to={MAIN_ROUTE}>
                    <img src={homeIcon} alt="Иконка выход на главную страницу" className="left-container__img"/>
                    <p className="left-container__text-menu">Главаня</p>
                </NavLink>
                </div>
            </div>
            <div className="admin__information-container">
                <div className="information-container__title-box">
                    <h1 className="information-container__title">{car.BrandName} {car.ModelName} {car.GenerationName} {car.GenerationAge}</h1>
                    {car.isSite === 1 && <button className="information-container__bth-del-auto" onClick={() => {setShowDelAutoModal(true)}}>Удалить автомобиль</button>}
                    {car.isSite === 0 && <button className="information-container__bth-del-auto" onClick={() => {setShowRestoreAutoModal(true)}}>Вернуть автомобиль</button>}
                </div>
                {showDelAutoModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <p className="modal__text">Вы действительно хотите удалить Автомобиль с сайта??</p>
                            <button className="modal__button" onClick={delCarHandler}>Да</button>
                            <button className="modal__button" onClick={() => setShowDelAutoModal(false)}>Нет</button>
                        </div>
                    </div>
                )}
                {showRestoreAutoModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <p className="modal__text">Вы действительно хотите вернуть Автомобиль на сайт?</p>
                            <button className="modal__button" onClick={restoreCarHandler}>Да</button>
                            <button className="modal__button" onClick={() => setShowRestoreAutoModal(false)}>Нет</button>
                        </div>
                    </div>
                )}
                    <div className="content__container">
                        <div className="content__images">
                            <h2 className="content__tittle">Фотографии</h2>
                            <div className="images__items">
                                {images.map((img, index) => {return(
                                    <div key={index} className="image__container" data-index-photo={img.photoID} onClick={() => openModalDelImg(img.photoID)}>
                                        <img className="image-container__image" src={"https://hmel-avto.ru/images/" + img.fileName} alt={"Фото автомболия " + car.BrandName + " " + car.ModelName + " " + car.GenerationName + " " + car.GenerationAge + ". Вид " + index} />
                                    </div>)
                                })}
                                <div className="image__container-add-photo">
                                    <input id="photoFile" type="file" accept="iamge/*,.png,.jpg,.jpeg,.web," ref={fileInputRef} multiple onChange={handleFileChange}/>
                                    <div className="image-container__add-photo" onClick={handleClickAddPhoto}></div>
                                </div>
                                {showModalDelImg && (
                                    <div className="modal">
                                        <div className="modal-content">
                                            <p className="modal__text">Вы действительно хотите удалить фотогрфию {deleteID}?</p>
                                            <button className="modal__button" onClick={() => handleDeleteImage(deleteID)}>Да</button>
                                            <button className="modal__button" onClick={closeModalDelImg}>Нет</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="content__documents">
                            <h2 className="content__tittle">Документы</h2>
                            <div className="documents__items">
                                {documents.map((document, index) => {return (
                                    <div key={index} className="document__container" data-index-document={document.documentID} >
                                        <img className="document-container__document" src={completeDocument} alt="" />
                                        <img className="document__delete-btn" src={documentDeleteImg} alt="" onClick={() => {openModalDelDoc(document.documentID)}}/>
                                        <p className="document-container__document-text">{document.documentName}</p>
                                    </div>
                                )})}
                                <div className="document__container">
                                    <input id="photoFile" type="file" accept="iamge/*,.png,.jpg,.jpeg,.web," ref={DocumentInputRef} multiple onChange={handleDocumentChange}/>  
                                    <img className="document-container__document document_pointer" src={plusDocument} alt="" onClick={handleClickAddDocument}/>
                                </div>
                                {showModalDelDoc && (
                                    <div className="modal">
                                        <div className="modal-content">
                                            <p className="modal__text">Вы действительно хотите удалить Документ {deleteID}?</p>
                                            <button className="modal__button" onClick={() => handleDeleteDocument(deleteID)}>Да</button>
                                            <button className="modal__button" onClick={closeModalDelDoc}>Нет</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="content__description">
                            <h2 className="content__tittle">Описание</h2>
                            <WysiwygEditor
                                    onChange={handleSave}
                                    editorState={editorState}
                                    onEditorStateChange={setEditorState}
                                    toolbar={{
                                        options: ['inline', 'blockType', 'list', 'textAlign', 'history'],
                                        inline: {
                                        options: ['bold', 'italic', 'underline'],
                                        },
                                        blockType: {
                                        options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
                                        },
                                        textAlign: {
                                        options: ['left', 'center', 'right'],
                                        },
                                        history: {
                                        options: ['undo', 'redo'],
                                        },
                                    }}
                                    
                                    wrapperClassName="wrapper-class"
                                    editorClassName="editor-class"
                                    toolbarClassName="toolbar-class"
                                />
                                <div className="success__container">
                                    <button className="characteristics__save-button" onClick={() => {updateDescription()}}>Сохранить</button>
                                    <img className={`success__icon ${showIconSuccessDescription ? "show" : ""}`} src={success_green} alt="Иконка Данные успешно обновлены" />
                                </div>
                        </div>
                        <div className="conten__characteristics">
                            <h2 className="content__tittle">Характеристики</h2>
                            <div className="characteristics__container">
                                <div className="characteristics__input-box">
                                    <p className="characteristic__text">Цена:</p>
                                    <input className="characteristic__input" type="number" placeholder="Цена" value={characteristics.price} onChange={(e) => setCharacteristics((prevState) => (
                                        {...prevState, "price": e.target.value}
                                    ))}/>
                                </div>
                                <div className="characteristics__input-box">
                                    <p className="characteristic__text">Телефон:</p>
                                    <input className="characteristic__input" type="text" placeholder="Телефон" value={characteristics.phone} onChange={(e) => setCharacteristics((prevState) => (
                                        {...prevState, "phone": e.target.value}
                                    ))}/>
                                </div>
                                <div className="characteristics__input-box">
                                    <p className="characteristic__text">Пробег:</p>
                                    <input className="characteristic__input" type="number" placeholder="Пробег" value={characteristics.mileage} onChange={(e) => setCharacteristics((prevState) => (
                                        {...prevState, "mileage": e.target.value}
                                    ))}/>
                                </div>
                                <div className="characteristics__input-box">
                                    <p className="characteristic__text">Год:</p>
                                    <input className="characteristic__input" type="number" placeholder="Год" value={characteristics.age} onChange={(e) => setCharacteristics((prevState) => (
                                        {...prevState, "age": e.target.value}
                                    ))}/>
                                </div>
                                <div className="characteristics__input-box">
                                    <p className="characteristic__text">VIN:</p>
                                    <input className="characteristic__input" type="text" placeholder="VIN" value={characteristics.VIN} onChange={(e) => setCharacteristics((prevState) => (
                                        {...prevState, "VIN": e.target.value}
                                    ))}/>
                                </div>
                            </div>
                            <div className="success__container">
                                <button className="characteristics__save-button" onClick={() => {updateCharacteristics()}}>Сохранить</button>
                                <img className={`success__icon ${showIconSuccessCharacteristics ? "show" : ""}`} src={success_green} alt="Иконка Данные успешно обновлены" />
                            </div>
                           
                        </div>
                        <div className="content__expenses">
                            <h2 className="content__tittle">Расходы</h2>
                            <div className="expenses__tab-head">
                                <div className="expenses-tab-head__text">НАИМЕНОВАНИЕ</div>
                                <div className="expenses-tab-head__text">ДАТА:</div>
                                <div className="expenses-tab-head__text">СУММА:</div>
                                <div className="expenses-tab-head__text"></div>
                            </div>
                            <div className="expenses__tab-items">
                                {allExpenses.map((expensesItem, index) => (
                                    <div key={index} className="expenses__tab-item">
                                        <div className="expenses-tab-item__text">
                                            {expensesItem.ExpensesName}
                                        </div>
                                        <div className="expenses-tab-item__text expenses-tab-item__text_data">
                                            {expensesItem.ExpensesDataTime.slice(0, 19).replace('T', ' ')}
                                        </div>
                                        <div className="expenses-tab-item__text expenses-tab-item__text_price">
                                            {Number(expensesItem.ExpensesSumm).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0, maximumFractionDigits: 0})}
                                        </div>
                                        <div className="expenses-tab-item__text expenses-tab-item__text_writing-mode" onClick={()=>{openModlaExpensesDelete(index)}}>
                                        ...
                                        </div>
                                        {showModalExpensesOptions && indexExpensesOptions === index && (
                                            <div className="modalExpensesOptions">
                                                <div className="modalExpensesOptions__dell" onClick={() => {deleteExpenses(expensesItem.id, expensesItem.ExpensesSumm)}}>Удалить</div>
                                            </div>
                                        )}
                                    </div>     
                                ))}                                                                                     
                            </div>
                            <button className="expenses-add__btn" onClick={addExpensesOpneFormHnadler}>Добавить расходы</button>
                            {showModalAddExpenses && (
                                <div className="expenses__modal">
                                    <input type="text" className="expenses__input" value={setExpensesData.expensesName} placeholder="Введите наименование" onChange={
                                            (e) => {setExpensesData((prev) => (
                                                    {
                                                        ...prev,
                                                        "expensesName": e.target.value
                                                    }))
                                            }
                                        }/>
                                    
                                    <input type="datetime-local" className="expenses__input" value={setExpensesData.expensesDataTime} onChange={
                                        (e) => {setExpensesData((prevExpenses) => (
                                            {                                                
                                                ...prevExpenses,
                                                "expensesDataTime": e.target.value
                                            }
                                        ))}
                                    }/>
                                    <input type="number" className="expenses__input" value={setExpensesData.expensesSumma} placeholder="Введите сумму" onChange={
                                        (e) => {setExpensesData((prevExpenses) => (
                                            {                                                
                                                ...prevExpenses,
                                                "expensesSumma": Number(e.target.value)
                                            }
                                        ))}
                                    }/>
                                    <button className="expenses__btn" onClick={addExpensesData}>ОК</button>
                                
                                </div>
                            )}
                        </div>
                    </div>
                    <p className="content__expenses-summa">Сумма расходов: <span className="container-expenses-summa__text">{Number(totlaExpenses).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0, maximumFractionDigits: 0})}</span></p>
            </div>
        </section>

    )
}


export default CarDetails;