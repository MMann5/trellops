import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export function DatePick() {
  const [startDate, setStartDate] = useState(new Date());
  
  return (
    <div className="date-pick">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        tetherConstraints={[]}
        popperModifiers={{
          tetherConstraints: {
          }
      }}
      />
    </div>
  );
}
