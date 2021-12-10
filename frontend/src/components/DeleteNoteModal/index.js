import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteNotePage from '../DeleteNotePage';

import './DeleteNoteModal.css';

function DeleteNoteModal({note, notebook}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div id='delete_note_modal'>
      <i className="far fa-trash-alt delete" onClick={() => setShowModal(true)}></i>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteNotePage note={note} notebook={notebook} />
        </Modal>
      )}
    </div>
  );
}

export default DeleteNoteModal;