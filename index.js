const express = require('express')
const path = require('path')
const refArray = require('./utils/random')

const app = express()
const port = process.env.PORT
const publicDirectoryPath = path.join(__dirname, "./public")

app.use(express.static(publicDirectoryPath))

app.get('/randomize', (req, res) => {
    var index = req.query.num % refArray.length
    res.send({
        chapter: refArray[index].chapter,
        verse: refArray[index].verse,
        apiKey: process.env.API_KEY
    })
})

app.get('/*', (req, res) => {
    res.redirect('/404.html')
})

app.listen(port, () => {
    console.log('Server up on port', port)
})