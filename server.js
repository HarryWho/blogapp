const config = require('dotenv')
config.config({ path: './config/config.env' })
const express = require('express')
const http = require('http')
const { ConnectDB } = require('./config/DB')
const app = express()
const server = http.createServer(app)
const expressLayout = require('express-ejs-layouts')
const passport = require('passport');
const session = require('express-session')
const MongoStore = require('connect-mongo')
const methodOverride = require('method-override')

app.set('view engine', 'ejs')
app.set('layout', 'layouts/layout')
app.set("layout extractScripts", true)
app.use(expressLayout)

app.use(express.static('public'))

app.use(express.urlencoded({ extended: false }))

app.use(methodOverride('_method'))

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI
  })
}));

const { formatDate, truncate, stripHTML } = require('./middleware/formats')

app.use((req, res, next) => {
  res.locals.formatDate = formatDate
  res.locals.truncate = truncate
  res.locals.stripHTML = stripHTML
  next()
})

/*  PASSPORT SETUP  */
app.use(passport.initialize());
app.use(passport.session());

const { ensureAuth } = require('./middleware/Authenticate')

app.use('/', require('./controllers/home'))
app.use('/auth', require('./controllers/auth'))
app.use('/dashboard', ensureAuth, require('./controllers/dashboard'))
app.use('/article', ensureAuth, require('./controllers/articles'))




ConnectDB()

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})