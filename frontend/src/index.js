import React from 'react';

import './index.css';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ModalProvider } from "./context/Modal";

import { restoreCSRF, csrfFetch } from './store/csrf';
import configureStore from './store';
import * as sessionActions from './store/session';
import * as notebookActions from './store/notebooks';
import * as noteActions from './store/notes';

const store = configureStore();
//console.log(sessionActions)
if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
  window.notebookActions = notebookActions;
  window.noteActions = noteActions;
}

function Root() {
  return (
    <Provider store={store}>
      <ModalProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModalProvider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
