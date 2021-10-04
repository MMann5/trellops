import React, { useState, useEffect } from 'react';

export function TaskAttachments({ task, sendTask }) {
  const [attachmentStateVal, createAttachmentVal] = React.useState(
    task.attachments ? task.attachments : ''
  );
  console.log(task);
  console.log(attachmentStateVal);
  useEffect(() => {
    sendTask(false, {
      ...task,
      attachments: attachmentStateVal,
    });
  }, [attachmentStateVal]);

  const deleteAttachment = (idx) => {
    const attachmentCopy = [...task.attachments];
    attachmentCopy.splice(idx, 1);
    createAttachmentVal(attachmentCopy);
  };
  const attachment = task.attachments
    ? task.attachments.map((val, idx) => {
        return (
          <li key={idx}>
            <a
              href={val}
              target='_blank'
              rel='noopener noreferrer'
              style={{ cursor: 'pointer' }}
            >
              <img
                style={{ display: 'block', objectFit: 'cover' }}
                src={val}
                alt='attachment file'
                style={{ width: '20%' }}
              />
            </a>
            <button
              style={{
                marginInlineStart: '10px',
                width: '150px',
              }}
              onClick={() => deleteAttachment(idx)}
              className='checkbox-btn clean-btn'
            >
              delete
            </button>
          </li>
        );
      })
    : '';
  return <ul>{attachment}</ul>;
}
