import { url } from "inspector";
import { Editor } from "./types"

let editor: Editor = {
    presentation: {
        title: "Braviypresentation",
        slides: [
            {
                slideId: "0",
                elements: [
                    {
                        elementId: "0",
                        elementType: "figure",
                        position: {
                            x: 32,
                            y: 64
                        },
                        size: {
                            width: 356,
                            height: 93
                        },
                        figure: {
                            form: "triangle",
                            strokeColor: "#d0ff00",
                            strokeWidth: 5,
                            fillColor: "#ff00ff"
                        }
                    },
                    {
                        elementId: "1",
                        elementType: "figure",
                        position: {
                            x: 50,
                            y: 100
                        },
                        size: {
                            width: 300,
                            height: 90
                        },
                        figure: {
                            form: "rectangle",
                            strokeColor: "#d000ff",
                            strokeWidth: 5,
                            fillColor: "#ffff00"
                        }
                    },
                    {
                        elementId: "2",
                        elementType: "figure",
                        position: {
                            x: 70,
                            y: 150
                        },
                        size: {
                            width: 400,
                            height: 400
                        },
                        figure: {
                            form: "circle",
                            strokeColor: "#d0ffff",
                            strokeWidth: 5,
                            fillColor: "#0000ff"
                        }
                    },
                    {
                        elementId: '3',
                        elementType: "text",
                        position: {
                            x: 234,
                            y: 111
                        },
                        size: {
                            width: 50,
                            height: 50
                        },
                        textProps: {
                            font: 'Montserrat',
                            textColor: "#000000",
                            bgColor: "#ff9999",
                            textValue: "Hello Kerim!",
                            fontSize: 16,
                            fontWeight: "bold"
                        }
                    },
                    {
                        elementId: "4",
                        elementType: "figure",
                        position: {
                            x: 564,
                            y: 455
                        },
                        size: {
                            width: 50,
                            height: 50
                        },
                        figure: {
                            form: "triangle",
                            strokeColor: "#00ff2a",
                            strokeWidth: 0,
                            fillColor: "#d0ff00"
                        }
                    },
                    {
                        elementId: "5",
                        elementType: "image",
                        position: {
                            x: 530,
                            y: 50
                        },
                        size: {
                            width: 100,
                            height: 100
                        },
                        image: {
                            urlImage: 'https://www.institutps.ru/upload/images/teachers_photo/arnaberdiev_wide_v2.jpg',
                            imageType: 'url',
                            ext: '.jpg'
                        }
                    }
                ],
                background: "#FFF2AF",
                backgroundType: 'Base64',
                selectedElementsIds: ['3']
            }, 
            {
                slideId: "1",
                elements: [
                    {
                        elementId: "0",
                        elementType: "image",
                        position: {
                            x: 54,
                            y: 30
                        },
                        size: {
                            width: 450,
                            height: 59
                        },
                        image: {
                            urlImage: "https://www.institutps.ru/upload/images/teachers_photo/arnaberdiev_wide_v2.jpg",
                            imageType: "url",
                            ext: 'jpg'
                        }
                    }
                ],
                background: "#000FFF",
                backgroundType: 'Base64',
                selectedElementsIds: ['0']
            }
        ]
    },
    history: {
        undoStack: [],
        redoStack: []
    },
    statePreview: false,
    currentSlideIds: ['0']
};

let editorChangeHandler: Function;

function getEditor() {
    return editor
}

function setEditor(newEditor: Editor) {
    editor = newEditor
}

function addEditorChangeHandler(handler: Function) {
    editorChangeHandler = handler;
}

function dispatch(modifyFn: Function, payload: object) {
    const newEditor = modifyFn(editor, payload)
    setEditor(newEditor)

    if (editorChangeHandler)
    {
        editorChangeHandler()
    }
}

export { dispatch, getEditor, addEditorChangeHandler };