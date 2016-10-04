"use strict";
/* global require, module, Promise */
const request = require('superagent');
const md5 = require('md5');
const urljoin = require('url-join');

class MailChimp {
    constructor(apikey, host) {
        this.apikey = apikey;
        this.host = host;
    }

    addMemberToList (listId, email) {
        const endpoint = urljoin(this.host, 'lists', listId, 'members', md5(email));

        return new Promise((accept, reject) => {
            request.set('Authorization', `apikey ${this.apikey}`)
                   .patch(endpoint)
                   .send({
                        "status":"subscribed"
                    })
                    .end((err, res) => {
                        if(err) return reject(err);
                        accept(res);
                    });
        })

    }

}

module.exports = MailChimp;