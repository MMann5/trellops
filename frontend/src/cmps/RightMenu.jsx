import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
export class RightMenu extends Component {
    render() {
        return (
            <div className="right-menu flex column justify-space-between">
                <div className="nav-option-header flex justify-center">
                    <h3>Add a Checklist</h3>
                    <button className="clean-btn">
                        <FontAwesomeIcon icon={faTimes} className="close-x" />
                    </button>
                </div>
                <div className="flex column justify-center">
                    <div>Change background</div>
                    <div>Search cards</div>
                    <div>Archive</div>
                </div>
            </div>
        )
    }
}