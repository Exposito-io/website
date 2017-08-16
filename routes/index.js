var express = require('express')
var router = express.Router()
var recaptcha = require('express-recaptcha')
var config = require('config')
var mongoFactory = require('mongo-factory')

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



router.post('/newsletter', async function (req, res) {
    try {
        let email = req.body.email

        if (await validateEmail(email)) {

            //recaptcha.verify(req, async function (error) {
            //    if (error)
            //        return res.send('0')

               let db = await mongoFactory.getConnection(config.get('db'))
               let result = await db.collection('newsletter-signups').insertOne({
                    email,
                    date: new Date(),
                    isDeleted: false
                })

               return res.send('1')

            //})

        }
        else
            return res.send('0')

    } catch(e) {
        console.log('Error: ', e)
        return res.send('0')
    }

})



async function validateEmail(email) {
    if (isEmail(email)) {
        let db = await mongoFactory.getConnection(config.get('db'))
        let result = await db.collection('newsletter-signups').findOne({ email })
        console.log(result)
        return result == null
    }
    else
        return false
}

function isEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


function getHomepage() {
    return PAGES[getRandomInt(0, PAGES.length)]
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor((Math.random() * (max - min)) + min)
}

module.exports = router
