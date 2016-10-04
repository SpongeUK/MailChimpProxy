"use strict";
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

        request.set('Authorization', `apikey ${this.apikey}`);
        request.patch(endpoint).send()
    }

}

module.exports = MailChimp;