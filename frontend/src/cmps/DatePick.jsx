import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export function DatePick({ setCurrPopover }) {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className='date-pick'>
      <div className='nav-option-header flex justify-center'>
        <h3>Date</h3>
        <button
          className='clean-btn'
          onClick={() => {
            setCurrPopover(null);
          }}
        >
          <FontAwesomeIcon icon={faTimes} className='close-x' />
        </button>
      </div>
      <DatePicker
        className='date-picker'
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        tetherConstraints={[]}
        popperModifiers={{}}
      />
    </div>
  );
}
