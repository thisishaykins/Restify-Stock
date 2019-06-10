var restify = require('restify');
// const config = require('./config')

const server = restify.createServer();

server.get('/hello/:name', respond);
server.head('/hello/:name', respond);