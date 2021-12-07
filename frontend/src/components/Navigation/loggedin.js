import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import * as noteActions from "../../store/notes";
import ProfileButton from './ProfileButton';

import './loggedin.css';

function LoggedIn ({user}) {
    const dispatch = useDispatch();

    const notebooks = useSelector(state => state.notebooks);
    const [notebookToggle, setNotebookToggle] = useState(false);
    let notebookList =[];

    if(notebooks) {
        for(let notebookId in notebooks) {
            notebookList.push(notebooks[notebookId])
        }
    }

    const notes = useSelector(state => state.notes);
    const [noteToggle, setNoteToggle] = useState(false);
    let noteList =[];

    if(notes) {
        for(let noteId in notes) {
            noteList.push(notes[noteId])
        }
    }
    
    return (
        <div className='main_nav'>
            <div className='profile'>
                <ProfileButton user={user} />
            </div>
            <div>
                <select>
                    <option>New</option>
                </select>
            </div>
            <div className='search'>
                <label htmlFor='search'>Search</label>
                <input type='text' name='search'></input>
            </div>
            <div className='home'>
                <NavLink exact to="/">Home</NavLink>
            </div>
            <div className='toggle'>
                <button onClick={() => setNotebookToggle(!notebookToggle)}>Notebooks</button>
                {notebookToggle && notebookList.map(notebook => {
                    console.log(notebook)
                    return (
                        <button className='notebooks' key={notebook.title} value={notebook} 
                        onClick={() => {
                            console.log(notebook);
                            return dispatch(noteActions.getNoteArrayFiltered(notebook.id))
                        }}>{notebook.title}</button>
                    )
                })}
            </div>
            <div>
                <button>Notes</button>
            </div>
        </div>
      );
}

export default LoggedIn;