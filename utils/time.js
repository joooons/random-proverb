const request = require('request')
const refArray = require('./random')

const currentVerse = {}
const interval = 5

const startTheClock = () => {
    setTimeout(() => {
        const time = getEpochTime()
        const index = time % (refArray.length)
        if (currentVerse.index !== index) {
            currentVerse.index = index
            currentVerse.timeStamp = time * 60 * interval
            currentVerse.nextTimeStamp = (time + 1) * 60 * interval
            updateVerse(refArray[index])
        }
        startTheClock()
    }, 100)
}
startTheClock()

const getEpochTime = () => {
    // Whatever the interval is, getEpochTime() returns the number of that
    // incremental time that passed since 1970.
    return Math.floor(new Date().getTime() / 1000 / 60 / interval)
}

const updateVerse = ({ chapter, verse }) => {
    // esv api allows up to 5000 http requests per day.
    const options = {
        url: `https://api.esv.org/v3/passage/text/?q=Proverbs+${chapter}:${verse}&include-passage-references=false&include-headings=false&include-footnotes=false&include-verse-numbers=false&include-short-copyright=false`,
        headers: { Authorization: 'Token ' + process.env.API_KEY }
    }
    request(options, (error, response, body) => {
        try {
            currentVerse.chapter = chapter
            currentVerse.verse = verse
            currentVerse.text = JSON.parse(body).passages[0].replace(/^\s+|\s+$/gm, '').replace(/\n/, ' ')
        } catch (e) {
            currentVerse.chapter = 32
            currentVerse.verse = 1
            currentVerse.text = 'For the man who suddenly loses internet connection, there is much sorrow and confusion. (Note: this verse is missing in all manuscripts)'
        }
    })
}



module.exports = currentVerse