import React from 'react';
// import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import laptopIcon from '../assets/imgs/icons/laptop.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignLeft, faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons'
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
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    backGroundColor: '#f4f5f7'
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
      <button onClick={openModal}>  <FontAwesomeIcon icon={faExternalLinkSquareAlt} /></button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <button className="close-modal-btn" onClick={closeModal}>x</button>
        <div className="modal-header">
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
          <div className="modal-title flex align-center">
            <img src={laptopIcon} alt="" />
            <h3>Task Title</h3>
          </div>
          <p>in list <span>List Title</span></p>
          <div>{id}</div>
          <div className="modal-main-container flex justify-space-between">
            <div className="modal-details flex column">
              <div className="description-title flex align-center">
                <FontAwesomeIcon icon={faAlignLeft} />
                <h3>Description</h3>
              </div>
              <p className="description-txt">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, quo repellat molestiae dignissimos reprehenderit non laborum at magnam ad inventore magni. Cum quisquam iusto delectus laborum, sit omnis culpa id.</p>
              <input
                type='color'
                onChange={(ev) => setColor(ev.target.value)}
              />
            </div>
            <TaskNav />
          </div>
        </div>
      </Modal>
    </div>
  );
}
