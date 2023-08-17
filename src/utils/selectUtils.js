function algTypesToOptions(types) {
    return types.map(type => {
        return {value: type, label: type.toLowerCase().replaceAll("_", " ")}
    })
}

function delayToOptions(delays) {
    const label = (delay) => {
        if (delay < 25) return "fast"
        if (delay < 50) return "medium"
        return "slow"
    }
    return delays.map(delay => {
        return {value: delay, label: label(delay)}
    })
}


export {algTypesToOptions, delayToOptions}