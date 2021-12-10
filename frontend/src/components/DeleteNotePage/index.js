import { useDispatch } from "react-redux";
import * as noteActions from "../../store/notes";
import * as globalNoteActions from "../../store/globalNote";
import * as globalNotesActions from "../../store/globalNotesObj";

import './DeleteNote.css';

function DeleteNotePage({note, notebook}) {
    const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);
    
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(noteActions.deleteOldNote({ noteId: note.id}));
        await dispatch(globalNoteActions.initResetGlobalNote());
        await dispatch(noteActions.getNoteArrayFiltered(notebook.id));
        await dispatch(globalNotesActions.deleteGlobalNotes(note));
    }

    const cancel = () => {
        const background = document.getElementById('modal-background');
        background.click();
    }
    
  
    return (
        <form onSubmit={handleSubmit} className='deleteNotebook'>
            <h4>Performing this action will delete the note.</h4>
            <p>Do you wish to continue?</p>
            <div className='formbuttons'>
                <button type="submit">Yes</button>
                <button onClick={cancel}>No</button>
            </div>
        </form>
    );
  }
  
  export default DeleteNotePage;