import React, { useState } from 'react';
import * as notebookActions from '../../store/notebooks';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as globalNotebookActions from "../../store/globalNotebook";
import * as globalNoteActions from "../../store/globalNote";

function AddNotbookPage({user}) {
  const dispatch = useDispatch();
  // const sessionUser = useSelector(state => state.session.user);
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState([]);

  const userId = user.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const res = await dispatch(notebookActions.addNewNotebook({ title, userId }))
    if(!errors.length) {
      dispatch(globalNotebookActions.setNewGlobalNotebook(res.notebook));
      dispatch(globalNoteActions.initResetGlobalNote());
      const background = document.getElementById('modal-background');
      background.click();
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