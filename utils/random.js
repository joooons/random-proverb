const rangesOfProverbs = {
    "10": "1-32",
    "11": "1-31",
    "12": "1-28",
    "13": "1-25",
    "14": "1-35",
    "15": "1-33",
    "16": "1-33",
    "17": "1-28",
    "18": "1-24",
    "19": "1-29",
    "20": "1-30",
    "21": "1-31",
    "22": "1-16",
    "26": "1-28",
    "27a": "1-14",
    "27b": "17-22",
    "28": "1-28",
    "29": "1-27"
}

const arrayOfReferences = () => {
    const arr = []
    Object.keys(rangesOfProverbs).forEach(key => {
        let chapter = key.match(/\d+/)[0]
        let [start, end] = rangesOfProverbs[key].match(/\d+/g)
        for (let verse = start; verse <= end; verse++) {
            arr.push({
                chapter,
                verse: parseInt(verse)
            })
        }
    })
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
    }
    return arr
}

module.exports = arrayOfReferences()