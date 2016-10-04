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
        if(typeof email !== "string") return Promise.reject("Email is required");
        const endpoint = urljoin(this.host, 'lists', listId, 'members', md5(email));

        return new Promise((accept, reject) => {
            request.patch(endpoint)
                   .auth("apikey", this.apikey)
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