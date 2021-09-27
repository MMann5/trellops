import React from 'react';
// import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Checklist } from './Checklist';
import { DatePick } from './DatePick';
import { FileAttachment } from './FileAttachment';
import laptopIcon from '../assets/imgs/icons/laptop.png'
import { TaskNav } from './TaskNav';
const customStyles = {
  content: {
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '80%',
    marginTop: '20px',
    padding: '30px'
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
        <div className="modal-header">
          <img src={laptopIcon} alt="" />
          <h3 className="modal-title">Task Title</h3>
        </div>
        <p>in list <span>To Do</span></p>
        <button onClick={closeModal}>close</button>
        <div>{id}</div>
        <input
          type='color'
          onChange={(ev) => setColor(ev.target.value)}
        />
        <Checklist />
        <DatePick />
        <FileAttachment />
        <TaskNav/>
      </Modal>
    </div>
  );
}
