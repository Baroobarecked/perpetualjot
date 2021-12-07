import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddNotbookPage from '../AddNotebookPage';

function AddNotebookModal({user}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Add Notebook</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddNotbookPage user={user}/>
        </Modal>
      )}
    </>
  );
}

export default AddNotebookModal;