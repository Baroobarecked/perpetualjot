import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import ProfileButton from './ProfileButton';

import './loggedin.css';

function LoggedIn ({user}) {
    const notebooks = useSelector(state => state.notebooks);
    const [notebookToggle, setNotebookToggle] = useState(false);
    let notebookList =[];

    if(notebooks) {
        for(let notebookId in notebooks) {
            notebookList.push(notebooks[notebookId])
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
                    return (
                        <button className='notebooks' key={notebook.title} value={notebook}>{notebook.title}</button>
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