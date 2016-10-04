"use strict";
/* global require, module */

const express = require('express');
const router = express.Router();
const MailChimp = require('../../lib/MailChimp');

const settings = require('../../settings');

router.get('/', function(req, res) {
    res.render('index', { title: 'Subscription services are running.'})
});

router.post('/', function (req, res) {
    const client = new MailChimp(settings.api.key, settings.api.host);
    const subscriber = req.body.email;

    client.addMemberToList(settings.list.id, subscriber);
    res.sendStatus(200).send({ "status": "accepted", "email": subscriber });
});

module.exports = router;
