import {getIdFromNums, getNumsFromId} from "./idUtils";
import CellState from "../entities/CellState";
import RequestCellState from "../dto/RequestCellState";

const generateMatrix = (lines, columns) => {
    const matrix = []
    for (let i = 0; i < lines; i++) {
        matrix[i] = []
        for (let j = 0; j < columns; j++) {
            matrix[i][j] = new CellState(
                getIdFromNums(i, j),
                1,
                false,
                false,
                false,
                i === 0 && j === 0,
                i === 10 && j === 10)
        }
    }
    return matrix
}

const updateCell = ({matrix, id, type}) => {
    const [i, j] = getNumsFromId(id)
    matrix[i][j][type] = !matrix[i][j][type]
    return [...matrix]
}
const updateMatrix = (matrix,
                      {
                          disabled = new Set(),
                          visited = new Set(),
                          path = new Set()
                      }) => {
    disabled.forEach(id => {
        const [i, j] = getNumsFromId(id)
        matrix[i][j]["disabled"] = true
    })
    visited.forEach(id => {
        const [i, j] = getNumsFromId(id)
        matrix[i][j]["visited"] = true
    })
    path.forEach(id => {
        const [i, j] = getNumsFromId(id)
        matrix[i][j]["path"] = true
    })
    return [...matrix]
}

const changePosition = (matrix, prevId, newId, position) => {
    let [i1, j1] = getNumsFromId(prevId)
    let [i2, j2] = getNumsFromId(newId)
    matrix[i1][j1][position] = false
    matrix[i2][j2][position] = true
    return [...matrix]
}

const matrixToBoard = (matrix) => {
    const board = []
    let fromCell
    let toCell
    for (let i = 0; i < matrix.length; i++) {
        board[i] = []
        for (let j = 0; j < matrix[i].length; j++) {
            const cellState = matrix[i][j]
            board[i][j] = new RequestCellState(cellState.id, cellState.weight, cellState.disabled)
            if (cellState.start) {
                fromCell = board[i][j]
            }
            if (cellState.end) {
                toCell = board[i][j]
            }
        }
    }
    return {board: board, from: fromCell, to: toCell}
}
export {generateMatrix, updateMatrix, changePosition, matrixToBoard, updateCell}