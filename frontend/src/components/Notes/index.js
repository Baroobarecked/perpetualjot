import * as notebookActions from "../../store/notebooks";
import * as noteActions from "../../store/notes";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import './Notes.css'

function Notes() {
    // const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [noteTitle, setNoteTitle] = useState('Untitled');
    const [noteContent, setNoteContent] = useState('');
    const [notebookTitle, setNotebookTitle] = useState(null);

    const globalNote = useSelector(state => state.globalNote);
    const globalNotebook = useSelector(state => state.globalNotebook);
    
    const notebooks = useSelector(state => state.notebooks);
    let notebookList =[];
    
    
    if(notebooks) {
        for(let notebookId in notebooks) {
            notebookList.push(notebooks[notebookId])
        }
    };
   
    useEffect(() => {
        if(globalNote) {
            setNoteTitle(globalNote.title);
            setNoteContent(globalNote.content);
        }
    }, [globalNote])

    function submit() {
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
    }

    useEffect(() => {
        if(globalNotebook) {
            setNotebookTitle(globalNotebook.title);
        }
    }, [globalNotebook])

    useEffect(() => {
        if(globalNotebook) {
            dispatch(notebookActions.editNotebook({
                title: notebookTitle,
                notebookId: globalNotebook.id,
            }));
        }
    }, [dispatch, notebookTitle])

    const changeNotebookTitle = () => {
        return (
            <div>
                <div className='notebook_title'>
                    <label>
                        title
                        <input type='text' value={notebookTitle} onChange={e => setNotebookTitle(e.target.value)}></input>
                    </label>
                    <button onClick={() => {dispatch(notebookActions.deleteOldNotebook({ notebookId: globalNotebook.id}))}}>delete</button>
                </div>
            </div>
        )
    }
    return (
        <div className='notesmain'>
            {globalNotebook && changeNotebookTitle()}
            <div className='note_title'>
                <label>
                    title
                    <input type='text' value={noteTitle} onChange={e => setNoteTitle(e.target.value)}></input>
                </label>
            </div>
            <div className='textarea'>
                <textarea value={noteContent} onChange={e => setNoteContent(e.target.value)}></textarea>
            </div>
            <button onClick={submit}>Submit</button>
        </div>
    )

}

export default Notes;