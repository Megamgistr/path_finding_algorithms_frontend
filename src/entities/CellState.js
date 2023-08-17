class CellState {
    constructor(id, weight, visited, disabled, path, start, end) {
        this.id = id
        this.weight = weight
        this.visited = visited
        this.disabled = disabled
        this.path = path
        this.start = start
        this.end = end
    }
}

export default CellState