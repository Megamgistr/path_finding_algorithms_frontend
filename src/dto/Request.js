class Request {
    constructor(matrix, from, to, algType, delay = 10) {
        this.board = matrix
        this.from = from
        this.to = to
        this.alg = algType
        this.delayMilliseconds = delay
    }
}

export default Request