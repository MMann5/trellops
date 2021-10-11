import React from 'react'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';


export function DetailsDate({ sendTask, task }) {
  return (
    <div className='card-details-date item-container flex column align-flex-end'>
      <h3
        className='card-details-item-header'
        style={{ margin: '0' }}
      >
        Due Date
      </h3>
      <div
        className='date-container flex wrap align-center'
      >
        <button
          className="clean-btn"
          onClick={() =>
            sendTask(false, { ...task, dueDate: '' })
          }
        >
          <CloseRoundedIcon style={{ fontSize: '16px', color: '#42526e' }} />
        </button>
        <div className="date-item"
        >
          {new Date(task.dueDate).toLocaleDateString(
            'en-GB'
          )}
        </div>
      </div>
    </div>
  )
}