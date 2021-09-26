import { BoardsNavBar } from '../cmps/BoardsNavBar'
export function Workspace() {
    const fakeBoards = [{ "title": "Robot dev proj" }, { "title": "Trip to Sinai" }, { "title": "Final sprint" }]
    return (
        <div className="work-space">
            <BoardsNavBar />
            <h2>Workspace</h2>
            <div className="general-boards">
                <h3>Most popular templates</h3>
                <div className="work-space-boards">
                    {fakeBoards.map((board, idx) =>
                        <div className="board-preview flex justify-center" key={idx}>{board.title} </div>)}
                </div>
                <h3>Recently viewed</h3>
                <div className="work-space-boards">
                    {fakeBoards.map((board, idx) =>
                        <div className="board-preview flex justify-center" key={idx}>{board.title} </div>)}
                </div>
            </div>
        </div>
    )
}