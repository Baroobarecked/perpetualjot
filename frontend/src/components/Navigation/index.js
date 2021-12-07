import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
import * as notebookActions from "../../store/notebooks";
import './Navigation.css';
import LoggedIn from './loggedin';
import LoggedOut from './loggedout';


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  
  let sessionPage;
  if (sessionUser && isLoaded) {
    // console.log(sessionUser.id)
    dispatch(notebookActions.getNotebookArray(sessionUser.id));
    sessionPage = (
      // <ProfileButton user={sessionUser} />
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
        {/* <NavLink exact to="/">Home</NavLink> */}
        {isLoaded && sessionPage}
      </li>
    </ul>
  );
}

export default Navigation;