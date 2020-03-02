const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

// mongoose.connect('mongodb+srv://omnistack7:omnistack7@cluster0-lmjul.mongodb.net/omnistack7?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })

mongoose.connect('mongodb://localhost:27017/omnistack7', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use((req, res, next) => {
  req.io = io
  next()
})
app.use(cors())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))
app.use(require('./routes'))

server.listen(3333)