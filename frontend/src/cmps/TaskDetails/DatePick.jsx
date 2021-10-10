import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

export function DatePick({ bodyObj }) {
  const { props, setCurrPopover, sendTask, popoverPos } = bodyObj;
  const [startDate, setStartDate] = useState(Date.now());
  useEffect(() => {
    sendTask(false, { ...props, dueDate: startDate });
  }, [startDate]);
  return (
    <div
      className='date-pick'
      style={{ left: popoverPos.leftPos, top: popoverPos.topPos }}
    >
      <div className='nav-option-header flex align-center'>
        <button className='clean-btn hide'>
          <CloseRoundedIcon />
        </button>
        <h3>Date</h3>
        <button
          className='clean-btn'
          onClick={() => {
            setCurrPopover(null);
          }}
        >
          <CloseRoundedIcon />
        </button>
      </div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          autoOk
          variant='static'
          openTo='date'
          value={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
}
