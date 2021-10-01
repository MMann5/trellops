import React from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAlignLeft,
  faLaptop,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { TaskNav } from './TaskNav';
import { ModalDetailsMembers } from './ModalDetailsMembers';
import { ModalDetailsLables } from './ModalDetailsLables';

const customStyles = {
  content: {
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -45%)',
    maxWidth: '768px',
    height: '90%',
    marginTop: '20px',
    padding: '30px',
    borderRadius: '3px',

  },
};
Modal.setAppElement('#root');

export function DetailModal({ taskId, setColorFunc, closeModal, modalIsOpen, setIsOpen }) {

  function closeModal() {
    setIsOpen(false);
  }
  function setColor(color) {
    setColorFunc(color);
  }
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}

      >
        <button className='close-modal-btn' onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes} className='svg-close' />
        </button>
        <div className='modal-header'>
          <div className='modal-title flex align-center'>
            <FontAwesomeIcon icon={faLaptop} />
            <h3>Task Title</h3>
          </div>
          <p>
            in list <span>List Title</span>
          </p>
          <div className='modal-main-container flex justify-space-between'>
            <div className='modal-details flex column'>
              <div className="modal-details-items flex">
                <ModalDetailsMembers />
                <ModalDetailsLables />
              </div>
              <div className='description-title flex align-center'>
                <FontAwesomeIcon icon={faAlignLeft} />
                <h3>Description</h3>
              </div>
              <p className='description-txt'>
                Lorem, ipsum dolor sit amet consectetur adipisicing
                elit. Nesciunt, quo repellat molestiae dignissimos
                reprehenderit non laborum at magnam ad inventore
                magni. Cum quisquam iusto delectus laborum, sit omnis
                culpa id.
              </p>
            </div>
            <TaskNav setColor={setColor} closeModal={closeModal} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
