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

    console.log(req.body);
    client.addMemberToList(settings.list.id, subscriber)
          .then(() => res.send(200, { "status": "accepted", "email": subscriber }))
          .catch(e => {
              res.sendStatus(500).send(e);
          });
});

module.exports = router;
