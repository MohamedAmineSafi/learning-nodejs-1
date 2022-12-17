const fs = require("fs")
const http = require("http")
const url = require("url")

const server = http.createServer((req, res) => {
    const pathName = req.url

    if (pathName === "/" || pathName === '/overview') {
        res.end('This is the overview page'); // sending a response
    } else if (pathName === "/product") {
        res.end("This is the product");
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html' // pass header
        }) // send 404 error
        res.end("<h1>la9ad dalalta al-taree9</h1>")
    }
});

server.listen(8000, '127.0.0.1', () => { //listen for incoming requests
    console.log("Listening to request on port 8000")
});