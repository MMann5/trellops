import React, { useState, useEffect } from 'react';


export function DetailsAttachments({ task, sendTask }) {
  const [attachmentStateVal, createAttachmentVal] = React.useState(
    task.attachments ? task.attachments : ''
  );
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
        <li key={idx} style={{ display: 'flex', height: '100px', marginBottom: '30px' }}>
          <img src={val} alt="" style={{ height: '120px', objectFit: 'contain', margin: '2px' }} />
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-betwween', padding: '6px 10px' }} >
            <div>
              <h5>{val}</h5>
              <button onClick={() => deleteAttachment(idx)}>Delete</button>
            </div>
          </div>
        </li >

      );
    })
    : '';
  return <ul className="attachment-main-container">{attachment}</ul>;
}
