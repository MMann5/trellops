import React from 'react'


export function DetailsLables({ labels }) {
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
