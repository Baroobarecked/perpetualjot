import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as globalNoteActions from "../../store/globalNote";

import './NotesNav.css';

function NotesNav () {
    const notes = useSelector(state => state.notes);
    const dispatch = useDispatch();

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
                        <button onClick={() => {dispatch(globalNoteActions.setNewGlobalNote(note))}}>{note.title}</button>
                    </div>
                )
            })}
        </div>
    );

}

export default NotesNav;