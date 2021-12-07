import React, { useState } from 'react';
import * as notebookActions from '../../store/notebooks';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function AddNotbookPage({user}) {
  const dispatch = useDispatch();
  // const sessionUser = useSelector(state => state.session.user);
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState([]);

  const userId = user.id;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(notebookActions.addNewNotebook({ title, userId }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    if(!errors.length) {
      const background = document.getElementById('modal-background');
      background.click();
    }
  }

  return (
    <form onSubmit={handleSubmit} className='loginform'>
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