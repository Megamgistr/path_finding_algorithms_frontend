import '../css/Row.css'
import Cell from "./Cell";

function generateCells(cellsArray, id, onDrop, onMove) {
    const cells = []
    for (let j = 0; j < cellsArray.length; j++) {
        const matrixCell = cellsArray[j]
        cells.push(<Cell
            onMove={onMove}
            onDrop={onDrop}
            cellState={matrixCell}
        />)
    }
    return cells
}

function Row({cellsArray, id, onDrop, onMove}) {
    return (
        <div className={"row"} id={id} key={id}>
            {generateCells(cellsArray, id, onDrop, onMove)}
        </div>
    )
}

export default Row