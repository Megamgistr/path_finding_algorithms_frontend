import '../css/App.css';
import Board from "./Board";
import React, {useState} from "react";
import Button from "./Button";
import {
    changePosition,
    generateMatrix,
    matrixToBoard, updateCell,
    updateMatrix
} from "../utils/matrixUtils";
import {fetchFindingPath, fetchMazeGeneration, readResponse} from "../fetch/fetchFindingPath";
import MySelect from "./Select";
import {findPathAlgTypes, mazeGenerationAlgTypes} from "../constants/AlgTypes";
import {algTypesToOptions, delayToOptions} from "../utils/selectUtils";
import Request from "../dto/Request";

function App() {
    const [matrix, setMatrix] = useState(generateMatrix(25, 51))
    const [findPathAlg, setFindPathAlg] = useState(findPathAlgTypes[0])
    const [mazeGenerationAlg, setMazeGenerationAlg] = useState(mazeGenerationAlgTypes[0])
    const [delay, setDelay] = useState(5)

    const prepareRequest = (alg) => {
        const boardAndData = matrixToBoard(matrix)
        return new Request(
            boardAndData.board,
            boardAndData.from,
            boardAndData.to,
            alg,
            delay
        )
    }
    const startClickHandler = async () => {
        const response = await fetchFindingPath(prepareRequest(findPathAlg))
        await readResponse(response, (obj) => {
            const visited = new Set(obj["visitedNodes"])
            const path = new Set(obj["path"])
            setMatrix(updateMatrix(matrix, {
                visited: visited,
                path: path
            }))
        })
    }
    const mazeClickHandler = async () => {
        const response = await fetchMazeGeneration(prepareRequest(mazeGenerationAlg))
        await readResponse(response, (obj) => {
            const disabled = new Set(obj["disabledNodes"])
            setMatrix(updateMatrix(matrix, {disabled: disabled}))
        })
    }

    const clearClickHandler = () => {
        setMatrix(generateMatrix(25, 51))
    }

    const dropHandler = (prevId, id, position) => {
        setMatrix(changePosition(matrix, prevId, id, position))
    }

    const moveHandler = (id) => {
        setMatrix(updateCell({
            matrix: matrix,
            id: id,
            type: "disabled"
        }))
    }
    const onChangeFindPathSelect = (e) => {
        setFindPathAlg(e.target.value)
    }

    const onChangeMazeGenerationSelect = (e) => {
        setMazeGenerationAlg(e.target.value)
    }

    const onChangeDelaySelect = (e) => {
        setDelay(e.target.value)
    }

    return (
        <div className={"App"}>
            <header>
                <div className={"path-header"}>
                    <Button clickHandler={startClickHandler} text={"Find path by"}/>
                    <MySelect onChange={onChangeFindPathSelect} options={algTypesToOptions(findPathAlgTypes)}/>
                </div>
                <div className={"maze-header"}>
                    <Button clickHandler={mazeClickHandler} text={"Generate maze by"}/>
                    <MySelect onChange={onChangeMazeGenerationSelect}
                              options={algTypesToOptions(mazeGenerationAlgTypes)}/>
                </div>
                <div className={"delay-header"}>
                    <MySelect onChange={onChangeDelaySelect} options={delayToOptions([1, 25, 50])}/>
                </div>
                <div className={"clear-header"}>
                    <Button clickHandler={clearClickHandler} text={"Reset"}/>
                </div>
            </header>
            <div className={"del"}></div>

            <Board matrix={matrix} onDrop={dropHandler} onMove={moveHandler}/>
        </div>
    );
}

export default App;
