import { useDispatch } from "react-redux";
import * as noteActions from "../../store/notes";
import * as notebookActions from "../../store/notebooks";
import * as globalNotebookActions from "../../store/globalNotebook";
import * as globalNoteActions from "../../store/globalNote";

import './DeleteNotebook.css';

function DeleteNotbookPage({notebook}) {
    const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);
    
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(noteActions.getNoteArrayOppositeFiltered(notebook.id))
        await dispatch(notebookActions.deleteOldNotebook({ notebookId: notebook.id}));
        await dispatch(globalNotebookActions.initResetGlobalNotebook());
        await dispatch(globalNoteActions.initResetGlobalNote());
    }

    const cancel = () => {
        const background = document.getElementById('modal-background');
        background.click();
    }
    
  
    return (
        <form onSubmit={handleSubmit} className='deleteNotebook'>
            <h4>Performing this action will delete the notebook and all notes associated with it.</h4>
            <p>Do you wish to continue?</p>
            <div className='formbuttons'>
                <button type="submit">Yes</button>
                <button onClick={cancel}>No</button>
            </div>
        </form>
    );
  }
  
  export default DeleteNotbookPage;