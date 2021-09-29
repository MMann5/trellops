import React from 'react';
import { Link } from 'react-router-dom'
import { TextField } from '@material-ui/core';
import { RightMenu } from './RightMenu';


export function BoardHeader({ boardTitle }) {
    // const [isMenuOpenState, showMenu] = useState(isMenuOpen);
    // const showMenu = ()=>{
    //     isMenuOpen =
    // }
    return (
        <div className="board-header">
            {/* <div className="board-title" > */}
            <button className="board-title">{boardTitle}</button>
            {/* <TextField
                    fullWidth
                    size='small'
                    margin='normal'
                    variant='standard'
                    value={boardTitle}
                    // onChange={(ev) => onSetTask(ev, groupId, task.id)}
                    inputProps={{
                        style: { fontSize: '14px' }
                    }}
                    InputProps={{
                        disableUnderline: true, // <== added this
                    }}
                /> */}
            {/* </div> */}
            <div className="flex header-section">
                <div className="board-header-members flex align-center">
                    <button>Invite</button>
                </div>
                <Link to={'/board/'} className="clean-link">
                    <span className="wide-layout">Dashboard</span>
                    <span className="flex align-center">
                    </span>
                </Link>
                <button>
                    <span className="wide-layout">Show Menu</span>
                </button>
            </div>
            <RightMenu/>
        </div>
    )
}