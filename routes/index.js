var express = require('express')
var router = express.Router()

const PAGES = [
  '/homea',
  '/homeb',
  //'/homec'
]


router.get('/', function(req, res) {
  //res.render('index', { title: 'Express' })
  res.redirect(getHomepage())
})

router.get('/homea', function(req, res) {
  res.render('home-a', { title: 'A' })
})

router.get('/homeb', function(req, res) {
  res.render('home-b', { title: 'B' })
})



function getHomepage() {
  return PAGES[getRandomInt(0, PAGES.length)]
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor((Math.random() * (max - min)) + min)
}

module.exports = router
