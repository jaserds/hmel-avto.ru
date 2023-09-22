import React, { useState, useRef } from "react";
import completeDocumentPng from "./CompleteDocument.png";
import plusDocument from "./plusDocument.png"


const Documents = (props) => {
    const [previewDocs, setPreviewDocs] = useState([]);
    const docsInputRef = useRef(null);
    const [nextId, setNextId] = useState(0);


    const handleClick = () => {
      docsInputRef.current.click();
    };
  
    const handleFileChange = (e) => {
        const files = e.target.files;
        const newPreviewDocs = [];
        props.setFilesDocument(Array.from(files))
    
        for (let i = 0; i < files.length; i++) {
            const id = nextId + i;
            newPreviewDocs.push({id, filename: files[i].name});
    
            if (newPreviewDocs.length === files.length) {
                setPreviewDocs((prevDocs) => [...prevDocs, ...newPreviewDocs]);
                setNextId(nextId + files.length)
            }
          };
    }

    const handleDelete = (id, name) => {
        const docWrappers = document.querySelector(`[data-index="${id}"]`);
        docWrappers.classList.add('remove-prev-car');
        props.setFilesDocument((prevDocs) => prevDocs.filter((doc) => doc.name !== name));

        setTimeout(() => {
            setPreviewDocs((prevDocuments) => prevDocuments.filter((doc) => doc.id !== id));
        }, 300)
    };
    
    
    return (
        <section className="document-car car__section">
            <div className="characteristic-car">
                <div className="characteristic-car__inner">
                    <h2 className="add-car__title">Документы</h2>
                    <h3 className="pts__subtitle">Загрузите необходимые документы которые будут прикреплены к истории автомобиля</h3>
                    <div className="document-car__prev-box">
                    {previewDocs.map((docu) => {
                           return (
                            <div className="prev-box__wrapper" key={docu.id}>
                                <div className="prev-box__document" onClick={() => {handleDelete(docu.id, docu.filename)}} data-index={docu.id}>
                                    <img className="prev-box__add-element-image" src={completeDocumentPng} alt="" />
                                </div>
                                <p className="prev-box__add-element-text" >{docu.filename}</p>
                            </div>
                           )
                        })}
                        <div className="prev-box__add-element">
                            <input id="documentFile" type="file" ref={docsInputRef} multiple accept=".png, .jpg, .jpeg, .doc, .pdf, .xlsx, .txt" onChange={handleFileChange}/>
                            <img className="prev-box__add-element-image" src={plusDocument} alt="" onClick={handleClick}/>
                        </div>
                    </div>
                    <p className="document-download__information-text">* Не более 6 документов в формате pdf, jpeg, png</p>
                </div>
            </div>
        </section>
    )
}

export default Documents;