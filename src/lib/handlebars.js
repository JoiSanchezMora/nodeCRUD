const {format} = require('timeago.js');

const helpers = {};

helpers.timeago = (creado) => {
    return format(creado);
};

module.exports = helpers;