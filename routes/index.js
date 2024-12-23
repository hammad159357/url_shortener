const router = require('express').Router()
const urlController = require('../controllers/urlController')

router.post('/shorten', urlController.createURL)
router.get('/:short_url', urlController.getURL)

module.exports = router