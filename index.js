const express = require('express')
const path = require('path')
const { startTheClock, currentVerse } = require('./utils/time')

const app = express()
const port = process.env.PORT
const publicDirectoryPath = path.join(__dirname, "./public")

startTheClock()

if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (req.url === '/') {
            res.redirect(`https://${req.header('host')}${req.url}`)
        } else next()
    })
}

app.use(express.static(publicDirectoryPath))

app.get('/verse', (req, res) => {
    res.send(currentVerse)
})

app.get('/copyright', (req, res) => {
    res.redirect('/copyright.html')
})

app.get('/*', (req, res) => {
    res.redirect('/404.html')
})

app.listen(port, () => {
    console.log('Server up on port', port)
})