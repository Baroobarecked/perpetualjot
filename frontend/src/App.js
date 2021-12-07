import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import * as sessionActions from "./store/session";
import NotesNav from "./components/NotesNav";
import HomePage from "./components/HomePage";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='body'>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        sessionUser && <NotesNav isLoaded={isLoaded} />
      )}
      {isLoaded && (
        !sessionUser && <HomePage />
      )}
      {/* {isLoaded && (
        // <Switch>
        //   <Route path="/login">
        //     <LoginFormPage />
        //   </Route>
        //   <Route path="/signup">
        //     <SignupFormPage />
        //   </Route>
        // </Switch>
      )} */}
    </div>
  );
}

export default App;
