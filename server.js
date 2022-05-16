const config = require('dotenv')
config.config({ path: './config/config.env' })
const express = require('express')
const http = require('http')
const { ConnectDB } = require('./config/DB')
const app = express()
const server = http.createServer(app)
const expressLayout = require('express-ejs-layouts')



app.set('view engine', 'ejs')
app.set('layout', 'layouts/layout')
app.use(expressLayout)
app.use(express.static('public'))

app.use('/auth', require('./controllers/auth'))

app.use('/', (req, res) => {
  res.render('login')
})



ConnectDB()

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})