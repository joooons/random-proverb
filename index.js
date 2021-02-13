const express = require('express')
const path = require('path')
const { startTheClock, currentVerse } = require('./utils/time')

const app = express()
const port = process.env.PORT
const publicDirectoryPath = path.join(__dirname, "./public")

startTheClock()



app.use(express.static(publicDirectoryPath))

if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https') {
            res.redirect(`https://${req.header('host')}${req.url}`)
        } else {
            next()
        }
    })
} 


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