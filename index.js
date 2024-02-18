const express = require('express')
const http = require('http')
const path = require('path')

const socketio = require('socket.io')
const currentVerse = require('./utils/time')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const port = process.env.PORT | 3000
const publicDirectoryPath = path.join(__dirname, "./public")



io.on('connection', (socket) => {
    // console.log('new connection made')
    // io.emit('message', 'starting')
    socket.on('check for new verse', () => {
        socket.emit('new verse', currentVerse)
    })

})

if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https') {
            res.redirect(`https://${req.header('host')}${req.url}`)
        } else {
            next()
        }
    })
}

app.use(express.static(publicDirectoryPath))

app.get('/verse', (req, res) => { res.send(currentVerse) })

app.get('/copyright', (req, res) => { res.redirect('/copyright.html') })

app.get('/*', (req, res) => { res.redirect('/404.html') })

server.listen(port, () => { console.log('Server up on port', port) })