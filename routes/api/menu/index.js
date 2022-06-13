'use strict'

module.exports = async function (app, opts) {
    app.register(require('./post'));
    app.register(require('./put'));
    app.register(require('./delete'));
}