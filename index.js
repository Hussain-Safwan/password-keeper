const express = require('express')
app = express()
const expressLayouts = require('express-ejs-layouts')
app.use(express.static('public'))
app.use(expressLayouts)
app.set('view engine', 'ejs')
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Variables
let accounts = [ ]
let id = 0

// Routes
app.get('/', (req, res) => {
  res.render('index', {
    accounts
  })
})

app.post('/add', (req, res) => {
  id++
  accounts.push({
    id,
    ...req.body
  })
  console.log(accounts)
  res.redirect('/')
})

app.post('/edit', (req, res) => {
  req.body.id = parseInt(req.body.id)
  console.log(req.body)
  const idx = accounts.findIndex(acc => { return acc.id === req.body.id})
  accounts[idx] = req.body
  res.redirect('/')
})

app.get('/delete/:id', (req, res) => {
  let {id} = req.params
  id = parseInt(id)
  const idx = accounts.findIndex(acc => {return acc.id === id})
  accounts.splice(idx, 1)
  res.redirect('/')
})

const port = 3000;
app.listen(port, () => console.log(`Server is running at port: ${port}`))