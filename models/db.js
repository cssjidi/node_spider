const mongoose = require('mongoose');
const config   = require('../config');

mongoose.connect(config.db, {
    server: {poolSize: 20}
}, function (err) {
    if (err) {
        logger.error('connect to %s error: ', config.db, err.message);
        process.exit(1);
    }
});
require('./spider');
require('./users');

exports.Spider = mongoose.model('Spider');
exports.Users = mongoose.model('Users');