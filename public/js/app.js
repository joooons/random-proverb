const socket = io()

const $title = document.querySelector('#title')
const $time = document.querySelector('#time')
const $reference = document.querySelector('#reference')
const $proverb = document.querySelector('#proverb')
const $container = document.querySelector('#container')

const currentVerse = {}
let currentSecond = 0
const interval = 5



$title.textContent = `A Random Proverb Every ${(interval != 1) ? interval : ''} Minute${(interval != 1) ? 's' : ''}`
$title.classList.add('unhide')
setTimeout(() => { $time.classList.add('unhide') }, 2000)



const getVerse = () => {
    socket.emit('check for new verse')
}

socket.on('new verse', (data) => {
    // console.log('checking...')
    if (currentVerse.text === data.text) return // console.log('New verse not ready yet')
    //console.log('New verse acquired')
    currentVerse.text = data.text
    currentVerse.time = data.timeStamp
    blockWriteVerse(`Proverbs ${data.chapter}:${data.verse}`, data.text, `Proverbs+${data.chapter}`)
    blockNextSide()
    // console.log('new verse')
})



const showTimer = () => {
    if (!currentVerse.time) { return }
    const now = Math.floor(new Date().getTime() / 1000)
    if (currentSecond === now) { return }
    currentSecond = now
    const duration = 60 * interval
    const next = (getEpochTime() + 1) * duration
    let count = next - now
    if (count === duration) { count = 0 }
    const minutes = Math.floor(count / 60)
    const seconds = count - (minutes * 60)
    const minplural = (minutes > 1) ? 's' : ''
    const secplural = (seconds > 1) ? 's' : ' '
    if (minutes === 0) return $time.textContent = `next verse in ${seconds} second${secplural}`
    if (seconds === 0) return $time.textContent = `next verse in ${minutes} minute${minplural}              `
    $time.textContent = `next verse in ${minutes} minute${minplural} and ${seconds} second${secplural}`
}

const getEpochTime = () => {
    // Whatever the interval is, getTime() returns the number of that
    // ...incremental time that passed since 1970.
    // For example, if the interval is 5 minutes, getEpochTime() returns
    // ...the count of how many 5 minute intervals passed since 1970.
    return Math.floor(new Date().getTime() / 1000 / 60 / interval)
}


const repeat = () => {
    setTimeout(() => {
        showTimer()
        if (currentVerse.time !== getEpochTime()) getVerse()
        repeat()
    }, 100)
}
repeat()


socket.on('message', (data) => {
    console.log(data)
})