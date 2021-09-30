export function ModalDetailsLables() {
    const labels = [{ name: 'Done', color: '#7BC86C' }, { name: 'Important', color: '#F5DD29' },{ name: 'Complex', color: '#FFAF3F' }]
    return (
        <div className="task-details-labels flex column">
            <h3>Labels</h3>
            <div className="labels-container flex">
                {labels.map((label, idx) =>
                    <span key={idx} style={{ backgroundColor: label.color }} className="label">{label.name}</span>
                )}
            </div>
        </div>
    )
}