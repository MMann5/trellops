import React from "react";
import Styled from 'styled-components'


export function ProgressBar({ task }) {
    const GetProgPercent = () => {
        const sumOfTasks = task.checklists.length;
        let doneTasks = 0;
        task.checklists.forEach(todo => {
            if (todo.checked === true) doneTasks++
        });
        const progressPercent = (doneTasks / sumOfTasks) * 100
        return Math.floor(progressPercent);
    }
    const progressPercent = GetProgPercent()
    return (
        <div className='progress-bar flex align-center'>
            <div className='prog-percent'>{progressPercent}%</div>
            <progress value={progressPercent} max={100}
            // style={(progressPercent===100)? {backgroundColor:'green'}: {}}
            />
        </div>
    )
}