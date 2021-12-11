import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as noteActions from "../../store/notes";
import * as globalNotebookActions from "../../store/globalNotebook";
import * as globalNoteActions from "../../store/globalNote";
import ProfileButton from './ProfileButton';
import AddNotebookModal from '../AddNotebookModal';
import DeleteNotebookModal from '../DeleteNotebookModal';

import './loggedin.css';

function LoggedIn ({user}) {
    const dispatch = useDispatch();

    // const [globalNotebooked, setGlobalNotebook] = useState(null);
    const notebooks = useSelector(state => state.notebooks);
    const [notebookToggle, setNotebookToggle] = useState(false);
    const [noteToggle, setNoteToggle] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const globalNotebook = useSelector(state => state.globalNotebook);
    let notebookList =[];

    if(notebooks) {
        for(let notebookId in notebooks) {
            notebookList.push(notebooks[notebookId])
        }
    }

    const notes = useSelector(state => state.globalNotesObj);
    let noteList;
    if(notes) {
        noteList = [...notes.notes]
        notebookList = notebookList.filter(notebook => notebook.title.toLowerCase().includes(searchValue.toLowerCase()))
        noteList = noteList.filter(note => {
            return (note.title.toLowerCase().includes(searchValue.toLowerCase()) || note.content.toLowerCase().includes(searchValue.toLowerCase()))
        })
    }

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
                <button className='togglebutton' style={style} onClick={() => setNotebookToggle(!notebookToggle)}>Notebooks<i className="fas fa-chevron-up"></i></button>
                <div style={styles}></div>
            </>
        )
    }

    const noStyle = () => {
        return (
            <button className='togglebutton' onClick={() => setNotebookToggle(!notebookToggle)}>Notebooks<i className="fas fa-chevron-down"></i></button>
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
                <button className='togglebutton' style={style} onClick={() => setNoteToggle(!noteToggle)}>All Notes<i className="fas fa-chevron-up"></i></button>
                <div style={styles}></div>
            </>
        )
    }

    const noStyleNote = () => {
        return (
            <button className='togglebutton' onClick={() => setNoteToggle(!noteToggle)}>All Notes<i className="fas fa-chevron-down"></i></button>
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
            <div>
                <button onClick={async () => {
                    dispatch(globalNoteActions.initResetGlobalNote());
                    dispatch(globalNotebookActions.initResetGlobalNotebook());
                    dispatch(noteActions.getNoteArray(user.id));
                    setNoteToggle(false);
                    setNotebookToggle(false);
                }}>Home</button>
            </div>
            <div className='toggle'>
                {!notebookToggle && noStyle()}
                {notebookToggle && style()}
                {notebookToggle && <AddNotebookModal user={user}/>}
                {notebookToggle && notebookList.map(notebook => {
                    return (
                        <button className='notebooks' key={notebook.title} value={notebook} 
                        onClick={async () => {
                            dispatch(globalNoteActions.initResetGlobalNote());
                            dispatch(globalNotebookActions.initResetGlobalNotebook());
                            await dispatch(globalNotebookActions.setNewGlobalNotebook(notebook));
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
                        <button className='notebooks' key={`${note.id}-${note.title}`} value={note.notebookId} 
                        onClick={async () => {
                            dispatch(globalNoteActions.initResetGlobalNote());
                            console.log(note)
                            if(!globalNotebook || globalNotebook.id !== note.notebookId) {
                                const notebook2 = notebooks[note.notebookId];
                                console.log(notebook2)
                                await dispatch(globalNotebookActions.setNewGlobalNotebook(notebook2));
                            }
                            dispatch(globalNoteActions.setNewGlobalNote(note));
                            return dispatch(noteActions.getNoteArrayFiltered(note.notebookId));
                        }}><span className='textinbutton'>{note.title}</span></button>
                    )
                })}
            </div>
        </div>
      );
}

export default LoggedIn;