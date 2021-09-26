import React from 'react';
// import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Checklist } from './Checklist';
import { DatePick } from './DatePick';
import { FileAttachment } from './FileAttachment';

const customStyles = {
  content: {
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '80%',
  },
};
Modal.setAppElement('#root');

export function DetailModal({ taskId, setColorFunc }) {
  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  function setColor(color) {
    setColorFunc(color);
  }
  const id = taskId;
  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>{id}</div>
        <input
          type='color'
          onChange={(ev) => setColor(ev.target.value)}
        />
        <Checklist />
        <DatePick />
        <FileAttachment />
      </Modal>
    </div>
  );
}
