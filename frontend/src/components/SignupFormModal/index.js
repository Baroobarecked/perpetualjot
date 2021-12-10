import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from '../SignupFormPage';

import './SignupFormPage.css';

function SignupFormModal({toggle = false}) {
  const [showModal, setShowModal] = useState(false);
  console.log(toggle)
  return (
    <>
      {toggle && <button id='getting_started' onClick={() => setShowModal(true)}>Get Started</button>}
      {!toggle && <button onClick={() => setShowModal(true)}>Sign Up</button>}
      
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <SignupFormPage />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;