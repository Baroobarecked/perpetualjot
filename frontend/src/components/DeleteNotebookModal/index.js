import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteNotbookPage from '../DeleteNotebookPage';

function DeleteNotebookModal({notebook}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <i className="far fa-trash-alt delete" onClick={() => setShowModal(true)}></i>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteNotbookPage notebook={notebook}/>
        </Modal>
      )}
    </>
  );
}

export default DeleteNotebookModal;