import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as notebookActions from "../../store/notebooks";
import * as noteActions from "../../store/notes";
import * as globalNotesActions from "../../store/globalNotesObj";
import './Navigation.css';
import LoggedIn from './loggedin';
import LoggedOut from './loggedout';


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  
  let sessionPage;
  if (sessionUser && isLoaded) {
    const getData = async () => {
      dispatch(notebookActions.getNotebookArray(sessionUser.id));
      const res = await dispatch(noteActions.getNoteArray(sessionUser.id));
      dispatch(globalNotesActions.setGlobalNotes(res));
    }
    getData();
    sessionPage = (
      <LoggedIn user={sessionUser} />
    );
  } else {
    sessionPage = (
      <LoggedOut />
    );
  }

  return (
    <ul>
      <li>
        {isLoaded && sessionPage}
      </li>
    </ul>
  );
}

export default Navigation;