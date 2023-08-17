const fetchFindingPath = async (requestBody) => {
    console.log(requestBody)
    return await fetch("http://localhost:8080/api/findPath/", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
            "Content-Type": "application/stream+json",
        }
    });
}

const fetchMazeGeneration = async (requestBody) => {
    return await fetch("http://localhost:8080/api/mazeGeneration/", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
            "Content-Type": "application/stream+json",
        }
    });
}

const readResponse = async (response, callback) => {
    const reader = response.body.getReader();
    const decoder = new TextDecoder()
    while (true) {
        const {value, done} = await reader.read()
        if (done) break;
        const text = decoder.decode(value)
        text.split(/\n/)
            .forEach(str => {
                    try {
                        const obj = JSON.parse(str);
                        if (!obj["finished"]) {
                            callback(obj)
                        }
                    } catch (e) {
                        console.log(e)
                    }
                }
            )
    }
}

export {fetchFindingPath, fetchMazeGeneration, readResponse}