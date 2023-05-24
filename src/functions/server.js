const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

const server = app.listen(port, () => console.log('Server Up'))

module.exports = { server, app, express }