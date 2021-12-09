import * as notebookActions from "../../store/notebooks";
import * as noteActions from "../../store/notes";
import * as globalNotebookActions from "../../store/globalNotebook";
import * as globalNoteActions from "../../store/globalNote";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

import './Notes.css'

function Notes() {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [noteTitle, setNoteTitle] = useState('Untitled');
    const [noteContent, setNoteContent] = useState('');
    // const [notebookTitle, setNotebookTitle] = useState(null);
    const [errorSameTitleToggle, setErrorSameTitleToggle] = useState(false);
    const [errorNoContentToggle, setErrorNoContentToggle] = useState(false);

    const globalNote = useSelector(state => state.globalNote);
    const globalNotebook = useSelector(state => state.globalNotebook);
    const previousNotebook = useRef();
    
    const notebooks = useSelector(state => state.notebooks);
    let notebookList =[];
    
    //puts notebooks in array
    if(notebooks) {
        for(let notebookId in notebooks) {
            notebookList.push(notebooks[notebookId])
        }
    };

   //sets state variables once globalNote created
    useEffect(() => {
        if(globalNote) {
            setNoteTitle(globalNote.title);
            setNoteContent(globalNote.content);
        }
    }, [globalNote])

    //submits changes to the note
    useEffect(() => {
        if(globalNote) {
            if(globalNotebook) {
                dispatch(noteActions.editNote({
                    title: noteTitle,
                    content: noteContent,
                    noteId: globalNote.id,
                    notebookId: globalNotebook.id,
                }));
            }
        }
    }, [dispatch, noteTitle, noteContent])
    
    //sets state variable once globalNotebook is created


    //Updates database everytime a change is made to notebook title
    useEffect (() => {
        async function updateData() {
            console.log(previousNotebook)
            if(globalNotebook) {
                if(globalNotebook.title !== '') {
                    console.log('hello')
                    if (notebookList.find(notebook => {
                        if(notebook.title === globalNotebook.title && notebook.id !== globalNotebook.id) return true;
                        else return false;
                    })) {
                        await dispatch(globalNotebookActions.setNewGlobalNotebook(previousNotebook.current));
                        setErrorSameTitleToggle(true);
                    } else {
                        await dispatch(notebookActions.editNotebook({
                            title: globalNotebook.title,
                            notebookId: globalNotebook.id,
                        }));
                        previousNotebook.current = {...globalNotebook};
                        setTimeout(() => setErrorSameTitleToggle(false), 5000);
                    }
                }
                if(document.getElementById('notebookfield').value === '') {
                    setErrorNoContentToggle(true);
                } else {
                    setErrorNoContentToggle(false);
                }
            }
        }
        updateData();
        
    }, [dispatch, globalNotebook])

    //content for editing notebook
    const editNotebook = () => {
        return (
            <div>
                {errorNoContentToggle && errorNoChars()}
                {errorSameTitleToggle && errorSameTitle()}
                <div className='notebook_title'>
                        <input id='notebookfield' type='text' value={globalNotebook.title} onChange={ async e => {
                            await dispatch(globalNotebookActions.setNewGlobalNotebook({...globalNotebook, title: e.target.value}));
                        }}></input>
                </div>
                <div className='divider'></div>
            </div>
        )
    };

    //content for editing note
    const editNote = () => {
        return (
            <div>
                <div className='note_title'>
                        <input id='notefield' name='editNoteField' type='text' value={noteTitle} onChange={e => setNoteTitle(e.target.value)}></input>
                </div>
                <div className='textarea'>
                    <textarea value={noteContent} onChange={e => setNoteContent(e.target.value)}></textarea>
                </div>
            </div>
        )
    };

    //error content
    const errorNoChars = () => {
        return (
            <pre>Notebook title must include at least one character</pre>
        )
    }
    const errorSameTitle = () => {
        return (
            <pre>Notebook title must unique</pre>
        )
    }

    const notebookMessage = () => {
        return (
            <h3>Please select a notebook or note from the menu.</h3>
        )
    }
    const noteMessage = () => {
        return (
            <h3>Please select a note from the menu, if there are none create one to add it to the notebook.</h3>
        )
    }
    const noneMessage = () => {
        return (
            <h3>You must select a notebook or note before you can edit.</h3>
        )
    }

    return (
        <div className='notesmain'>
            <div className='editNotebook'>
                {globalNotebook && editNotebook()}
                {!globalNotebook && notebookMessage()}
            </div>
            <div className='editNote'>
                {globalNote && (
                    globalNotebook && editNote()
                )}
                {!globalNote && (
                    globalNotebook && noteMessage()
                )}
                {!globalNote && (
                    !globalNotebook && noneMessage()
                )}
            </div>
        </div>
    )

}

export default Notes;