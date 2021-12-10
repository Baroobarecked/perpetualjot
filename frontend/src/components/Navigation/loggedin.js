import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import * as noteActions from "../../store/notes";
import * as notebookActions from "../../store/notebooks";
import * as globalNotebookActions from "../../store/globalNotebook";
import * as globalNoteActions from "../../store/globalNote";
import ProfileButton from './ProfileButton';
import AddNotebookModal from '../AddNotebookModal';
import DeleteNotebookModal from '../DeleteNotebookModal';

import './loggedin.css';

function LoggedIn ({user}) {
    // console.log(user);
    const dispatch = useDispatch();

    const [globalNotebook, setGlobalNotebook] = useState(null);
    const notebooks = useSelector(state => state.notebooks);
    const [notebookToggle, setNotebookToggle] = useState(false);
    const [noteToggle, setNoteToggle] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    let notebookList =[];

    if(notebooks) {
        for(let notebookId in notebooks) {
            notebookList.push(notebooks[notebookId])
        }
    }

    const notes = useSelector(state => state.notes);
    let noteList =[];
    
    if(notes) {
        for(let noteId in notes) {
            noteList.push(notes[noteId])
        }
    }

    notebookList = notebookList.filter(notebook => notebook.title.includes(searchValue))
    noteList = noteList.filter(note => note.title.includes(searchValue))

    const style = () => {
        const style = {
            marginBottom: '10px',
            border: '2px solid rgb(187, 103, 0)',
            borderRadius: '5px',
        }
        const styles = {
            width: '100%',
            marginBottom: '10px',
            height: '3px',
            backgroundColor: 'rgb(187, 103, 0)',
        }
        return (
            <>
                <button className='togglebutton' style={style} onClick={() => setNotebookToggle(!notebookToggle)}>Notebooks<i class="fas fa-chevron-up"></i></button>
                <div style={styles}></div>
            </>
        )
    }

    const noStyle = () => {
        return (
            <button className='togglebutton' onClick={() => setNotebookToggle(!notebookToggle)}>Notebooks<i class="fas fa-chevron-down"></i></button>
        )
    }
    
    const styleNote = () => {
        const style = {
            marginBottom: '10px',
            border: '2px solid rgb(187, 103, 0)',
            borderRadius: '5px',
        }
        const styles = {
            width: '100%',
            marginBottom: '10px',
            height: '3px',
            backgroundColor: 'rgb(187, 103, 0)',
        }
        return (
            <>
                <button className='togglebutton' style={style} onClick={() => setNoteToggle(!noteToggle)}>All Notes<i class="fas fa-chevron-up"></i></button>
                <div style={styles}></div>
            </>
        )
    }

    const noStyleNote = () => {
        return (
            <button className='togglebutton' onClick={() => setNoteToggle(!noteToggle)}>All Notes<i class="fas fa-chevron-down"></i></button>
        )
    }
    
    return (
        <div className='main_nav'>
            <div className='profile'>
                <ProfileButton user={user} />
            </div>
            <div className='search'>
                <label htmlFor='search'>Search</label>
                <input type='text' name='search' value={searchValue} onChange={(e) => {
                    setSearchValue(e.target.value);
                    if(e.target.value !== '') {
                        setNoteToggle(true);
                        setNotebookToggle(true);
                    } else {
                        setNoteToggle(false);
                        setNotebookToggle(false);
                    }
                    }}></input>
            </div>
            <div className='toggle'>
                {!notebookToggle && noStyle()}
                {notebookToggle && style()}
                {notebookToggle && <AddNotebookModal user={user}/>}
                {notebookToggle && notebookList.map(notebook => {
                    return (
                        <button className='notebooks' key={notebook.title} value={notebook} 
                        onClick={async () => {
                            await dispatch(globalNotebookActions.setNewGlobalNotebook(notebook));
                            setGlobalNotebook(notebook);
                            dispatch(globalNoteActions.initResetGlobalNote());
                            return dispatch(noteActions.getNoteArrayFiltered(notebook.id));
                        }}><span className='textinbutton'>{notebook.title}</span><DeleteNotebookModal notebook={notebook} /></button>
                    )
                })}
            </div>
            <div>
                {!noteToggle && noStyleNote()}
                {noteToggle && styleNote()}
                {noteToggle && noteList.map(note => {
                    return (
                        <button className='notebooks' key={note.title} value={note} 
                        onClick={async () => {
                            if(!globalNotebook || globalNotebook.id !== note.notebookId) {
                                const notebook = notebooks[note.notebookId];
                                dispatch(globalNotebookActions.setNewGlobalNotebook(notebook));
                            }
                            dispatch(globalNoteActions.setNewGlobalNote(note));
                        }}><span className='textinbutton'>{note.title}</span></button>
                    )
                })}
            </div>
        </div>
      );
}

export default LoggedIn;