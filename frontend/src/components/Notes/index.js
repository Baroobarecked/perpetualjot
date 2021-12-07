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

    useEffect(() => {
        if(globalNote) {
            dispatch(noteActions.editNote({
                title: noteTitle,
                content: noteContent,
                noteId: globalNote.id,
                notebookId: globalNote.notebookId,
            }));
        }
    }, [dispatch, noteTitle, noteContent])

    const notebookTitle = () => {
        return (
            <h2>{globalNotebook.title}</h2>
        )
    }
    return (
        <div className='notesmain'>
            {globalNotebook && notebookTitle()}
            <div className='note_title'>
                <label>
                    title
                    <input type='text' value={noteTitle} onChange={e => setNoteTitle(e.target.value)}></input>
                </label>
            </div>
            <div className='textarea'>
                <textarea value={noteContent} onChange={e => setNoteContent(e.target.value)}></textarea>
            </div>
        </div>
    )

}

export default Notes;