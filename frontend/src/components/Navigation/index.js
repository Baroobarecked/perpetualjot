import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as notebookActions from "../../store/notebooks";
import './Navigation.css';
import LoggedIn from './loggedin';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  console.log(sessionUser)

  let sessionPage;
  if (sessionUser && isLoaded) {
    dispatch(notebookActions.getNotebookArray(sessionUser.id));
    sessionPage = (
      // <ProfileButton user={sessionUser} />
      <LoggedIn user={sessionUser} />
    );
  } else {
    sessionPage = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
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