import { useState } from "react";
import { useSelector } from "react-redux";

import './NotesNav.css';

function NotesNav () {
    const notes = useSelector(state => state.notes);

    let noteList =[];

    if(notes) {
        for(let noteId in notes) {
            noteList.push(notes[noteId])
        }
    }

    return (
        <div className='notesnavmain'>
            <h2>Notes</h2>
            {noteList.map(note => {
                return (
                    <div key={note.id} className='notecard'>
                        <button>{note.title}</button>
                    </div>
                )
            })}
        </div>
    );

}

export default NotesNav;