var restify = require('restify');
const config = require('./config')
const alpha = require('alphavantage')({
    key: 'qweqweqwe'
});

const server = restify.createServer();

function respond(req, res, next) {
    res.json({
        status: true,
        message: `Stock data successfully retrived`,
        stocks: req.params.name
    });
    next();
}


function respond_stocks(req, res, next) {
    var stocks = '';
    alpha.data.intraday(`msft`).then(data => {
        res.json({
            status: true,
            message: `Stock data successfully retrived`,
            stocks: data
        });
    });
    next();
}


// Middleware
server.use(restify.plugins.bodyParser());

server.get('/', respond_stocks);
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.listen(config.PORT, () => {
    // require('./routes/stocks')(server)
    console.log('%s listening at %s', config.PORT, config.URL);
});