const $title = document.querySelector('#title')
const $time = document.querySelector('#time')
const $reference = document.querySelector('#reference')
const $proverb = document.querySelector('#proverb')

const intervalInMinutes = 10
let globalTime = Math.floor(new Date().getTime() / 1000 / 60 / intervalInMinutes)

$title.textContent = `A Random Proverb Every ${(intervalInMinutes != 1) ? intervalInMinutes : ''} Minute${(intervalInMinutes != 1) ? 's' : ''}`

const getVerse = (epochTime) => {
    fetch('/randomize/?num=' + epochTime)
        .then(response => response.json())
        .then(({ chapter, verse, apiKey}) => {
            const URL = `https://api.esv.org/v3/passage/text/?q=Proverbs+${chapter}:${verse}&include-passage-references=false&include-headings=false&include-footnotes=false&include-verse-numbers=false&include-short-copyright=false`
            const headers = { 'Authorization': 'Token ' + apiKey }
            fetch(URL, { headers })
                .then(response => response.json())
                .then(data => {
                    $reference.textContent = `Proverbs ${chapter}:${verse}`
                    let str = data.passages[0]
                    str = str.replace(/\,|\;|\:/g, '$&<br>')
                    $proverb.innerHTML = str
                })
        })
}
getVerse(globalTime)

const refreshClock = () => {
    setTimeout(() => {
        $time.textContent = moment().format('h:mm:ss a')
        const epochTime = Math.floor(new Date().getTime() / 1000 / 60 / intervalInMinutes)
        if (globalTime !== epochTime) {
            globalTime = epochTime
            getVerse(epochTime)
        }
        refreshClock()
    }, 100)
}
refreshClock()

