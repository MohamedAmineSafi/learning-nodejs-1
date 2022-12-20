const fs = require("fs")
const http = require("http")
const url = require("url")

const slugify = require('slugify')

const replaceTemplate = require("./modules/replaceTemplate")

// Can use blocking code because this code will be executed only once because it is outside the callback function (createServer)
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf8')
const dataObject = JSON.parse(data)
const slugs = dataObject.map(el => slugify(el.productName, {lower:true}))
console.log(slugs)
// Same logic above, These files are read once
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf8')

// ---- SERVER ----
const server = http.createServer((req, res) => {
    // const pathName = req.url
    const { query, pathname } = url.parse(req.url, true)
    
    // Overview page
    if (pathname === "/" || pathname === '/overview') {
        res.writeHead(200, {'Content-type': 'text/html'})
        const cardsHTML = dataObject.map(element => replaceTemplate(tempCard, element)).join('')
        const output = tempOverview.replace('{% ProductCards %}', cardsHTML)
        res.end(output) // sending a response

    // Product page
    } else if (pathname === "/product") {
        res.writeHead(200, {'Content-type': 'text/html'})
        const product = dataObject[query.id]
        const output = replaceTemplate(tempProduct, product)
        res.end(output)

    // API --------------------------------
    } else if (pathname === "/api") {
        res.writeHead(200, {'Content-type': 'application/json'})
        res.end( data )

    // Not found --------------------------------
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html' // pass header
        }) // send 404 error
        res.end("<h1>la9ad dalalta al-taree9</h1>")

    }
})

server.listen(8000, '127.0.0.1', () => { //listen for incoming requests
    console.log("Listening to request on port 8000")
})