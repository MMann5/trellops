import React from 'react';
import { TextField } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPen } from '@fortawesome/free-solid-svg-icons';
export function LabelPick({ closePopup }) {
    const [stateVal, createStateVal] = React.useState('');
    const labels = [{ name: 'Done', color: '#7BC86C' }, { name: 'Important', color: '#F5DD29' }, { name: 'Complex', color: '#FFAF3F' }];
    return (
        <div className="label-pick">
            <div className="nav-option-header flex justify-center">
                <h3>Labels</h3>
                <button className="clean-btn" onClick={() => { closePopup('isLabelOpen') }}>
                    <FontAwesomeIcon icon={faTimes} className="close-x" />
                </button>
            </div>
            <TextField
                fullWidth
                size='small'
                margin='normal'
                variant='outlined'
                placeholder='Search labels...'
                onChange={(ev) => createStateVal(ev.target.value)}
                value={stateVal ? stateVal : ''}
            />
            <div className="label-list flex column">
                {labels.map((label, idx) =>
                    <div key={idx} className="labelAndBtn flex align-center">
                        <div style={{ backgroundColor: label.color }} className="label">{label.name}</div>
                        <div className="label-btn"> <FontAwesomeIcon icon={faPen} /></div>
                    </div>
                )}
            </div>
        </div>
    )
}