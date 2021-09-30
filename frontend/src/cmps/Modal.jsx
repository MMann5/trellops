import React from 'react';
// import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import david from '../assets/imgs/profiles/david.jpg';
import michael from '../assets/imgs/profiles/michael.png';
import chang from '../assets/imgs/profiles/chang.jpg';
import {
  faAlignLeft,
  faExternalLinkSquareAlt,
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
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -45%)',
    width: '768px',
    height: '90%',
    marginTop: '20px',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    backGroundColor: '#f4f5f7',
  },
};
Modal.setAppElement('#root');

export function DetailModal({ taskId, setColorFunc }) {
  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = '#f00';
  // }

  function closeModal() {
    setIsOpen(false);
  }
  function setColor(color) {
    setColorFunc(color);
  }
  return (
    <div>
      <button onClick={openModal}>
        <FontAwesomeIcon icon={faExternalLinkSquareAlt} />
      </button>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <button className='close-modal-btn' onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes} className='svg-close' />
        </button>
        <div className='modal-header'>
          {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
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
              <ModalDetailsMembers/>
              <ModalDetailsLables/>
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
            <TaskNav setColor={setColor} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
