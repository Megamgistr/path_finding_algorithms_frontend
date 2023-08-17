import '../css/Cell.css';
import Start from "./Start";
import End from "./End";

function Cell({onDrop, onMove, cellState}) {
    let className = "";
    if (cellState.visited && !cellState.path) {
        className += " visited"
    }
    if (cellState.disabled) {
        className += " disabled"
    }
    if (cellState.path) {
        className += " path"
    }
    if (cellState.start) {
        className += " start"
    }
    if (cellState.end) {
        className += " end"
    }

    return (
        <div className={"cell" + className} id={cellState.id} key={cellState.id}
             onDragStart={((e) => {
                 if (!cellState.start && !cellState.end) {
                     e.preventDefault()
                 }
                 e.dataTransfer.setData("id", e.target["id"])
                 e.dataTransfer.setData("position", e.target.className.split(" ").pop())
             })}
             onDragOver={(e) => {
                 e.preventDefault()
             }}
             onDrop={(e) => {
                 const id = e.target["id"]
                 onDrop(e.dataTransfer.getData("id"), id, e.dataTransfer.getData("position"))
             }}
             onMouseOut={(e) => {
                 if (!cellState.start && !cellState.end) {
                     if (e.buttons === 1 || e.buttons === 3) {
                         onMove(e.target.id)
                     }
                 }
             }}
             draggable={true}>
            {cellState.start &&
                <Start/>
            }
            {cellState.end &&
                <End/>
            }

        </div>
    );
}

export default Cell;