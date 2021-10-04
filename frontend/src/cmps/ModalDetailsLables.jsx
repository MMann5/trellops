import { ReactComponent as AddIcon } from '../assets/imgs/icons/add.svg';
export function ModalDetailsLables({ labels }) {
  return (
    <div className='labels-container flex wrap'>
      {labels?.map((label, idx) => (
        <span
          key={idx}
          style={{ backgroundColor: label.color }}
          className='label'
        >
          {label.title}
        </span>
      ))}
    </div>
  );
}
