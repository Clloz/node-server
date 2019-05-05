var http = require('http')
var path = require('path')
var fs = require('fs')
var url = require('url')

var heros = {
    qop: "solo",
    dk: "carry",
    em: "solo",
    invoker: "solo",
    kunkka: "support",
    lina: "solo",
    sf: "solo",
    puck: "solo",
    st: "solo",
    ta: "solo",
    tk: "solo",
    zeus: "support"
}

var routes = {
    '/hero': function (req, res) {
        res.end(heros[req.body.name]);
    },

    '/all': function (req, res) {
        res.end('username=' + req.body.username + ',password=' + req.body.password)
    }

}


var server = http.createServer(function (req, res) {
    routePath(req, res)
})

server.listen(8089)
console.log('visit http://localhost:8089')


function routePath(req, res) {
    var pathObj = url.parse(req.url, true)
    var handleFn = routes[pathObj.pathname]
    if (handleFn) {
        req.query = pathObj.query
        var body = ''
        req.on('data', function (chunk) {
            body += chunk
        }).on('end', function () {
            req.body = parseBody(body)
            handleFn(req, res)
        })
    } else {
        staticRoot(path.resolve(__dirname, './'), req, res)
    }
}

function staticRoot(staticPath, req, res) {
    var pathObj = url.parse(req.url, true)
    if(pathObj.pathname === '/'){
        pathObj.pathname += 'index.html'
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    var filePath = path.join(staticPath, pathObj.pathname)
    fs.readFile(filePath, 'binary', function (err, content) {
        if (err) {
            res.writeHead('404', 'haha Not Found')
            res.write('404 Not Found')
	    return res.end()
        }

        res.writeHead(200, 'Ok')
        res.write(content, 'binary')
        res.end()
    })

}

function parseBody(body) {
    console.log(body)
    var obj = {}
    body.split('&').forEach(function (str) {
        obj[str.split('=')[0]] = str.split('=')[1]
    })
    return obj
}


