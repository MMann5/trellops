import { ReactComponent as AddIcon } from '../assets/imgs/icons/add.svg'
export function ModalDetailsLables({labels}) {
    return (
        <div className="labels-container flex wrap">
            {labels?.map((label, idx) =>
                <span key={idx} style={{ backgroundColor: label.color }} className="label">{label.title}</span>
            )}
            <button className="secondary-btn"
            ><AddIcon /></button>
        </div>
    )
}


// <div className="labels-container flex wrap">
//     <span
//         className="label" style={{ backgroundColor: 'blue' }}>
//         LabelTitle
//     </span>
//     <span
//         className="label" style={{ backgroundColor: 'red' }}>
//         LabelTitle
//     </span>
//     <span
//         className="label" style={{ backgroundColor: 'green' }}>
//         LabelTitle
//     </span>

//     {/* <ModalDetailsLables/> */}
// </div>