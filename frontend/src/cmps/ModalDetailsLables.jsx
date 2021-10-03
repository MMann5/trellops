import { ReactComponent as AddIcon } from '../assets/imgs/icons/add.svg'
export function ModalDetailsLables({ labels }) {
    // const labels = [{ name: 'Done', color: '#7BC86C' }, { name: 'Important', color: '#F5DD29' }, { name: 'Complex', color: '#FFAF3F' }]
    return (
        <div className="labels-container flex wrap">
            {labels?.map((label, idx) =>
                <span key={idx} style={{ backgroundColor: label.color }} className="label">{label.name}</span>
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