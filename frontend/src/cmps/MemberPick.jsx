import React, { Component } from 'react';
export class ColorPick extends Component {
    render() {
        return (
            <div className="member-pick">
                <div className="nav-option-header flex justify-center">
                    <h3>Add a Checklist</h3>
                    <button className="clean-btn" onClick={() => { closePopup('isMemberOpen') }}>
                        <FontAwesomeIcon icon={faTimes} className="close-x" />
                    </button>
                </div>
            </div>
        )
    }
}