import '../css/Board.css'
import Row from "./Row";

function generateRows(matrix, onDrop, onMove) {
    const rows = []
    for (let i = 0; i < matrix.length; i++) {
        rows.push(<Row cellsArray={matrix[i]} id={i} onDrop={onDrop} onMove={onMove}/>)
    }
    return rows
}


function Board({matrix, onDrop, onMove}) {
    return (
        <div>
            <div className={"board"}>
                {generateRows(matrix, onDrop, onMove)}
            </div>
        </div>
    );
}

export default Board;