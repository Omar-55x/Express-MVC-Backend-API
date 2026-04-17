const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../model/User')

router.get(['/', '/index{.html}'], (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
})

router.get('/old-index{.html}', (req, res) => {
    res.status(301).redirect('index.html');
})

router.get('/new-user{.html}', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'new-user.html'))
})

router.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save()
        .then(() => {
            res.redirect('/index.html');
        })
        .catch((err) => {
            console.error(err.message)
        })
})

module.exports = router;