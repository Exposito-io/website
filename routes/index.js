var express = require('express')
var router = express.Router()
var recaptcha = require('express-recaptcha')
var config = require('config')

recaptcha.init(config.get('recaptchaSiteKey'), config.get('recaptchaSecret'))


const PAGES = [
    '/homea',
    //'/homeb',
    //'/homec'
]


router.get('/', function (req, res) {
    //res.render('index', { title: 'Express' })
    res.redirect(getHomepage())
})


router.get('/homea', function (req, res) {
    res.render('home-a', { title: 'A' })
})

router.get('/homeb', function (req, res) {
    res.render('home-b', { title: 'B' })
})


router.post('/newsletter', function (req, res) {
    // TODO
    recaptcha.verify(req, function (error) {
        if (error)
            return res.send('0')



    })

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
