import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import * as noteActions from "../../store/notes";
import * as notebookActions from "../../store/notebooks";
import ProfileButton from './ProfileButton';

import './loggedin.css';
import AddNotebookModal from '../AddNotebookModal';

function LoggedIn ({user}) {
    console.log(user);
    const dispatch = useDispatch();

    const [globalNotebook, setGlobalNotebook] = useState(null);

    const notebooks = useSelector(state => state.notebooks);
    const [notebookToggle, setNotebookToggle] = useState(false);
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
    const [addToggle, setAddToggle] = useState(false);

    const content = () => {
        return (
            <div>
                <button onClick={() => dispatch(noteActions.addNewNote({
                    userId: user.id, 
                    notebookId: globalNotebook.id,
                    title: 'Untitled',
                }))}>Add Note</button>
                <AddNotebookModal user={user}/>
            </div>
        )
    }
    
    return (
        <div className='main_nav'>
            <div className='profile'>
                <ProfileButton user={user} />
            </div>
            <div>
                <button className='select' onClick={() => setAddToggle(!addToggle)}>New</button>
                {addToggle && content()}
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
                            setGlobalNotebook(notebook);
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