import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddNotbookPage from '../AddNotebookPage';

function AddNotebookModal({user}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id='notebookmodal' onClick={(e) => {
        e.stopPropagation();
        setShowModal(true);
      }}>Add Notebook</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddNotbookPage user={user}/>
        </Modal>
      )}
    </>
  );
}

export default AddNotebookModal;