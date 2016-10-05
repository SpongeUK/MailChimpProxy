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
        const endpoint = urljoin(this.host, 'lists', listId, 'members');

        return new Promise((accept, reject) => {
            request.post(endpoint)
                   .auth("apikey", this.apikey)
                   .send({
                        "email_address":email
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