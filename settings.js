"use strict";
/* global require, module, process */

module.exports = {
    "api": {
        "key": process.env.API_KEY,
        "host": process.env.API_HOST
    },
    "list": {
        "id": process.env.LIST_ID
    }
};