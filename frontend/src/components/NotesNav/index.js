import { useDispatch, useSelector } from "react-redux";
import * as globalNoteActions from "../../store/globalNote";
import * as noteActions from "../../store/notes";
import * as globalNotebookActions from "../../store/globalNotebook";
import * as globalNotesActions from "../../store/globalNotesObj";

import './NotesNav.css';
import DeleteNoteModal from "../DeleteNoteModal";

function NotesNav () {
    const notes = useSelector(state => state.notes);
    const globalNote = useSelector(state => state.globalNote);
    const globalNotebook = useSelector(state => state.globalNotebook);
    const notebooks = useSelector(state => state.notebooks);
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    let noteList =[];

    if(notes) {
        for(let noteId in notes) {
            noteList.push(notes[noteId])
        }
    }

    return (
        <div className='notesnavmain'>
            <div className='titleandbutton'>
                <h2>Notes</h2>
                {globalNotebook && <button onClick={async () => {
                    const res = await dispatch(noteActions.addNewNote({
                        userId: user.id, 
                        notebookId: globalNotebook.id,
                        title: 'Untitled',
                        content: 'Place note here',
                    }))
                    console.log(res)
                    dispatch(globalNotesActions.editGlobalNotes(res.note))
                }}>Add Note</button>}
            </div>
            {globalNotebook && noteList.map(note => {
                return (
                    <div key={note.id} className='notecard'>
                        <button onClick={() => {
                            if(!globalNotebook || globalNotebook.id !== note.notebookId) {
                                const notebook = notebooks[note.notebookId];
                                dispatch(globalNotebookActions.setNewGlobalNotebook(notebook));
                            }
                            dispatch(globalNoteActions.setNewGlobalNote(note));
                            }}><span className='textinbutton'>{note.title}</span>{globalNote && 
                                globalNote.id === note.id ?
                                <DeleteNoteModal note={note} notebook={globalNotebook} /> :
                                ''
                            }</button>
                    </div>
                )
            })}
        </div>
    );

}

export default NotesNav;