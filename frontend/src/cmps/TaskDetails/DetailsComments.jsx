import React from 'react'


export function DetailsComments({ task }) {
    const comments = (
        <ul className="comments-list clean-list">
            {task.comments.map((comment, idx) => {
                return (
                    <li key={idx} className="flex">
                        <img
                            src={require(`../../assets/imgs/profiles/${comment.byMember.imgUrl}`).default} />
                        <div className="comments-main-content flex column justify-center">
                            <div className="comments-member-name">
                                {comment.byMember.fullname}
                            </div>
                            <div className="comment-txt flex align-center">
                                <span>{comment.txt}{' '}</span>
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );

    return (
        comments
    )
}
