import React, { useState } from 'react';
import { EditorState, Editor } from 'draft-js';
import { Editor as WysiwygEditor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const Description = (props) => {

    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const handleSave = () => {
        const htmlContent = convertToHTML(editorState.getCurrentContent());
        props.dataSet.setDescriptionCar(htmlContent);
      };    

    return (
        <section className="defect-car car__section">
            <div className="characteristic-car">
                <div className="characteristic-car__inner">
                    <h2 className="add-car__title">Описание автомобиля</h2>
                    <div className="defect-desc-area__box">
                        <h3 className="pts__subtitle">Опишите основные характеристики автомобиля</h3>
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
                    </div>
                </div>
            </div>
        </section>
    )
    
}

export default Description;