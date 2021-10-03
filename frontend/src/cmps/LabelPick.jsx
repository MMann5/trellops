import React from 'react';
import { TextField } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPen } from '@fortawesome/free-solid-svg-icons';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export function LabelPick({ props, setCurrPopover }) {
    const [stateVal, createStateVal] = React.useState('');
    // const labels = [{ name: 'Done', color: '#7BC86C' }, { name: 'Important', color: '#F5DD29' }, { name: 'Complex', color: '#FFAF3F' }];
    const labels = props;
    console.log(props);
    return (
        <div className="label-pick">
            <div className="nav-option-header flex justify-center">
                <h3>Labels</h3>
                <button className="clean-btn" onClick={() => { setCurrPopover(null) }}>
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
                        <div style={{ backgroundColor: label.color }} className="label"
                        >{label.title}</div>
                        <div className="label-btn" onClick={()=>{setCurrPopover('CHANGELABEL', label.title)}}> 
                        <FontAwesomeIcon icon={faPen} /></div>
                    </div>
                )}
            </div>
        </div>
    )
}