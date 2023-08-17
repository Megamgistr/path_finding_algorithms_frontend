const getIdFromNums = (i, j) => `${i}-${j}`

const getNumsFromId = (id) => id.split("-")

export {getIdFromNums, getNumsFromId}