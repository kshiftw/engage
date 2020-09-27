/*
Define the API routes
*/

const express = require('express');
const router = express.Router();

require('./register')(router);
require('./login')(router);
require('./profile')(router);
require('./timer')(router);

module.exports = router;
