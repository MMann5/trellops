import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined'
import { TextareaAutosize, TextField } from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
export function TaskCheckList({ task }) {
    return (
        <div className="checklist-preview">
            <div className="window-modal-title flex align-center justify-space-between">
                <div className="flex align-center">
                    <CheckBoxOutlinedIcon />
                    <h3>checklist title</h3>
                </div>
                <button
                    className="secondary-btn">Delete</button>
            </div>
            {task?.checklists?.map((todo, idx) =>
                <div key={idx} className="title-editor flex">
                    <CheckBoxOutlinedIcon display={todo.isDone ? 'block' : 'none'} />
                    <div className="flex column">
                        <TextareaAutosize
                            value={todo.title}
                        />
                        <div className="checklist-controllers flex align-center">
                            <button className="secondary-btn">
                                Save
                            </button>
                            <CloseRoundedIcon className="close-svg" />
                        </div >
                    </div>)
                </div>)}
            <div>
                <div>Todo List</div>
                <TextField value='Todo add'
                />
                <button>Todo Add</button>
            </div>

        </div>
    )
}