import React, { useState } from 'react';
import * as notebookActions from '../../store/notebooks';
import { useDispatch } from 'react-redux';
import * as globalNotebookActions from "../../store/globalNotebook";
import * as globalNoteActions from "../../store/globalNote";
import * as noteActions from "../../store/notes";

function AddNotbookPage({user}) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState([]);

  const userId = user.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    let res;
    try {

      res = await dispatch(notebookActions.addNewNotebook({ title, userId }))

      dispatch(globalNotebookActions.setNewGlobalNotebook(res.notebook));
      dispatch(globalNoteActions.initResetGlobalNote());
      dispatch(noteActions.getNoteArrayFiltered(res.notebook.id));

      const background = document.getElementById('modal-background');
      background.click();

    } catch (error) {
      const resError = await error.json();
      setErrors(resError.errors);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='addNotebook'>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <button type="submit">Add Notebook</button>
    </form>
  );
}

export default AddNotbookPage;