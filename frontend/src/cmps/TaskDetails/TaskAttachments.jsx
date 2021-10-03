import Moment from 'react-moment';
export function TaskAttachments({ task }) {
    return (
        <div className="attach-preview flex">
            {task?.attachments?.map((attachment, idx) =>
                <div key={idx}>
                    <div className="img-container">
                        <img src={attachment.attachUrl} alt="No attachments" />

                    </div>
                    <div className="attach-content flex column full">
                        <span className="file-name">{ attachment.title}</span>
                        <div className="time-n-actions flex wrap align-center ">
                            <Moment>createdAt</Moment>
                            <span>-</span>
                            <button
                            >Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}